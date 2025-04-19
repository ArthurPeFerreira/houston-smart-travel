import { updateLocalCache } from "../local/cacheLocal";
import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateRouteCache } from "../route/cacheRoute";
import { updateAirportCache } from "./cacheAirport"; // Importa a função para atualizar o cache de aeroportos
import { AirportType } from "./types"; // Importa o tipo AirportType para garantir a tipagem correta

// Função assíncrona para editar as informações de um Aeroporto no banco de dados
export async function editAirport(airportInfo: AirportType): Promise<AirportType | undefined> {
    try {
        // Atualiza as informações do Aeroporto no banco de dados usando o Prisma
        const airportEdited = await prismaClient.airports.update({
            where: {
                id: airportInfo.id // Localiza o Aeroporto pelo ID fornecido
            },
            data: {
                city: airportInfo.city, // Atualiza o nome da cidade do aeroporto
                airportCode: airportInfo.airportCode, // Atualiza o código do aeroporto
            }
        });

        // Atualiza o Cache dos Aeroportos para refletir as mudanças recentes
        await updateAirportCache();

        // Atualiza o cache dos Locais
        await updateLocalCache();

        // Atualiza o Cache das Rotas para refletir a remoção
        await updateRouteCache();

        // Retorna o Aeroporto atualizado com as novas informações
        return airportEdited;
    } catch {
        // Em caso de erro, exibe uma mensagem de erro no console
        console.error("Failed to Edit Airport!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, garantindo que a conexão seja encerrada
        await prismaClient.$disconnect();
    }
}
