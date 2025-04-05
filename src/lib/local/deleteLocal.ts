// Importa o cliente do Prisma para interagir com o banco de dados
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache local após alterações
import { updateLocalCache } from "./cacheLocal";

// Importa o tipo LocalType para garantir tipagem consistente na resposta
import { LocalType } from "./types";

// Importa a API de Promises do módulo fs para manipulação assíncrona de arquivos
import { promises as fs } from "fs";

// Importa utilitários do módulo path para montagem de caminhos de arquivo
import path from "path";

// Função assíncrona responsável por deletar um Local do banco de dados com base no ID informado
export async function deleteLocal(
  localId: number // Identificador único do Local a ser removido
): Promise<LocalType | undefined> {
  try {
    // Realiza a exclusão do Local do banco de dados utilizando o ID como filtro
    const local = await prismaClient.locals.delete({
      where: {
        id: localId, // Filtra o registro a ser deletado pelo ID fornecido
      },
      // Define os campos que devem ser retornados após a deleção
      select: {
        id: true, // Retorna o ID do Local deletado
        city: true, // Retorna o nome da cidade
        country: true, // Retorna o país
        passagePrice: true, // Retorna o preço da passagem
        image: true, // Retorna a URL da imagem associada
        active: true, // Retorna o status de ativação
        airport: true, // Retorna os dados do aeroporto associado ao Local
      },
    });

    // Constrói o caminho absoluto para o arquivo de imagem correspondente ao Local
    const imagePath = path.join(
      process.cwd(), // Diretório raiz da aplicação
      "public/locals/images", // Subpasta onde as imagens dos locais estão armazenadas
      `${local.airport.id}.jpg` // Nome do arquivo baseado no ID do aeroporto
    );

    // Remove o arquivo de imagem do sistema de arquivos
    await fs.unlink(imagePath);

    // Atualiza o cache local para refletir a exclusão do Local
    await updateLocalCache();

    // Retorna os dados do Local que foi deletado
    return local;
  } catch {
    // Captura erros durante o processo e exibe mensagem no console
    console.error("Failed to Delete Local!");
    return undefined; // Retorna undefined para indicar que a exclusão falhou
  } finally {
    // Encerra a conexão com o banco de dados, independentemente do sucesso ou falha
    await prismaClient.$disconnect();
  }
}
