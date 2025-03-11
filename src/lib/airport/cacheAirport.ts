import { redis } from "../redis/redis"; // Importa o cliente Redis para manipulação de cache
import { getAirport } from "./getAirport"; // Importa a função getAirport para buscar aeroportos no banco de dados
import { AirportType } from "./types"; // Importa o tipo AirportType para tipagem segura dos aeroportos

// Define a chave usada para armazenar os dados dos aeroportos no Redis
const cacheKey: string = `hst:airports`;

// Função para atualizar o cache de aeroportos no Redis
export async function updateAirportCache(): Promise<AirportType[] | undefined> {
  try {
    // Busca todos os aeroportos no banco de dados (AirportId = 0 retorna todos os aeroportos)
    const airports = await getAirport(0);

    // Armazena os aeroportos no Redis, convertendo o array de aeroportos para uma string JSON
    await redis.set(cacheKey, JSON.stringify(airports));

    // Retorna os aeroportos buscados
    return airports;
  } catch (error) {
    // Em caso de erro ao atualizar o cache, exibe uma mensagem de erro no console
    console.error("Failed to Update Airports Cache!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}

// Função para buscar um aeroporto ou todos os aeroportos no cache do Redis
export async function getAirportByCache(AirportId: number): Promise<AirportType[] | undefined> {
  try {
    // Busca os dados dos aeroportos armazenados no Redis
    const airportsData = await redis.get(cacheKey);

    // Converte os dados do Redis (string JSON) de volta para um array de aeroportos, se existirem
    let airports: AirportType[] | undefined = airportsData
      ? JSON.parse(airportsData) // Se existir dados no cache, faz o parsing para um array
      : undefined; // Caso contrário, define como undefined

    // Se não houver dados no cache, atualiza o cache buscando os aeroportos no banco de dados
    if (!airports) {
      airports = await updateAirportCache();
    }

    // Se ainda não houver aeroportos disponíveis, lança um erro
    if (!airports) {
        throw new Error("Failed to Find Airports!");
    }

    // Verifica se o AirportId fornecido é maior que 0 (ou seja, um ID específico foi solicitado)
    if (AirportId > 0) {
      // Busca o aeroporto específico no array de aeroportos
      const Airport = airports.find((Airport) => {
        return Airport.id == AirportId; // Compara o ID do aeroporto com o ID fornecido
      });

      // Se o aeroporto não for encontrado, lança um erro
      if (!Airport) {
        throw new Error("Failed to Find Airports!");
      }

      // Retorna o aeroporto encontrado dentro de um array
      return [Airport];
    } else {
      // Se o AirportId for inválido (<= 0), retorna todos os aeroportos disponíveis
      return airports;
    }
  } catch (error) {
    // Em caso de erro ao buscar os aeroportos, exibe uma mensagem de erro no console
    console.error("Failed to Find Airports!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}
