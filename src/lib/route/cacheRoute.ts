// Importa o cliente Redis para manipulação do cache
import { redis } from "../redis/redis";

// Importa a função `getRoute` responsável por buscar rotas no banco de dados
import { getRoute } from "./getRoute";

// Importa o tipo `RouteType` que representa a estrutura de uma rota
import { RouteType } from "./types";

// Define a chave utilizada para armazenar e recuperar os dados de rotas no Redis
const cacheKey: string = `hst:routes`;

// =====================================================================
// Função responsável por atualizar o cache com todas as rotas disponíveis
// =====================================================================
export async function updateRouteCache(): Promise<RouteType[] | undefined> {
  try {
    // Busca todas as rotas no banco de dados
    // O parâmetro 0 indica que todas as rotas devem ser retornadas
    const routes = await getRoute(0);

    // Armazena os dados das rotas no Redis, convertendo para JSON string
    await redis.set(cacheKey, JSON.stringify(routes));

    // Retorna os dados das rotas obtidas do banco
    return routes;
  } catch {
    // Caso ocorra erro durante o processo de atualização do cache
    console.error("Failed to Update Routes Cache!");
    return undefined;
  }
}

// =====================================================================
// Função responsável por buscar uma rota específica ou todas as rotas,
// diretamente do cache Redis (ou do banco, caso não esteja em cache)
// =====================================================================
export async function getRouteByCache(
  routeId: number
): Promise<RouteType[] | undefined> {
  try {
    // Tenta recuperar os dados de rotas armazenados no Redis
    const routesData = await redis.get(cacheKey);

    // Converte os dados JSON string para um array de objetos RouteType, se existir
    let routes: RouteType[] | undefined = routesData
      ? JSON.parse(routesData)
      : undefined;

    // Caso os dados não estejam no cache, atualiza o cache buscando do banco
    if (!routes) {
      routes = await updateRouteCache();
    }

    // Se após tentativa de atualização o cache ainda estiver vazio, lança erro
    if (!routes) {
      throw new Error("Failed to Find Routes!");
    }

    // Se um ID de rota for fornecido (maior que zero), busca apenas a rota correspondente
    if (routeId > 0) {
      // Busca a rota que corresponde ao ID fornecido
      const route = routes.find((route) => {
        return route.id == routeId;
      });

      // Se a rota não for encontrada, lança erro
      if (!route) {
        throw new Error("Failed to Find routes!");
      }

      // Retorna a rota específica encontrada, dentro de um array
      return [route];
    } else {
      // Caso nenhum ID tenha sido fornecido, retorna todas as rotas disponíveis
      return routes;
    }
  } catch {
    // Em caso de falha na recuperação do cache ou na busca no banco de dados
    console.error("Failed to Find Routes!");
    return undefined;
  }
}
