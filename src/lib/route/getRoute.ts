// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa o tipo RouteType que define a estrutura das rotas utilizadas na aplicação
import { RouteType } from "./types";

// ========================================================================================
// Função responsável por buscar uma rota específica (via ID) ou todas as rotas do sistema
// ========================================================================================
export async function getRoute(
  routeId: number
): Promise<RouteType[] | undefined> {
  try {
    // Verifica se foi fornecido um ID de rota válido (maior que zero)
    if (routeId > 0) {
      // Busca uma rota única no banco de dados com base no ID fornecido
      const route = await prismaClient.route.findUnique({
        where: {
          id: routeId,
        },
        // Inclui dados relacionados de aeroportos e cabines
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
              passagePriceFromAirport1To2: true,
              passagePriceFromAirport2To1: true,
              passagePriceRoundTrip: true,
              bagsAmount: true,
            },
            orderBy: { id: "asc" },
          },
        },
      });

      // Se nenhuma rota for encontrada, dispara um erro
      if (!route) {
        throw new Error("Failed to Find Route!");
      }

      // Formata os dados retornados para o padrão definido por RouteType
      const formattedRoute: RouteType = {
        id: route.id,
        mileageProgram: route.mileageProgram,
        enableLayovers: route.enableLayovers,
        active: route.active,
        cabins: route.cabins,
        // Mapeia os aeroportos relacionados à rota
        airports: route.airports.map((airport) => {
          return {
            id: airport.airport.id,
            city: airport.airport.city,
            airportCode: airport.airport.airportCode,
          };
        }),
      };

      // Retorna a rota encontrada encapsulada em um array
      return [formattedRoute];
    } else {
      // Caso nenhum ID específico tenha sido fornecido (<= 0), busca todas as rotas disponíveis
      const routes = await prismaClient.route.findMany({
        orderBy: {
          id: "asc",
        },
        // Inclui dados relacionados de aeroportos e cabines para cada rota
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
              passagePriceFromAirport1To2: true,
              passagePriceFromAirport2To1: true,
              passagePriceRoundTrip: true,
              bagsAmount: true,
            },
            orderBy: { id: "asc" },
          },
        },
      });

      // Se nenhuma rota for encontrada (raro, mas possível), lança erro
      if (!routes) {
        throw new Error("Failed to Find routes!");
      }

      // Formata a lista de rotas para o padrão esperado pela aplicação
      const formattedRoutes: RouteType[] = routes.map((route) => {
        return {
          id: route.id,
          mileageProgram: route.mileageProgram,
          enableLayovers: route.enableLayovers,
          active: route.active,
          cabins: route.cabins,
          // Mapeia os aeroportos associados à rota
          airports: route.airports.map((airport) => {
            return {
              id: airport.airport.id,
              city: airport.airport.city,
              airportCode: airport.airport.airportCode,
            };
          }),
        };
      });

      // Retorna todas as rotas formatadas
      return formattedRoutes;
    }
  } catch {
    // Em caso de erro, exibe uma mensagem genérica no console
    console.error("Failed to Find Routes!");
    return undefined;
  } finally {
    // Finaliza a conexão com o Prisma, liberando recursos
    await prismaClient.$disconnect();
  }
}
