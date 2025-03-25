import { redis } from "../redis/redis"; // Importa o cliente Redis para manipulação de cache
import { getRoute } from "./getRoute"; // Importa a função getRoute para buscar rotas no banco de dados
import { RouteType } from "./types"; // Importa o tipo RouteType para tipagem das rotas

// Define a chave única usada para armazenar os dados das rotas no Redis
const cacheKey: string = `hst:routes`;

// Função responsável por atualizar o cache de rotas no Redis
export async function updateRouteCache(): Promise<RouteType[] | undefined> {
  try {
    // Obtém todas as rotas do banco de dados (passando 0 como parâmetro para retornar todas)
    const routes = await getRoute(0);

    // Salva os dados das rotas no Redis após convertê-los para string JSON
    await redis.set(cacheKey, JSON.stringify(routes));

    // Retorna as rotas recuperadas do banco
    return routes;
  } catch {
    // Em caso de erro na atualização do cache, exibe uma mensagem no console
    console.error("Failed to Update Routes Cache!");
    return undefined;
  }
}

// Função que busca uma rota específica ou todas as rotas diretamente do cache Redis
export async function getRouteByCache(routeId: number): Promise<RouteType[] | undefined> {
  try {
    // Recupera os dados das rotas armazenados no Redis (formato string JSON)
    const routesData = await redis.get(cacheKey);

    // Converte a string JSON de volta para array de objetos RouteType, se houver dados
    let routes: RouteType[] | undefined = routesData
      ? JSON.parse(routesData)
      : undefined;

    // Se os dados não estiverem no cache, realiza a atualização via banco de dados
    if (!routes) {
      routes = await updateRouteCache();
    }

    // Se ainda assim não for possível obter as rotas, lança erro
    if (!routes) {
      throw new Error("Failed to Find Routes!");
    }

    // Caso um ID específico de rota tenha sido fornecido
    if (routeId > 0) {
      // Procura pela rota que corresponde ao ID fornecido
      const route = routes.find((route) => {
        return route.id == routeId;
      });

      // Se não encontrar a rota, lança um erro
      if (!route) {
        throw new Error("Failed to Find routes!");
      }

      // Retorna a rota encontrada dentro de um array
      return [route];
    } else {
      // Se nenhum ID específico foi fornecido, retorna todas as rotas disponíveis
      return routes;
    }
  } catch {
    // Em caso de erro durante a leitura do cache ou busca no banco, registra mensagem de falha
    console.error("Failed to Find Routes!");
    return undefined;
  }
}
