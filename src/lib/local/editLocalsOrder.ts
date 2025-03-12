import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache de Locais
import { CreateLocalType, LocalType } from "./types"; // Importa os tipos para garantir a tipagem correta

// Função assíncrona para editar a ordem dos Locais no banco de dados
export async function editLocalsOrder(localInfo: LocalType[]): Promise<LocalType[] | undefined> {
    try {
        // Mapeia os objetos da lista de locais para o formato exigido ao criar registros no banco
        let newLocalOrder: CreateLocalType[] = localInfo.map((local) => {
            return ({
                city: local.city,       // Cidade do local
                image: local.image,     // URL da imagem do local
                airportId: local.airport.id // ID do aeroporto associado ao local
            });
        });

        // Remove todos os registros existentes na tabela 'locals'
        await prismaClient.locals.deleteMany();

        // Insere os novos registros de locais no banco de dados
        await prismaClient.locals.createMany({ data: newLocalOrder });

        // Atualiza o cache dos locais para refletir as novas alterações
        const newLocals = await updateLocalCache();

        // Retorna a lista de locais atualizada
        return newLocals;
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Edit Locals Order!");
        return undefined; // Retorna undefined para indicar falha na operação
    } finally {
        // Garante que o cliente do Prisma seja desconectado após a execução da função
        await prismaClient.$disconnect();
    }
}
