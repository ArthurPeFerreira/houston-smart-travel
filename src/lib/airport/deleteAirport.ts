import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateAirportCache } from "./cacheAirport"; // Importa a função para atualizar o cache após a deleção
import { AirportType } from "./types"; // Importa o tipo AirportType para tipagem

// Função para deletar um Aeroporto do banco de dados com base no ID
export async function deleteAirport(airportId: number): Promise<AirportType | undefined> {
    try {
        // Deleta o Aeroporto do banco de dados usando o Prisma
        const Airport = await prismaClient.airports.delete({
            where: {
                id: airportId // Filtra o Aeroporto a ser deletado pelo ID
            }
        });

        // Atualiza o Cache dos Aeroportos para refletir a remoção
        await updateAirportCache();

        // Retorna o Aeroporto deletado para referência
        return Airport;
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Delete Airport!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}