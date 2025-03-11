import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateUserCache } from "./cacheUser";
import { UserType } from "./types"; // Importa o tipo UserType para tipagem

// Função para deletar um usuário do banco de dados com base no ID
export async function deleteUser(userId: number): Promise<UserType | undefined> {
    try {
        // Deleta o usuário do banco de dados usando o Prisma
        const user = await prismaClient.users.delete({
            where: {
                id: userId // Filtra o usuário a ser deletado pelo ID
            }
        });

        // Atualiza o Cache dos Usuários
        await updateUserCache();

        // Retorna o usuário deletado
        return user;
    } catch {
        // Em caso de erro, loga uma mensagem no console
        console.error("Failed to Delete User!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}