// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa o tipo LocalType para garantir a tipagem segura dos dados retornados
import { LocalType } from "./types";

// Função assíncrona responsável por buscar um Local específico (se o ID for fornecido)
// ou retornar todos os Locais cadastrados no banco de dados
export async function getLocal(
  localId: number // ID do Local a ser buscado (se > 0), ou 0 para buscar todos
): Promise<LocalType[] | undefined> {
  try {
    // Verifica se o parâmetro localId é válido e maior que zero
    if (localId > 0) {
      // Busca um único Local no banco de dados com base no ID fornecido
      const local = await prismaClient.locals.findUnique({
        where: {
          id: localId, // Filtra o Local pelo campo 'id'
        },
        // Define os campos que devem ser retornados na busca
        select: {
          id: true, // Retorna o ID do Local
          city: true, // Retorna o nome da cidade
          country: true, // Retorna o país
          passagePrice: true, // Retorna o valor da passagem
          image: true, // Retorna a URL da imagem associada ao Local
          active: true, // Retorna o status de ativação (ativo/inativo)
          airport: true, // Retorna os dados do aeroporto vinculado ao Local
        },
      });

      // Se nenhum Local for encontrado com o ID fornecido, loga erro e retorna undefined
      if (!local) {
        console.error("Local not found!");
        return undefined;
      }

      // Retorna o Local encontrado, encapsulado em um array
      return [local];
    } else {
      // Caso o localId não seja fornecido (ou seja 0), busca todos os Locais cadastrados
      const locais = await prismaClient.locals.findMany({
        orderBy: {
          id: "asc", // Ordena os resultados pelo ID de forma crescente
        },
        // Define os campos que devem ser retornados para cada Local
        select: {
          id: true, // Retorna o ID
          city: true, // Retorna a cidade
          country: true, // Retorna o país
          passagePrice: true, // Retorna o valor da passagem
          image: true, // Retorna a URL da imagem
          active: true, // Retorna o status ativo/inativo
          airport: true, // Retorna as informações do aeroporto relacionado
        },
      });

      // Retorna a lista completa de Locais encontrados
      return locais;
    }
  } catch (error) {
    // Em caso de erro durante a consulta, exibe mensagem no console com detalhes do erro
    console.error("Failed to Find Locals!", error);
    return undefined; // Retorna undefined para indicar falha na operação
  } finally {
    // Encerra a conexão com o Prisma, liberando os recursos do cliente
    await prismaClient.$disconnect();
  }
}
