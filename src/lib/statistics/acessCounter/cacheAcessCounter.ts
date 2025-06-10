import { redis } from "@/lib/redis/redis";
import { getAcessCounter } from "./getAcessCounter";
import { AccessCounterType, AccessCounterTypes } from "./types";

export async function updateAcessCounterCache(
  type: AccessCounterTypes
): Promise<AccessCounterType | undefined> {
  try {
    // Define a chave única no Redis para armazenar o contador conforme o tipo
    const cacheKey: string = `hst:statistics:acessCounter:${type}`;

    // Executa a leitura ou criação do contador no banco de dados
    const acessCounter = await getAcessCounter(type);

    // Armazena o objeto retornado (ou undefined) no Redis em formato JSON
    await redis.set(cacheKey, JSON.stringify(acessCounter));

    // Retorna o objeto salvo para uso imediato na aplicação
    return acessCounter;
  } catch (error) {
    // Loga qualquer falha durante a atualização do cache
    console.error("Failed to Update Acess Counter Cache!", error);
  }
}

export async function getAcessCounterByCache(
  type: AccessCounterTypes
): Promise<AccessCounterType | undefined> {
  try {
    // Reconstrói a mesma chave usada para armazenar o contador no Redis
    const cacheKey: string = `hst:statistics:acessCounter:${type}`;

    // Tenta ler o valor armazenado no cache (string JSON ou null)
    const acessCounterData = await redis.get(cacheKey);

    // Se existir JSON no cache, converte para objeto; senão, undefined
    let acessCounter: AccessCounterType | undefined = acessCounterData
      ? JSON.parse(acessCounterData)
      : undefined;

    // Caso não tenha vindo nada do cache, faz update no cache via BD e obtém o resultado
    if (!acessCounter) {
      acessCounter = await updateAcessCounterCache(type);
    }

    // Se mesmo após atualizar o cache não houver valor, considera erro
    if (!acessCounter) {
      throw new Error("Failed to Find Acess Counter!");
    }

    // Retorna o contador válido (lido do cache ou recém-atualizado)
    return acessCounter;
  } catch {
    // Loga falha ao recuperar do cache ou atualizar e devolve undefined
    console.error("Failed to Find Acess Counter!");
    return undefined;
  }
}
