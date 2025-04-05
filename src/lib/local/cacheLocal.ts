import { redis } from "../redis/redis"; // Importa o cliente Redis para manipulação de cache
import { getLocal } from "./getLocal"; // Importa a função getLocal para buscar locais no banco de dados
import { LocalType } from "./types"; // Importa o tipo LocalType para garantir a tipagem correta

// Define a chave utilizada para armazenar os dados dos locais no Redis
const cacheKey: string = `hst:locals`;

// Função assíncrona para atualizar o cache de locais no Redis
export async function updateLocalCache(): Promise<LocalType[] | undefined> {
  try {
    // Busca todos os locais no banco de dados (LocalId = 0 retorna todos os locais)
    const locals = await getLocal(0);

    // Armazena os locais no Redis, convertendo o array de locais para uma string JSON
    await redis.set(cacheKey, JSON.stringify(locals));

    // Retorna a lista de locais obtida do banco de dados
    return locals;
  } catch {
    // Em caso de erro ao atualizar o cache, exibe uma mensagem de erro no console
    console.error("Failed to Update Locals Cache!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}

// Função assíncrona para buscar um local específico ou todos os locais do cache do Redis
export async function getLocalByCache(
  LocalId: number
): Promise<LocalType[] | undefined> {
  try {
    // Obtém os dados dos locais armazenados no Redis
    const localsData = await redis.get(cacheKey);

    // Converte os dados do Redis (string JSON) de volta para um array de locais, se existirem
    let locals: LocalType[] | undefined = localsData
      ? JSON.parse(localsData) // Se existir cache, faz o parsing para um array de objetos LocalType
      : undefined; // Caso contrário, define como undefined

    // Se não houver dados no cache, busca os locais no banco de dados e atualiza o cache
    if (!locals) {
      locals = await updateLocalCache();
    }

    // Se ainda assim não houver locais disponíveis, lança um erro
    if (!locals) {
      throw new Error("Failed to Find Locals!");
    }

    // Verifica se foi solicitado um ID específico (LocalId > 0)
    if (LocalId > 0) {
      // Busca o local específico dentro do array de locais armazenados no cache
      const Local = locals.find((Local) => {
        return Local.id == LocalId; // Compara o ID do local com o ID fornecido
      });

      // Se o local não for encontrado, lança um erro
      if (!Local) {
        throw new Error("Failed to Find Locals!");
      }

      // Retorna o local encontrado dentro de um array
      return [Local];
    } else {
      // Se LocalId for 0 ou um valor inválido, retorna todos os locais disponíveis
      return locals;
    }
  } catch {
    // Em caso de erro ao buscar os locais, exibe uma mensagem no console
    console.error("Failed to Find Locals!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}
