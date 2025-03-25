import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateRouteCache } from "./cacheRoute"; // Importa a função para atualizar o cache de rotas
import { EditRouteType, RouteType } from "./types"; // Importa os tipos utilizados para entrada e retorno da função

// Função assíncrona responsável por editar uma rota existente no banco de dados
export async function editRoute(
  routeInfo: EditRouteType
): Promise<RouteType | undefined> {
  try {
    // Atualiza a rota no banco de dados com base no ID e nas novas informações fornecidas
    const route = await prismaClient.route.update({
      where: {
        id: routeInfo.id, // Localiza a rota que será atualizada pelo seu ID
      },
      data: routeInfo, // Aplica as alterações usando os dados fornecidos
      // Inclui os dados dos aeroportos associados para que possam ser retornados no objeto final
      include: { airports: { select: { airport: true } } },
    });

    // Atualiza o cache das rotas após a modificação dos dados no banco
    await updateRouteCache();

    // Formata os dados da rota atualizada para o formato definido por RouteType
    const formattedRoute: RouteType = {
      id: route.id,
      hasCabinY: route.hasCabinY, // Indica se a rota possui cabine econômica
      hasCabinW: route.hasCabinW, // Indica se a rota possui cabine premium
      hasCabinJ: route.hasCabinJ, // Indica se a rota possui cabine executiva
      hasCabinF: route.hasCabinF, // Indica se a rota possui primeira classe
      mileageProgram: route.mileageProgram, // Programa de milhagem associado
      maximumPoints: route.maximumPoints, // Pontuação máxima permitida
      passagePrice: route.passagePrice, // Preço da passagem
      active: route.active, // Status da rota (ativa ou inativa)
      // Mapeia os aeroportos associados, formatando conforme necessário
      airports: route.airports.map((airport) => {
        return {
          id: airport.airport.id,
          city: airport.airport.city,
          airportCode: airport.airport.airportCode,
        };
      }),
    };

    // Retorna os dados atualizados da rota
    return formattedRoute;
  } catch {
    // Em caso de falha na atualização, registra uma mensagem de erro no console
    console.error("Failed to Edit Route!");
    return undefined;
  } finally {
    // Encerra a conexão com o Prisma, independentemente do sucesso ou falha da operação
    await prismaClient.$disconnect();
  }
}
