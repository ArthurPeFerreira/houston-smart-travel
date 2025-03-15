import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateAirportCache } from "./cacheAirport"; // Importa a função para atualizar o cache após a criação
import { AirportType, CreateAndEditAirportType } from "./types"; // Importa os tipos AirportType e CreateAirportType para tipagem segura

// Função para criar um novo Aeroporto no banco de dados
export async function createAirport(airportInfo: CreateAndEditAirportType): Promise<AirportType | undefined> {
    try { 
        // Cria um novo Aeroporto no banco de dados usando o Prisma
        const airport = await prismaClient.airports.create({
            data: {
                city: airportInfo.city, // Define o nome da cidade do aeroporto
                airportCode: airportInfo.airportCode, // Define o código do aeroporto
            }
        });

        // Atualiza o Cache dos Aeroportos para refletir a nova adição
        await updateAirportCache();

        // Retorna o Aeroporto criado
        return airport;
    } catch {
        // Em caso de erro, exibe uma mensagem de erro no console
        console.error("Failed to Create Airport!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}
