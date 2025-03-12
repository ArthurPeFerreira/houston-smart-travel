import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache após a deleção
import { LocalType } from "./types"; // Importa o tipo LocalType para tipagem

// Função para deletar um Local do banco de dados com base no ID
export async function deleteLocal(LocalId: number): Promise<LocalType | undefined> {
    try {
        // Deleta o Local do banco de dados usando o Prisma
        const local = await prismaClient.locals.delete({
            where: {
                id: LocalId // Filtra o Local a ser deletado pelo ID
            },
            select: {
                id: true,
                city: true,
                image: true,
                active: true,
                airport: true,
            }
        });

        // Atualiza o Cache dos Locals para refletir a remoção
        await updateLocalCache();

        // Retorna o Local deletado para referência
        return local;
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Delete Local!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}