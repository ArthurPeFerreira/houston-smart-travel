// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache após modificações em rotas
import { updateRouteCache } from "./cacheRoute";

// Importa os tipos utilizados na função: dados de entrada e saída
import { EditRouteType, RouteType } from "./types";

// ==========================================================================
// Função assíncrona responsável por editar uma rota existente no banco
// ==========================================================================
export async function editRoute(
  routeInfo: EditRouteType
): Promise<RouteType | undefined> {
  try {
    // Remove todas as cabines associadas à rota para recriar os dados atualizados
    await prismaClient.cabinsRoute.deleteMany({
      where: { routeId: routeInfo.id },
    });

    // Mapeia os dados das novas cabines para serem inseridos
    const cabinsData = routeInfo.cabins.map((cabin) => {
      return {
        routeId: routeInfo.id,
        key: cabin.key,
        maximumPoints: cabin.maximumPoints,
        passagePriceFromAirport1To2: cabin.passagePriceFromAirport1To2,
        passagePriceFromAirport2To1: cabin.passagePriceFromAirport2To1,
        passagePriceRoundTrip: cabin.passagePriceRoundTrip,
        bagsAmount: cabin.bagsAmount,
      };
    });

    // Insere todas as cabines de uma vez com os novos dados
    await prismaClient.cabinsRoute.createMany({
      data: cabinsData,
    });

    // Atualiza os campos principais da rota no banco (programa, status e conexões)
    const route = await prismaClient.route.update({
      where: {
        id: routeInfo.id,
      },
      data: {
        active: routeInfo.active,
        mileageProgram: routeInfo.mileageProgram,
        enableLayovers: routeInfo.enableLayovers,
      },
      // Inclui os relacionamentos com aeroportos e cabines no retorno
      include: {
        airports: {
          select: { airport: true },
          orderBy: { id: "asc" }, // Garante ordem consistente dos aeroportos
        },
        cabins: {
          select: {
            id: true,
            key: true,
            maximumPoints: true,
            passagePriceFromAirport1To2: true,
            passagePriceFromAirport2To1: true,
            passagePriceRoundTrip: true,
            bagsAmount: true,
          },
          orderBy: { id: "asc" }, // Ordenação das cabines por ID
        },
      },
    });

    // Atualiza o cache das rotas com os dados atualizados
    await updateRouteCache();

    // Constrói o objeto no formato esperado por RouteType
    const formattedRoute: RouteType = {
      id: route.id,
      mileageProgram: route.mileageProgram,
      enableLayovers: route.enableLayovers,
      active: route.active,
      cabins: route.cabins,
      // Mapeia os aeroportos relacionando ao formato da API
      airports: route.airports.map((airport) => {
        return {
          id: airport.airport.id,
          city: airport.airport.city,
          airportCode: airport.airport.airportCode,
        };
      }),
    };

    // Retorna a rota editada formatada corretamente
    return formattedRoute;
  } catch {
    // Em caso de erro, loga a falha no console
    console.error("Failed to Edit Route!");
    return undefined;
  } finally {
    // Encerra a conexão com o Prisma para liberar recursos
    await prismaClient.$disconnect();
  }
}
