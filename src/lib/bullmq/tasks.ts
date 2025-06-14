/* eslint-disable @typescript-eslint/no-explicit-any */
// Registro de tarefas, associando nomes a funções assíncronas
import { addYears, format } from "date-fns";
import { prismaClient } from "../prisma/prisma";
import { getRouteByCache } from "../route/cacheRoute";
import { mileagePrograms } from "../route/mileagePrograms";
import { api } from "../api/api";
import {
  AvailabilityResponse,
  FlightsAvailability,
  UpdateSeatsAvailabilityType,
} from "../route/types";
import { updateAcessCounterCache } from "../statistics/acessCounter/cacheAcessCounter";
import { queueHst } from "./bullmq";

// Cada chave no `taskRegistry` é uma tarefa que pode ser chamada dinamicamente, associada a uma função que processa dados.
const taskRegistry: { [key: string]: (data: any) => Promise<void> } = {
  // Função assíncrona para atualizar a contagem de acessos à página inicial.
  incrementHomeAccessCount: async (): Promise<undefined> => {
    try {
      // Busca o registro de contagem de acessos do tipo "home"
      const access = await prismaClient.accessCounter.findFirst({
        where: { type: "home" },
      });

      if (access) {
        // Se já existir, incrementa o contador e atualiza a data do último acesso
        await prismaClient.accessCounter.update({
          where: { id: access.id },
          data: {
            count: access.count + 1,
            lastAccessAt: new Date(),
          },
        });
      } else {
        // Se não existir, cria um novo registro com contador iniciado em 1
        await prismaClient.accessCounter.create({
          data: {
            type: "home",
            count: 1,
            lastAccessAt: new Date(),
          },
        });
      }

      // Atualiza o cache relacionado ao contador de acessos
      await updateAcessCounterCache("home");
    } catch (error) {
      // Loga um erro caso algo falhe durante o processo.
      console.error(`Error while adding home access increment task: ${error}`);
    }
  },

  // Função assíncrona para atualizar a contagem de acessos à página inicial.
  incrementCheckFlightsAccessCount: async (): Promise<undefined> => {
    try {
      // Busca o registro de contagem de acessos do tipo "check flights"
      const access = await prismaClient.accessCounter.findFirst({
        where: { type: "check flights" },
      });

      if (access) {
        // Se o registro já existir, incrementa o contador e atualiza a data do último acesso
        await prismaClient.accessCounter.update({
          where: { id: access.id },
          data: {
            count: access.count + 1,
            lastAccessAt: new Date(),
          },
        });
      } else {
        // Se não existir, cria um novo registro com contador iniciado em 1
        await prismaClient.accessCounter.create({
          data: {
            type: "check flights",
            count: 1,
            lastAccessAt: new Date(),
          },
        });
      }

      // Atualiza o cache com o novo valor do contador de acessos
      await updateAcessCounterCache("check flights");
    } catch (error) {
      // Loga um erro caso algo falhe durante o processo.
      console.error(
        `Error while adding check flights access increment task: ${error}`
      );
    }
  },

  // Função responsável por agendar tarefas de atualização de disponibilidade de assentos
  // para todas as rotas ativas armazenadas no cache (Redis). Cada tarefa é enfileirada
  // individualmente com intervalo de 1 ano a partir da data atual.
  getSeatsAvailability: async (): Promise<undefined> => {
    // Busca as rotas armazenadas no cache
    const routes = await getRouteByCache(0);

    // Verifica se há rotas disponíveis no cache
    if (!routes) {
      console.log("No routes found in Redis");
      return;
    }

    // Define o intervalo de datas: de hoje até um ano à frente
    const dateToday = new Date();
    const date1Year = addYears(dateToday, 1);

    // Formata as datas no padrão yyyy-MM-dd
    const dateTodayStr = format(dateToday, "yyyy-MM-dd");
    const date1YearStr = format(date1Year, "yyyy-MM-dd");

    // Itera por todas as rotas ativas
    for (const route of routes) {
      if (!route.active) continue;

      // Monta os dados para a tarefa
      const data: UpdateSeatsAvailabilityType = {
        route: route,
        startDate: dateTodayStr,
        endDate: date1YearStr,
      };

      // Adiciona uma nova tarefa à fila para atualizar a disponibilidade da rota
      await queueHst.add(
        "updateSeatAvailability", // Nome da tarefa
        data,
        {
          priority: 0, // Define a prioridade da tarefa (0 para alta prioridade)
          delay: 0, // Define o atraso (0 segundos)
          attempts: 3, // Número de tentativas permitidas em caso de falha
          removeOnComplete: true, // Remove a tarefa da fila automaticamente após a conclusão bem-sucedida
          removeOnFail: false, // Mantém a tarefa na fila em caso de falha
          stackTraceLimit: 5, // Limita o número de rastros de pilha mantidos para erros
        }
      );
    }
  },

  // Função responsável por buscar a disponibilidade de assentos em uma rota específica
  // entre duas datas, considerando todas as cabines configuradas e direções (ida e volta).
  // A resposta é armazenada no banco após validação de milhas, disponibilidade e assentos restantes.
  updateSeatAvailability: async ({
    route,
    startDate,
    endDate,
  }: UpdateSeatsAvailabilityType): Promise<undefined> => {
    const url = "https://seats.aero";

    // Define os programas de milhagem que serão excluídos da verificação de assentos disponíveis
    const excludedSeatFilterPrograms = new Set(["azul"]);

    // Verifica se o programa de milhagem da rota deve aplicar o filtro de assentos
    const shouldCheckSeats = !excludedSeatFilterPrograms.has(
      route.mileageProgram
    );

    // Valor padrão de assentos usado apenas para programas de milhagem que ignoram o filtro de assentos reais
    const seatCountForExcludedPrograms = 9;

    // Remove do banco os dados antigos de disponibilidade para essa rota
    await prismaClient.routesData.deleteMany({
      where: { routeId: route.id },
    });

    // Itera sobre os dois sentidos da viagem: ida (outbound) e volta (return)
    for (const direction of ["outbound", "return"] as const) {
      // Define o aeroporto de origem com base na direção
      const originAirport =
        direction === "outbound"
          ? route.airports[0].airportCode
          : route.airports[1].airportCode;

      // Define o aeroporto de destino com base na direção
      const destinationAirport =
        direction === "outbound"
          ? route.airports[1].airportCode
          : route.airports[0].airportCode;

      // Loga informações úteis para debug
      console.log(
        `Route ${route.id} | ${originAirport} -> ${destinationAirport} | Mileage Program: ${route.mileageProgram}`
      );

      // Itera por todas as cabines configuradas na rota
      for (const cabin of route.cabins) {
        // Monta a URL da requisição com os filtros desejados
        let requestUrl = `${url}/partnerapi/search?origin_airport=${originAirport}&destination_airport=${destinationAirport}&cabin=${
          cabin.key
        }&start_date=${startDate}&end_date=${endDate}&take=1000&order_by=lowest_mileage&skip=0&only_direct_flights=${!route.enableLayovers}&source=${
          mileagePrograms[route.mileageProgram].key
        }`;

        try {
          // Faz a requisição principal à API do seats.aero
          let response = await api.get(requestUrl, {
            headers: {
              "Partner-Authorization": process.env.PARTNER_AUTHORIZATION,
              Accept: "application/json",
            },
          });

          if (response.status === 200) {
            const data: AvailabilityResponse = response.data;

            const seatAvailabilityList = data.data;

            // Enquanto houver mais páginas de dados, busca usando moreURL
            while (data.hasMore) {
              requestUrl = `${url}${data.moreURL}`;

              response = await api.get(requestUrl, {
                headers: {
                  "Partner-Authorization": process.env.PARTNER_AUTHORIZATION,
                  Accept: "application/json",
                },
              });

              if (response.status === 200) {
                const data: AvailabilityResponse = response.data;

                seatAvailabilityList.push(...data.data);
              } else {
                continue; // Pula em caso de erro na próxima página
              }
            }

            // Lista onde será armazenada a disponibilidade que será salva
            const seatAvailabilityToSave: FlightsAvailability[] = [];

            // Processa cada item de disponibilidade retornado
            for (const seatAvailability of seatAvailabilityList) {
              switch (cabin.key) {
                // Verifica disponibilidade para cabine econômica
                case "economy":
                  if (
                    seatAvailability.YDirect &&
                    seatAvailability.YDirectMileageCost <=
                      cabin.maximumPoints &&
                    (shouldCheckSeats
                      ? seatAvailability.YDirectRemainingSeats > 0
                      : true)
                  ) {
                    const seatCount = shouldCheckSeats
                      ? seatAvailability.YDirectRemainingSeats
                      : seatCountForExcludedPrograms;

                    seatAvailabilityToSave.push({
                      routeId: route.id,
                      cabinKey: cabin.key,
                      date: new Date(seatAvailability.Date),
                      direct: true,
                      originAirport: originAirport,
                      destinationAirport: destinationAirport,
                      seats: seatCount,
                    });
                  } else if (route.enableLayovers) {
                    if (
                      seatAvailability.YAvailable &&
                      seatAvailability.YMileageCost <= cabin.maximumPoints &&
                      (shouldCheckSeats
                        ? seatAvailability.YRemainingSeats > 0
                        : true)
                    ) {
                      const seatCount = shouldCheckSeats
                        ? seatAvailability.YRemainingSeats
                        : seatCountForExcludedPrograms;

                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),
                        direct: false,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatCount,
                      });
                    }
                  }
                  break;

                // Verifica disponibilidade para cabine executiva
                case "business":
                  if (
                    seatAvailability.JDirect &&
                    seatAvailability.JDirectMileageCost <=
                      cabin.maximumPoints &&
                    (shouldCheckSeats
                      ? seatAvailability.JDirectRemainingSeats > 0
                      : true)
                  ) {
                    const seatCount = shouldCheckSeats
                      ? seatAvailability.JDirectRemainingSeats
                      : seatCountForExcludedPrograms;

                    seatAvailabilityToSave.push({
                      routeId: route.id,
                      cabinKey: cabin.key,
                      date: new Date(seatAvailability.Date),
                      direct: true,
                      originAirport: originAirport,
                      destinationAirport: destinationAirport,
                      seats: seatCount,
                    });
                  } else if (route.enableLayovers) {
                    if (
                      seatAvailability.JAvailable &&
                      seatAvailability.JMileageCost <= cabin.maximumPoints &&
                      (shouldCheckSeats
                        ? seatAvailability.JRemainingSeats > 0
                        : true)
                    ) {
                      const seatCount = shouldCheckSeats
                        ? seatAvailability.JRemainingSeats
                        : seatCountForExcludedPrograms;

                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),
                        direct: false,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatCount,
                      });
                    }
                  }
                  break;

                // Verifica disponibilidade para primeira classe
                case "first":
                  if (
                    seatAvailability.FDirect &&
                    seatAvailability.FDirectMileageCost <=
                      cabin.maximumPoints &&
                    (shouldCheckSeats
                      ? seatAvailability.FDirectRemainingSeats > 0
                      : true)
                  ) {
                    const seatCount = shouldCheckSeats
                      ? seatAvailability.FDirectRemainingSeats
                      : seatCountForExcludedPrograms;

                    seatAvailabilityToSave.push({
                      routeId: route.id,
                      cabinKey: cabin.key,
                      date: new Date(seatAvailability.Date),
                      direct: true,
                      originAirport: originAirport,
                      destinationAirport: destinationAirport,
                      seats: seatCount,
                    });
                  } else if (route.enableLayovers) {
                    if (
                      seatAvailability.FAvailable &&
                      seatAvailability.FMileageCost <= cabin.maximumPoints &&
                      (shouldCheckSeats
                        ? seatAvailability.FRemainingSeats > 0
                        : true)
                    ) {
                      const seatCount = shouldCheckSeats
                        ? seatAvailability.FRemainingSeats
                        : seatCountForExcludedPrograms;

                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),
                        direct: false,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatCount,
                      });
                    }
                  }
                  break;

                // Verifica disponibilidade para premium economy
                case "premium":
                  if (
                    seatAvailability.WDirect &&
                    seatAvailability.WDirectMileageCost <=
                      cabin.maximumPoints &&
                    (shouldCheckSeats
                      ? seatAvailability.WDirectRemainingSeats > 0
                      : true)
                  ) {
                    const seatCount = shouldCheckSeats
                      ? seatAvailability.WDirectRemainingSeats
                      : seatCountForExcludedPrograms;

                    seatAvailabilityToSave.push({
                      routeId: route.id,
                      cabinKey: cabin.key,
                      date: new Date(seatAvailability.Date),
                      direct: true,
                      originAirport: originAirport,
                      destinationAirport: destinationAirport,
                      seats: seatCount,
                    });
                  } else if (route.enableLayovers) {
                    if (
                      seatAvailability.WAvailable &&
                      seatAvailability.WMileageCost <= cabin.maximumPoints &&
                      (shouldCheckSeats
                        ? seatAvailability.WRemainingSeats > 0
                        : true)
                    ) {
                      const seatCount = shouldCheckSeats
                        ? seatAvailability.WRemainingSeats
                        : seatCountForExcludedPrograms;

                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),
                        direct: false,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatCount,
                      });
                    }
                  }
                  break;
              }
            }

            // Salva no banco todas as disponibilidades válidas encontradas
            if (seatAvailabilityToSave.length > 0) {
              await prismaClient.routesData.createMany({
                data: seatAvailabilityToSave,
              });
            }
          } else {
            continue; // Pula em caso de status diferente de 200
          }
        } catch (error) {
          // Loga o erro, mas não interrompe o processo para outras rotas ou cabines
          console.error(
            `Error while fetching seat availability for route ${route.id}, cabin ${cabin.key}: ${error}`
          );
          continue;
        }
      }
    }
  },
};

// Função para obter uma tarefa registrada.
// Retorna a função correspondente ao nome da tarefa ou `undefined` caso a tarefa não exista.
export function getTask(
  name: string
): ((data: any) => Promise<any>) | undefined {
  return taskRegistry[name];
}
