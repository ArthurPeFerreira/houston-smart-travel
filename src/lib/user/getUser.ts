import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { UserType } from "./types"; // Importa o tipo UserType para tipagem

// Função para buscar um usuário ou todos os usuários no banco de dados
export async function getUser(userId: number): Promise<UserType[] | undefined> {
    try {
        // Verifica se o userId é maior que 0 (ou seja, se é um ID válido)
        if (userId > 0) {
            // Busca um usuário específico no banco de dados usando o Prisma
            const user = await prismaClient.users.findUnique({
                where: {
                    id: userId // Filtra pelo ID do usuário
                }
            });

            // Se o usuário não for encontrado, lança um erro
            if (!user) {
                throw new Error("Failed to Find User!");
            }

            // Retorna o usuário encontrado dentro de um array
            return [user];
        } else {
            // Se o userId não for válido (<= 0), busca todos os usuários no banco de dados
            const user = await prismaClient.users.findMany({
                orderBy: {
                    id: "asc" // Ordena os usuários pelo ID em ordem crescente
                }
            });

            // Se nenhum usuário for encontrado, lança um erro
            if (!user) {
                throw new Error("Failed to Find Users!");
            }

            // Retorna a lista de usuários encontrados
            return user;
        }
    } catch {
        // Em caso de erro, loga uma mensagem no console
        console.error("Failed to Find Users!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}