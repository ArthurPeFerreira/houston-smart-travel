// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache local dos Locais
import { updateLocalCache } from "./cacheLocal";

// Importa os tipos utilizados para garantir tipagem correta dos dados de entrada e saída
import { EditLocalType, LocalType } from "./types";

// Função assíncrona responsável por reordenar os Locais no banco de dados
export async function editLocalsOrder(
  localInfo: LocalType[] // Lista de Locais contendo a nova ordem desejada
): Promise<LocalType[] | undefined> {
  try {
    // Transforma a lista recebida (LocalType[]) no formato exigido pelo método createMany (CreateLocalType[])
    const newLocalOrder: EditLocalType[] = localInfo.map((local) => {
      return {
        city: local.city, // Atribui a cidade do local
        country: local.country, // Atribui o país do local
        passagePrice: local.passagePrice, // Atribui o preço da passagem
        image: local.image, // Atribui a URL da imagem
        airportId: local.airport.id, // Usa o ID do aeroporto relacionado como chave estrangeira
        active: local.active 
      };
    });

    // Remove todos os registros da tabela 'locals' para redefinir completamente a ordem
    await prismaClient.locals.deleteMany();

    // Insere todos os Locais novamente na nova ordem definida, em operação em massa
    await prismaClient.locals.createMany({ data: newLocalOrder });

    // Atualiza o cache local para refletir o novo estado dos dados no banco
    const newLocals = await updateLocalCache();

    // Retorna a lista atualizada de Locais com a nova ordenação
    return newLocals;
  } catch {
    // Captura qualquer erro durante o processo e registra no console
    console.error("Failed to Edit Locals Order!");
    return undefined; // Retorna undefined indicando falha na reordenação
  } finally {
    // Finaliza a conexão com o banco de dados, liberando os recursos
    await prismaClient.$disconnect();
  }
}
