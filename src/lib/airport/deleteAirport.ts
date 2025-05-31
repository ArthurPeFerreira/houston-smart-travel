import { prismaClient } from "../prisma/prisma"; // Cliente do Prisma para operações no banco de dados
import { updateAirportCache } from "./cacheAirport"; // Função para atualizar o cache de aeroportos
import { AirportType } from "./types"; // Tipo TypeScript representando um aeroporto
import { updateLocalCache } from "../local/cacheLocal"; // Função para atualizar o cache de locais
import { updateRouteCache } from "../route/cacheRoute"; // Função para atualizar o cache de rotas
import { s3Client } from "../aws/s3/s3Client"; // Cliente AWS S3 para manipulação de arquivos na nuvem
import { DeleteObjectCommand } from "@aws-sdk/client-s3"; // Comando para deletar objeto no S3

// Função para deletar um Aeroporto do banco de dados com base no ID
export async function deleteAirport(
  airportId: number
): Promise<AirportType | undefined> {
  try {
    // Busca as rotas associadas ao aeroporto
    const routesToDelete = await prismaClient.airportsRoute.findMany({
      where: { airportId: airportId },
    });

    // Se existirem rotas relacionadas, deleta todas de uma vez pelo ID
    if (routesToDelete.length > 0) {
      const routeIds = routesToDelete.map((route) => route.routeId);
      await prismaClient.route.deleteMany({
        where: { id: { in: routeIds } },
      });
    }

    // Deleta o Aeroporto do banco de dados usando o Prisma
    const airport = await prismaClient.airports.delete({
      where: {
        id: airportId, // Filtra o Aeroporto a ser deletado pelo ID
      },
      include: {
        local: true,
      },
    });

    if (airport.local) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: `${process.env.BUCKET_NAME}`, // nome do bucket
          Key: `locals/${airport.local.image}`, // caminho/arquivo a apagar
        })
      );
    }

    // Atualiza o Cache dos Aeroportos para refletir a remoção
    await updateAirportCache();

    // Atualiza o Cache dos Aeroportos para refletir a remoção
    await updateLocalCache();

    // Atualiza o Cache das Rotas para refletir a remoção
    await updateRouteCache();

    // Retorna o Aeroporto deletado para referência
    return airport;
  } catch {
    // Em caso de erro, exibe uma mensagem no console
    console.error("Failed to Delete Airport!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  } finally {
    // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
    await prismaClient.$disconnect();
  }
}
