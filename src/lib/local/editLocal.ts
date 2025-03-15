import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateLocalCache } from "./cacheLocal"; // Importa a função para atualizar o cache de Locais
import { EditLocalType, LocalType } from "./types"; // Importa os tipos EditLocalType e LocalType para tipagem segura

// Função assíncrona para editar as informações de um Local no banco de dados
export async function editLocal(localInfo: EditLocalType): Promise<LocalType | undefined> {
    try {
        // Atualiza as informações do Local no banco de dados usando o Prisma
        let localEdited = await prismaClient.locals.update({
            where: {
                airportId: localInfo.airportId // Localiza o Local pelo ID fornecido
            },
            data: {
                city: localInfo.city, // Atualiza o nome da cidade do Local
                image: localInfo.image, // Atualiza a URL da imagem do Local
                active: localInfo.active, // Atualiza o status ativo/inativo do Local
                airportId: localInfo.airportId, // Atualiza o ID do aeroporto associado ao Local
            },
            select: {
                id: true, // Seleciona o ID do Local atualizado
                city: true, // Seleciona o nome da cidade
                image: true, // Seleciona a URL da imagem
                active: true, // Seleciona o status ativo/inativo
                airport: true, // Seleciona as informações do aeroporto associado
            }
        });

        // Atualiza o Cache dos Locais para refletir as mudanças recentes
        await updateLocalCache();

        // Retorna o Local atualizado com as novas informações
        return localEdited;
    } catch {
        // Em caso de erro, exibe uma mensagem de erro no console
        console.error("Failed to Edit Local!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, garantindo que a conexão seja encerrada
        await prismaClient.$disconnect();
    }
}
