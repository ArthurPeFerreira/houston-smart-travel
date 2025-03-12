import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache após a criação
import { CreateLocalType, LocalType } from "./types"; // Importa os tipos LocalType e CreateLocalType para tipagem segura

// Função para criar um novo Local no banco de dados
export async function createLocal(localInfo: CreateLocalType): Promise<LocalType | undefined> {
    try { 
        // Cria um novo Local no banco de dados usando o Prisma
        const local = await prismaClient.locals.create({
            data: {
                city: localInfo.city, // Define o nome da cidade do Local
                image: localInfo.image, // Define o caminho da imagem do Local
                airportId: localInfo.airportId // Define o id do aeroporto vinculado ao Local
            },
            select: {
                id: true,
                city: true,
                image: true,
                active: true,
                airport: true,
            }
        });

        // Atualiza o Cache dos Locais para refletir a nova adição
        await updateLocalCache();

        // Retorna o Local criado
        return local;
    } catch {
        // Em caso de erro, exibe uma mensagem de erro no console
        console.error("Failed to Create Local!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}
