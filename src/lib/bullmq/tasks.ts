/* eslint-disable @typescript-eslint/no-explicit-any */
// Registro de tarefas, associando nomes a funções assíncronas
import { addYears, format } from "date-fns";
import { prismaClient } from "../prisma/prisma";
import { getRouteByCache } from "../route/cacheRoute";
import { mileagePrograms } from "../route/mileagePrograms";
import { api } from "../api/api";
import { AvailabilityResponse, FlightsAvailability } from "../route/types";
import { updateAcessCounterCache } from "../statistics/acessCounter/cacheAcessCounter";

// Cada chave no `taskRegistry` é uma tarefa que pode ser chamada dinamicamente, associada a uma função que processa dados.
const taskRegistry: { [key: string]: (data: any) => Promise<void> } = {
  // Função assíncrona para atualizar a contagem de acessos à página inicial.
  incrementHomeAccessCount: async (): Promise<any> => {
    try {
      const access = await prismaClient.accessCounter.findFirst({where:{type: "home"}});

      if (access) {
        await prismaClient.accessCounter.update({
          where: { id: access.id },
          data: {
            count: access.count + 1,
            lastAccessAt: new Date(),
          },
        });
      } else {
        await prismaClient.accessCounter.create({
          data: {
            type: "home",
            count: 1,
            lastAccessAt: new Date(),
          },
        });
      }
      await updateAcessCounterCache("home")
    } catch (error) {
      // Loga um erro caso algo falhe durante o processo.
      console.error(`Error while adding home access increment task: ${error}`);
    }
  },

  // Função assíncrona para atualizar a contagem de acessos à página inicial.
  incrementCheckFlightsAccessCount: async (): Promise<any> => {
    try {
      const access = await prismaClient.accessCounter.findFirst({where:{type: "check flights"}});

      if (access) {
        await prismaClient.accessCounter.update({
          where: { id: access.id },
          data: {
            count: access.count + 1,
            lastAccessAt: new Date(),
          },
        });
      } else {
        await prismaClient.accessCounter.create({
          data: {
            type: "check flights",
            count: 1,
            lastAccessAt: new Date(),
          },
        });
      }

      await updateAcessCounterCache("check flights")
    } catch (error) {
      // Loga um erro caso algo falhe durante o processo.
      console.error(`Error while adding check flights access increment task: ${error}`);
    }
  },

  getSeatsAvailability: async (): Promise<any> => {
    await prismaClient.routesData.deleteMany();

    const routes = await getRouteByCache(0);

    if (!routes) {
      console.log("No routes found in Redis");
      return;
    }
    const dateToday = new Date();
    const date1Year = addYears(dateToday, 1);

    const dateTodayStr = format(dateToday, "yyyy-MM-dd");
    const date1YearStr = format(date1Year, "yyyy-MM-dd");

    for (const route of routes) {
      if (!route.active) continue;

      for (const direction of ["outbound", "return"] as const) {
        const originAirport =
          direction === "outbound"
            ? route.airports[0].airportCode
            : route.airports[1].airportCode;

        const destinationAirport =
          direction === "outbound"
            ? route.airports[1].airportCode
            : route.airports[0].airportCode;

        console.log(
          `Route ${route.id} | ${originAirport} -> ${destinationAirport} | Mileage Program: ${route.mileageProgram}`
        );

        for (const cabin of route.cabins) {
          const url = "https://seats.aero";

          let requestUrl = `${url}/partnerapi/search?origin_airport=${originAirport}&destination_airport=${destinationAirport}&cabin=${
            cabin.key
          }&start_date=${dateTodayStr}&end_date=${date1YearStr}&take=1000&order_by=lowest_mileage&skip=0&only_direct_flights=${!route.enableLayovers}&source=${
            mileagePrograms[route.mileageProgram].key
          }`;

          try {
            let response = await api.get(requestUrl, {
              headers: {
                "Partner-Authorization": process.env.PARTNER_AUTHORIZATION,
                Accept: "application/json",
              },
            });

            if (response.status === 200) {
              const data: AvailabilityResponse = response.data;
              
              const seatAvailabilityList = data.data;

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
                  continue;
                }
              }

              const seatAvailabilityToSave: FlightsAvailability[] = [];

              for (const seatAvailability of seatAvailabilityList) {
                switch (cabin.key) {
                  case "economy":
                    if (
                      seatAvailability.YDirect &&
                      seatAvailability.YDirectMileageCost <=
                        cabin.maximumPoints &&
                      seatAvailability.YDirectRemainingSeats > 0
                    ) {
                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),

                        direct: true,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatAvailability.YDirectRemainingSeats,
                      });
                    } else if (route.enableLayovers) {
                      if (
                        seatAvailability.YAvailable &&
                        seatAvailability.YMileageCost <= cabin.maximumPoints &&
                        seatAvailability.YRemainingSeats > 0
                      ) {
                        seatAvailabilityToSave.push({
                          routeId: route.id,
                          cabinKey: cabin.key,
                          date: new Date(seatAvailability.Date),

                          direct: false,
                          originAirport: originAirport,
                          destinationAirport: destinationAirport,
                          seats: seatAvailability.YRemainingSeats,
                        });
                      }
                    }
                    break;

                  case "business":
                    if (
                      seatAvailability.JDirect &&
                      seatAvailability.JDirectMileageCost <=
                        cabin.maximumPoints &&
                      seatAvailability.JDirectRemainingSeats > 0
                    ) {
                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),

                        direct: true,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatAvailability.JDirectRemainingSeats,
                      });
                    } else if (route.enableLayovers) {
                      if (
                        seatAvailability.JAvailable &&
                        seatAvailability.JMileageCost <= cabin.maximumPoints &&
                        seatAvailability.JRemainingSeats > 0
                      ) {
                        seatAvailabilityToSave.push({
                          routeId: route.id,
                          cabinKey: cabin.key,
                          date: new Date(seatAvailability.Date),

                          direct: false,
                          originAirport: originAirport,
                          destinationAirport: destinationAirport,
                          seats: seatAvailability.JRemainingSeats,
                        });
                      }
                    }
                    break;

                  case "first":
                    if (
                      seatAvailability.FDirect &&
                      seatAvailability.FDirectMileageCost <=
                        cabin.maximumPoints &&
                      seatAvailability.FDirectRemainingSeats > 0
                    ) {
                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),

                        direct: true,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatAvailability.FDirectRemainingSeats,
                      });
                    } else if (route.enableLayovers) {
                      if (
                        seatAvailability.FAvailable &&
                        seatAvailability.FMileageCost <= cabin.maximumPoints &&
                        seatAvailability.FRemainingSeats > 0
                      ) {
                        seatAvailabilityToSave.push({
                          routeId: route.id,
                          cabinKey: cabin.key,
                          date: new Date(seatAvailability.Date),

                          direct: false,
                          originAirport: originAirport,
                          destinationAirport: destinationAirport,
                          seats: seatAvailability.FRemainingSeats,
                        });
                      }
                    }
                    break;

                  case "premium":
                    if (
                      seatAvailability.WDirect &&
                      seatAvailability.WDirectMileageCost <=
                        cabin.maximumPoints &&
                      seatAvailability.WDirectRemainingSeats > 0
                    ) {
                      seatAvailabilityToSave.push({
                        routeId: route.id,
                        cabinKey: cabin.key,
                        date: new Date(seatAvailability.Date),

                        direct: true,
                        originAirport: originAirport,
                        destinationAirport: destinationAirport,
                        seats: seatAvailability.WDirectRemainingSeats,
                      });
                    } else if (route.enableLayovers) {
                      if (
                        seatAvailability.WAvailable &&
                        seatAvailability.WMileageCost <= cabin.maximumPoints &&
                        seatAvailability.WRemainingSeats > 0
                      ) {
                        seatAvailabilityToSave.push({
                          routeId: route.id,
                          cabinKey: cabin.key,
                          date: new Date(seatAvailability.Date),

                          direct: false,
                          originAirport: originAirport,
                          destinationAirport: destinationAirport,
                          seats: seatAvailability.WRemainingSeats,
                        });
                      }
                    }
                    break;
                }
              }

              if (seatAvailabilityToSave.length > 0) {
                await prismaClient.routesData.createMany({
                  data: seatAvailabilityToSave,
                });
              }
            } else {
              continue;
            }
          } catch (error) {
            console.error(
              `Error while fetching seat availability for route ${route.id}, cabin ${cabin.key}: ${error}`
            );
            continue;
          }
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
