import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateRouteCache } from "./cacheRoute"; // Importa a função para atualizar o cache após a deleção
import { RouteType } from "./types"; // Importa o tipo RouteType para garantir tipagem no retorno

// Função responsável por deletar uma rota do banco de dados com base no ID fornecido
export async function deleteRoute(
  routeId: number
): Promise<RouteType | undefined> {
  try {
    // Executa a deleção da rota no banco de dados via Prisma
    const route = await prismaClient.route.delete({
      where: {
        id: routeId, // Define a condição de busca para deleção com base no ID da rota
      },
      // Inclui os aeroportos relacionados à rota para que possam ser retornados posteriormente
      include: { airports: { select: { airport: true } } },
    });

    // Atualiza o cache das rotas após a exclusão da rota do banco
    await updateRouteCache();

    // Formata os dados da rota deletada para retornar no formato esperado pelo tipo RouteType
    const formattedRoute: RouteType = {
      id: route.id,
      hasCabinY: route.hasCabinY, // Indica se tinha cabine econômica
      hasCabinW: route.hasCabinW, // Indica se tinha cabine premium
      hasCabinJ: route.hasCabinJ, // Indica se tinha cabine executiva
      hasCabinF: route.hasCabinF, // Indica se tinha primeira classe
      mileageProgram: route.mileageProgram, // Programa de milhagem associado
      maximumPoints: route.maximumPoints, // Pontos máximos permitidos
      passagePrice: route.passagePrice, // Preço da passagem
      active: route.active, // Status de ativação da rota
      // Mapeia os aeroportos relacionados, extraindo os dados necessários
      airports: route.airports.map((airport) => {
        return {
          id: airport.airport.id,
          city: airport.airport.city,
          airportCode: airport.airport.airportCode,
        };
      }),
    };

    // Retorna a rota deletada com os dados formatados
    return formattedRoute;
  } catch {
    // Em caso de erro durante a exclusão, registra uma mensagem no console
    console.error("Failed to Delete Route!");
    return undefined;
  } finally {
    // Encerra a conexão com o Prisma após a operação
    await prismaClient.$disconnect();
  }
}
