// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função para atualizar o cache das rotas após modificações
import { updateRouteCache } from "./cacheRoute";

// Importa os tipos utilizados para entrada (EditRouteType) e retorno (RouteType)
import { EditRouteType, RouteType } from "./types";

// ==========================================================================
// Função assíncrona responsável por editar uma rota existente no banco
// ==========================================================================
export async function editRoute(
  routeInfo: EditRouteType
): Promise<RouteType | undefined> {
  try {
    // Itera sobre a lista de cabines fornecidas para atualizar cada uma no banco
    for (const cabin of routeInfo.cabins) {
      await prismaClient.cabinsRoute.update({
        where: {
          // Utiliza a constraint composta `routeId` + `key` para identificar a cabine
          UniqueCabinPerRoute: { routeId: routeInfo.id, key: cabin.key },
        },
        // Aplica as alterações nos campos da cabine
        data: {
          maximumPoints: cabin.maximumPoints,
          passagePrice: cabin.passagePrice,
          cancellationPrice: cabin.cancellationPrice,
          bagsAmount: cabin.bagsAmount,
        },
      });
    }

    // Atualiza os dados principais da rota (status e programa de milhagem)
    const route = await prismaClient.route.update({
      where: {
        id: routeInfo.id,
      },
      data: {
        active: routeInfo.active,
        mileageProgram: routeInfo.mileageProgram,
        enableLayovers: routeInfo.enableLayovers,
      },
      // Inclui os relacionamentos com aeroportos e cabines para retorno completo
      include: {
        airports: {
          select: { airport: true },
          orderBy: { id: "asc" },
        },
        cabins: {
          select: {
            id: true,
            key: true,
            maximumPoints: true,
            passagePrice: true,
            cancellationPrice: true,
            bagsAmount: true,
          },
          orderBy: { id: "asc" },
        },
      },
    });

    // Atualiza o cache das rotas após a edição
    await updateRouteCache();

    // Formata os dados retornados para o formato do tipo `RouteType`
    const formattedRoute: RouteType = {
      id: route.id,
      mileageProgram: route.mileageProgram,
      enableLayovers: route.enableLayovers,
      active: route.active,
      cabins: route.cabins,
      // Constrói o array de aeroportos com os dados essenciais
      airports: route.airports.map((airport) => {
        return {
          id: airport.airport.id,
          city: airport.airport.city,
          airportCode: airport.airport.airportCode,
        };
      }),
    };

    // Retorna os dados atualizados da rota formatados
    return formattedRoute;
  } catch {
    // Em caso de falha no processo, exibe uma mensagem de erro no console
    console.error("Failed to Edit Route!");
    return undefined;
  } finally {
    // Garante o encerramento da conexão com o Prisma após a operação
    await prismaClient.$disconnect();
  }
}
