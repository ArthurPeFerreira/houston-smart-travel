import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { getRouteByCache, updateRouteCache } from "./cacheRoute"; // Importa funções relacionadas ao cache das rotas
import { RouteType, CreateRouteType } from "./types"; // Importa os tipos utilizados na criação e retorno de rotas

// Função responsável por criar uma nova rota no banco de dados
export async function createRoute(
  routeInfo: CreateRouteType
): Promise<RouteType | undefined> {
  try {
    // Cria um novo registro de rota no banco de dados com base nas informações recebidas
    const routeCreated = await prismaClient.route.create({
      data: {
        hasCabinY: routeInfo.hasCabinY, // Indica se a rota possui cabine econômica
        hasCabinW: routeInfo.hasCabinW, // Indica se a rota possui cabine premium
        hasCabinJ: routeInfo.hasCabinJ, // Indica se a rota possui cabine executiva
        hasCabinF: routeInfo.hasCabinF, // Indica se a rota possui primeira classe
        mileageProgram: routeInfo.mileageProgram, // Nome do programa de milhagem associado
        maximumPoints: routeInfo.maximumPoints, // Número máximo de pontos permitido na rota
        passagePrice: routeInfo.passagePrice, // Preço da passagem associado à rota
      },
    });

    // Prepara os dados de associação entre aeroportos e a rota criada
    const insertAriportsRoute = routeInfo.airportsId.map((id) => {
      return {
        airportId: id, // ID do aeroporto
        routeId: routeCreated.id, // ID da rota recém-criada
      };
    });

    // Cria os relacionamentos entre aeroportos e a rota no banco de dados
    prismaClient.airportsRoute.createMany({
      data: insertAriportsRoute,
    });

    // Atualiza o cache das rotas no Redis após a criação da nova rota
    await updateRouteCache();

    // Busca a nova rota criada a partir do cache, usando o ID recém-gerado
    const route = await getRouteByCache(routeCreated.id)

    // Retorna a rota criada (caso encontrada no cache)
    return route ? route[0] : undefined;
  } catch {
    // Em caso de erro durante o processo, exibe mensagem de falha
    console.error("Failed to Create Route!");
    return undefined;
  } finally {
    // Garante o encerramento da conexão com o Prisma após a operação
    await prismaClient.$disconnect();
  }
}
