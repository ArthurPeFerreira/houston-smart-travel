import { prismaClient } from "@/lib/prisma/prisma";
import { AccessCounterType, AccessCounterTypes } from "./types";

export async function getAcessCounter(
  type: AccessCounterTypes
): Promise<AccessCounterType | undefined> {
  try {
    // Tenta buscar um contador existente para o tipo informado
    const result = await prismaClient.accessCounter.findUnique({
      where: { type }, // Filtra registros cujo campo “type” seja igual ao parâmetro
      select: {
        type: true, // Só traz a coluna “type”
        count: true, // Só traz a coluna “count”
        lastAccessAt: true, // Só traz a coluna “lastAccessAt”
      },
    });

    // Se não houve registro prévio, criamos um novo com count = 0 e retornamos seus dados
    if (!result) {
      const created = await prismaClient.accessCounter.create({
        data: { type }, // Inicializa o novo registro com o tipo indicado
      });

      return {
        type: created.type as AccessCounterTypes, // Converte string para o tipo literal
        count: created.count, // Deve ser 0 (valor default do schema)
        lastAccessAt: created.lastAccessAt, // Timestamp de criação
      };
    }

    // Se encontrarmos um registro já existente, retornamos seus valores
    return {
      type: result.type as AccessCounterTypes, // Converte string para o tipo literal
      count: result.count, // Número de acessos já registrados
      lastAccessAt: result.lastAccessAt, // Data do último acesso salvo
    };
  } catch (error) {
    // Se qualquer operação de banco falhar, exibimos o erro e devolvemos undefined
    console.error("Failed to find Access Counter!", error);
    return undefined;
  } finally {
    // Fecha a conexão com o Prisma mesmo em caso de sucesso ou falha
    await prismaClient.$disconnect();
  }
}
