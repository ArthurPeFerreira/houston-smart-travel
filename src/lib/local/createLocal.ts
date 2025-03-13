import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache após a criação
import { CreateLocalType, LocalType } from "./types"; // Importa os tipos LocalType e CreateLocalType para garantir tipagem segura

// Função assíncrona para criar um novo Local no banco de dados
export async function createLocal(localInfo: CreateLocalType): Promise<LocalType | undefined> {
    try { 
        // Cria um novo Local no banco de dados usando o Prisma
        const local = await prismaClient.locals.create({
            data: {
                city: localInfo.city, // Define o nome da cidade do Local
                image: localInfo.image, // Define a URL da imagem do Local
                airportId: localInfo.airportId // Define o ID do aeroporto associado ao Local
            },
            select: {
                id: true, // Seleciona o ID do Local recém-criado
                city: true, // Seleciona o nome da cidade
                image: true, // Seleciona a URL da imagem
                active: true, // Seleciona o status de ativação do Local
                airport: true, // Seleciona as informações do aeroporto associado
            }
        });

        // Atualiza o cache dos Locais para refletir a nova adição
        await updateLocalCache();

        // Retorna o Local recém-criado
        return local;
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Create Local!");
        return undefined; // Retorna undefined para indicar falha na operação
    } finally {
        // Garante que a conexão do Prisma seja fechada após a execução
        await prismaClient.$disconnect();
    }
}
