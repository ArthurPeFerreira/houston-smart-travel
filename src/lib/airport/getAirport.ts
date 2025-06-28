import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { AirportType } from "./types"; // Importa o tipo AirportType para tipagem segura

// Função para buscar um Aeroporto ou todos os Aeroportos no banco de dados
export async function getAirport(
  airportId: number
): Promise<AirportType[] | undefined> {
  try {
    // Verifica se o airportId é maior que 0 (ou seja, se um ID específico foi fornecido)
    if (airportId > 0) {
      // Busca um Aeroporto específico no banco de dados usando o Prisma
      const airport = await prismaClient.airports.findUnique({
        where: {
          id: airportId, // Filtra pelo ID do Aeroporto
        },
      });

      // Se o Aeroporto não for encontrado, lança um erro
      if (!airport) {
        throw new Error("Failed to Find Airport!");
      }

      // Retorna o Aeroporto encontrado dentro de um array
      return [airport];
    } else {
      // Se o airportId não for válido (<= 0), busca todos os Aeroportos no banco de dados
      const airports = await prismaClient.airports.findMany({
        orderBy: {
          city: "asc", // Ordena os aeroportos por cidade em ordem alfabética ascendente
        },
      });

      // Se nenhum Aeroporto for encontrado, lança um erro
      if (!airports) {
        throw new Error("Failed to Find Airports!");
      }

      // Retorna a lista de Aeroportos encontrados
      return airports;
    }
  } catch {
    // Em caso de erro, exibe uma mensagem no console
    console.error("Failed to Find Airports!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  } finally {
    // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
    await prismaClient.$disconnect();
  }
}
