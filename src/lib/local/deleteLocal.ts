// Importa o cliente do Prisma para interagir com o banco de dados
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../aws/s3/s3Client";
import { prismaClient } from "../prisma/prisma";

// Importa a função responsável por atualizar o cache local após alterações
import { updateLocalCache } from "./cacheLocal";

// Importa o tipo LocalType para garantir tipagem consistente na resposta
import { LocalType } from "./types";

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

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: `${process.env.BUCKET_NAME}`, // nome do bucket
        Key: `${local.airport.id}.jpg`, // caminho/arquivo a apagar
      })
    );
    
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
