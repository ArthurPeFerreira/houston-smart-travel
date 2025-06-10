import { prismaClient } from "@/lib/prisma/prisma";
import { AccessCounterType, AccessCounterTypes } from "./types";
import { updateAcessCounterCache } from "./cacheAcessCounter";

export async function resetAcessCounter(
  type: AccessCounterTypes
): Promise<AccessCounterType | undefined> {
  try {
    // Executa um upsert para garantir que exista um registro do contador com o tipo informado:
    // - Se não existir, cria (create) com count = 0.
    // - Se existir, atualiza (update) apenas o campo count para 0.
    const acessCounter = await prismaClient.accessCounter.upsert({
      where: { type }, // Critério de busca pelo campo “type”
      create: {
        type: type, // Novo registro inicia com o mesmo tipo
        count: 0, // Zera o contador ao criar
      },
      update: {
        count: 0, // Zera o contador ao atualizar
      },
      select: {
        type: true, // Retorna apenas o campo “type”
        count: true, // Retorna apenas o campo “count”
        lastAccessAt: true, // Retorna apenas o campo “lastAccessAt”
      },
    });

    await updateAcessCounterCache(type);

    // Mapeia o resultado do Prisma para o formato esperado pela aplicação
    return {
      type: acessCounter.type as AccessCounterTypes, // Converte para o tipo literal definido
      count: acessCounter.count, // Deve ser 0 após o upsert
      lastAccessAt: acessCounter.lastAccessAt, // Marca o timestamp pós-reset
    };
  } catch (error) {
    // Se algo falhar na operação de banco, registra o erro no console
    console.error("Failed to Reset Acess Counter!", error);
    return undefined; // Indica falha retornando undefined
  } finally {
    // Garante encerramento da conexão com o Prisma em qualquer cenário
    await prismaClient.$disconnect();
  }
}
