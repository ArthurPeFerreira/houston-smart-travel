// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função para atualizar o cache local após alterações no banco de dados
import { updateLocalCache } from "./cacheLocal";

// Importa os tipos utilizados para validação e definição dos dados esperados
import { CreateLocalType, LocalType } from "./types";

// Função assíncrona responsável por criar um novo registro de Local no banco de dados
export async function createLocal(
  localInfo: CreateLocalType // Objeto contendo as informações necessárias para criar um Local
): Promise<LocalType | undefined> {
  try {
    // Realiza a criação do Local no banco de dados utilizando o Prisma ORM
    const local = await prismaClient.locals.create({
      data: {
        city: localInfo.city, // Atribui o nome da cidade ao novo Local
        country: localInfo.country, // Atribui o país correspondente
        passagePrice: localInfo.passagePrice, // Define o preço da passagem
        image: localInfo.image, // Define a URL da imagem representando o Local
        airportId: localInfo.airportId, // Define o ID do aeroporto vinculado ao Local
      },
      // Define os campos que devem ser retornados após a criação
      select: {
        id: true, // Retorna o ID único do Local
        city: true, // Retorna o nome da cidade
        country: true, // Retorna o país
        passagePrice: true, // Retorna o valor da passagem
        image: true, // Retorna a URL da imagem
        active: true, // Retorna o status de ativação do Local
        airport: true, // Retorna os dados do aeroporto relacionado
      },
    });

    // Após a criação bem-sucedida, atualiza o cache local para refletir o novo estado
    await updateLocalCache();

    // Retorna o objeto Local criado contendo os campos selecionados
    return local;
  } catch {
    // Captura falhas que podem ocorrer durante o processo e registra no console
    console.error("Failed to Create Local!");
    return undefined; // Retorna undefined indicando falha na criação
  } finally {
    // Encerra a conexão com o banco de dados de forma segura, independentemente do sucesso ou erro
    await prismaClient.$disconnect();
  }
}
