import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache após a deleção
import { LocalType } from "./types"; // Importa o tipo LocalType para garantir tipagem segura

// Função assíncrona para deletar um Local do banco de dados com base no ID fornecido
export async function deleteLocal(LocalId: number): Promise<LocalType | undefined> {
    try {
        // Deleta o Local do banco de dados com base no ID fornecido
        const local = await prismaClient.locals.delete({
            where: {
                id: LocalId // Filtra o Local a ser removido pelo ID
            },
            select: {
                id: true, // Retorna o ID do Local deletado
                city: true, // Retorna o nome da cidade do Local deletado
                image: true, // Retorna a URL da imagem do Local deletado
                active: true, // Retorna o status ativo/inativo do Local deletado
                airport: true, // Retorna os detalhes do aeroporto associado ao Local deletado
            }
        });

        // Atualiza o cache dos Locais para refletir a remoção
        await updateLocalCache();

        // Retorna o Local deletado para referência
        return local;
    } catch {
        // Em caso de erro (exemplo: LocalId não encontrado), exibe uma mensagem de erro no console
        console.error("Failed to Delete Local!");
        return undefined; // Retorna undefined para indicar falha na operação
    } finally {
        // Garante que o cliente do Prisma seja desconectado após a execução da função
        await prismaClient.$disconnect();
    }
}
