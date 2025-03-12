import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { LocalType } from "./types"; // Importa o tipo LocalType para tipagem segura

// Função para buscar um Local ou todos os locais no banco de dados
export async function getLocal(localId: number): Promise<LocalType[] | undefined> {
    try {
        // Verifica se o localId é maior que 0 (ou seja, se um ID específico foi fornecido)
        if (localId > 0) {
            // Busca um Local específico no banco de dados usando o Prisma
            const local = await prismaClient.locals.findUnique({
                where: {
                    id: localId // Filtra pelo ID do Local
                },
                select: {
                    id: true,
                    city: true,
                    image: true,
                    active: true,
                    airport: true,
                }
            });

            // Se o Local não for encontrado, lança um erro
            if (!local) {
                throw new Error("Failed to Find Local!");
            }

            // Retorna o Local encontrado dentro de um array
            return [local];
        } else {
            // Se o localId não for válido (<= 0), busca todos os locais no banco de dados
            const locais = await prismaClient.locals.findMany({
                orderBy: {
                    id: "asc" // Ordena os locais pelo ID em ordem crescente
                },
                select: {
                    id: true,
                    city: true,
                    image: true,
                    active: true,
                    airport: true,
                }
            });

            // Se nenhum Local for encontrado, lança um erro
            if (!locais) {
                throw new Error("Failed to Find locais!");
            }

            // Retorna a lista de locais encontrados
            return locais;
        }
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Find locais!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}