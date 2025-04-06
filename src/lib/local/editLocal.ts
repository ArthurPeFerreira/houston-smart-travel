// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache dos Locais
import { updateLocalCache } from "./cacheLocal";

// Importa os tipos utilizados para validação dos dados de entrada e saída
import { EditLocalType, LocalType } from "./types";

// Função assíncrona responsável por editar um Local existente no banco de dados
export async function editLocal(
  localInfo: EditLocalType // Objeto contendo os novos dados do Local a serem atualizados
): Promise<LocalType | undefined> {
  try {
    // Atualiza o Local no banco de dados baseado no airportId como chave de identificação
    const localEdited = await prismaClient.locals.update({
      where: {
        airportId: localInfo.airportId, // Utiliza o airportId para localizar o Local a ser editado
      },
      data: {
        city: localInfo.city, // Atualiza o nome da cidade
        country: localInfo.country, // Atualiza o país
        passagePrice: localInfo.passagePrice, // Atualiza o valor da passagem
        active: localInfo.active, // Atualiza o status de ativação do Local
      },
      // Define os campos a serem retornados após a atualização
      select: {
        id: true, // Retorna o ID do Local
        city: true, // Retorna o nome da cidade
        country: true, // Retorna o país
        passagePrice: true, // Retorna o preço da passagem
        image: true, // Retorna a URL da imagem associada
        active: true, // Retorna o status de ativação
        airport: true, // Retorna os dados do aeroporto vinculado ao Local
      },
    });

    // Atualiza o cache local dos Locais para refletir os dados recém-editados
    await updateLocalCache();

    // Retorna o objeto do Local atualizado contendo os campos selecionados
    return localEdited;
  } catch {
    // Captura e exibe erros que possam ocorrer durante a atualização
    console.error("Failed to Edit Local!");
    return undefined; // Retorna undefined para indicar falha na edição
  } finally {
    // Finaliza a conexão com o Prisma, garantindo liberação de recursos
    await prismaClient.$disconnect();
  }
}
