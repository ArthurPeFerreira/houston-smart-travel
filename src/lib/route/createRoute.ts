// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa funções para leitura e atualização do cache de rotas
import { getRouteByCache, updateRouteCache } from "./cacheRoute";

// Importa os tipos utilizados para criação e retorno de rotas
import { RouteType, CreateRouteType } from "./types";

// ==========================================================
// Função responsável por criar uma nova rota no banco de dados
// ==========================================================
export async function createRoute(
  routeInfo: CreateRouteType
): Promise<RouteType | undefined> {
  try {
    // Cria um novo registro na tabela `Route` com o programa de milhagem informado
    const routeCreated = await prismaClient.route.create({
      data: {
        mileageProgram: routeInfo.mileageProgram,
        enableLayovers: routeInfo.enableLayovers,
      },
    });

    // Mapeia os IDs dos aeroportos recebidos para o formato esperado na tabela de junção
    const insertAriportsRoute = routeInfo.airportsId.map((id) => {
      return {
        airportId: id,
        routeId: routeCreated.id,
      };
    });

    // Cria os relacionamentos entre a nova rota e os aeroportos envolvidos (tabela de junção AirportsRoute)
    prismaClient.airportsRoute.createMany({
      data: insertAriportsRoute,
    });

    // Mapeia os dados das cabines da rota para o formato da tabela CabinsRoute
    const insertCabinsRoute = routeInfo.cabins.map((cabin) => {
      return {
        routeId: routeCreated.id,
        key: cabin.key,
        maximumPoints: cabin.maximumPoints,
        passagePrice: cabin.passagePrice,
        cancellationPrice: cabin.cancellationPrice,
      };
    });

    // Cria os registros das cabines associadas à nova rota (tabela de junção CabinsRoute)
    prismaClient.cabinsRoute.createMany({
      data: insertCabinsRoute,
    });

    // Atualiza o cache de rotas no Redis após a criação da nova rota
    await updateRouteCache();

    // Recupera a rota recém-criada diretamente do cache, utilizando seu ID
    const route = await getRouteByCache(routeCreated.id);

    // Retorna o objeto da rota criada (caso encontrada no cache)
    return route ? route[0] : undefined;
  } catch {
    // Em caso de erro, registra falha no processo de criação da rota
    console.error("Failed to Create Route!");
    return undefined;
  } finally {
    // Encerra a conexão do Prisma com o banco de dados para liberar recursos
    await prismaClient.$disconnect();
  }
}
