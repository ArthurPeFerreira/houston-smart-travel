// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache das rotas
import { updateRouteCache } from "./cacheRoute";

// Importa o tipo utilizado para definir a estrutura esperada da rota retornada
import { RouteType } from "./types";

// ======================================================================
// Função responsável por deletar uma rota do banco de dados via Prisma
// ======================================================================
export async function deleteRoute(
  routeId: number
): Promise<RouteType | undefined> {
  try {
    // Realiza a deleção da rota com base no ID fornecido
    // Também inclui dados relacionados de aeroportos e cabines para retorno
    const route = await prismaClient.route.delete({
      where: {
        id: routeId,
      },
      include: {
        // Inclui os aeroportos associados à rota (relacionamento via tabela de junção)
        airports: {
          select: { airport: true },
          orderBy: { id: "asc" },
        },
        // Inclui os dados das cabines vinculadas à rota
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

    // Após a exclusão da rota, atualiza o cache no Redis
    await updateRouteCache();

    // Constrói o objeto no formato esperado por RouteType a partir dos dados retornados
    const formattedRoute: RouteType = {
      id: route.id,
      mileageProgram: route.mileageProgram,
      enableLayovers: route.enableLayovers,
      active: route.active,
      cabins: route.cabins,
      // Converte os dados dos aeroportos para o formato simplificado
      airports: route.airports.map((airport) => {
        return {
          id: airport.airport.id,
          city: airport.airport.city,
          airportCode: airport.airport.airportCode,
        };
      }),
    };

    // Retorna os dados da rota deletada com os relacionamentos já formatados
    return formattedRoute;
  } catch {
    // Registra mensagem de erro caso ocorra falha durante o processo de exclusão
    console.error("Failed to Delete Route!");
    return undefined;
  } finally {
    // Finaliza a conexão com o Prisma, garantindo liberação de recursos
    await prismaClient.$disconnect();
  }
}
