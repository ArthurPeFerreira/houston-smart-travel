import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { RouteType } from "./types"; // Importa o tipo RouteType para garantir tipagem consistente

// Função responsável por buscar uma rota específica (via ID) ou todas as rotas do banco de dados
export async function getRoute(
  routeId: number
): Promise<RouteType[] | undefined> {
  try {
    // Caso um ID de rota tenha sido fornecido e seja maior que 0
    if (routeId > 0) {
      // Busca uma rota única com base no ID informado
      const route = await prismaClient.route.findUnique({
        where: {
          id: routeId, // Filtra a rota pelo ID
        },
        // Inclui os aeroportos relacionados à rota, acessando os dados do aeroporto
        include: {
          airports: { select: { airport: true } },
        },
      });

      // Se nenhuma rota for encontrada, lança um erro
      if (!route) {
        throw new Error("Failed to Find Route!");
      }

      // Formata os dados retornados para o formato definido por RouteType
      const formattedRoute: RouteType = {
        id: route.id,
        hasCabinY: route.hasCabinY,
        hasCabinW: route.hasCabinW,
        hasCabinJ: route.hasCabinJ,
        hasCabinF: route.hasCabinF,
        mileageProgram: route.mileageProgram,
        maximumPoints: route.maximumPoints,
        passagePrice: route.passagePrice,
        active: route.active,
        // Mapeia os aeroportos associados à rota
        airports: route.airports.map((airport) => {
          return {
            id: airport.airport.id,
            city: airport.airport.city,
            airportCode: airport.airport.airportCode,
          };
        }),
      };

      // Retorna a rota formatada dentro de um array
      return [formattedRoute];
    } else {
      // Caso nenhum ID específico tenha sido fornecido (ou seja <= 0), busca todas as rotas
      const routes = await prismaClient.route.findMany({
        orderBy: {
          id: "asc", // Ordena os resultados pelo ID de forma crescente
        },
        // Inclui os aeroportos relacionados em cada rota
        include: {
          airports: { select: { airport: true } },
        },
      });

      // Se a consulta não retornar nada (edge case), lança erro
      if (!routes) {
        throw new Error("Failed to Find routes!");
      }

      // Formata todas as rotas encontradas para o tipo RouteType
      const formattedRoutes: RouteType[] = routes.map((route) => {
        return {
          id: route.id,
          hasCabinY: route.hasCabinY,
          hasCabinW: route.hasCabinW,
          hasCabinJ: route.hasCabinJ,
          hasCabinF: route.hasCabinF,
          mileageProgram: route.mileageProgram,
          maximumPoints: route.maximumPoints,
          passagePrice: route.passagePrice,
          active: route.active,
          airports: route.airports.map((airport) => {
            return {
              id: airport.airport.id,
              city: airport.airport.city,
              airportCode: airport.airport.airportCode,
            };
          }),
        };
      });

      // Retorna o array de rotas formatadas
      return formattedRoutes;
    }
  } catch {
    // Em caso de erro, exibe mensagem padrão no console
    console.error("Failed to Find Routes!");
    return undefined;
  } finally {
    // Finaliza a conexão do Prisma com o banco de dados
    await prismaClient.$disconnect();
  }
}
