import { promises as fs } from "fs"; // Importa fs.promises para operações assíncronas
import path from "path"; // Importa path para manipulação de diretórios e caminhos
import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateAirportCache } from "./cacheAirport"; // Importa a função para atualizar o cache após a deleção
import { AirportType } from "./types"; // Importa o tipo AirportType para tipagem
import { updateLocalCache } from "../local/cacheLocal";
import { updateRouteCache } from "../route/cacheRoute";

// Função para deletar um Aeroporto do banco de dados com base no ID
export async function deleteAirport(airportId: number): Promise<AirportType | undefined> {
    try {
        // Deleta o Aeroporto do banco de dados usando o Prisma
        const airport = await prismaClient.airports.delete({
            where: {
                id: airportId // Filtra o Aeroporto a ser deletado pelo ID
            },include: {
                local:true
            }
        });

        // Atualiza o Cache dos Aeroportos para refletir a remoção
        await updateAirportCache();

        // Atualiza o Cache dos Aeroportos para refletir a remoção
        await updateLocalCache();

        // Atualiza o Cache das Rotas para refletir a remoção
        await updateRouteCache();

        if(airport.local){
            // Define o caminho do arquivo de imagem a ser deletado
            const imagePath = path.join(process.cwd(), "public/locals/images", `${airport.id}.jpg`);
            await fs.unlink(imagePath); 
        } 

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