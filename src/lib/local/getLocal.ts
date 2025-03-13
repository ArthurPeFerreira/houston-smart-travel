import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { LocalType } from "./types"; // Importa o tipo LocalType para garantir a tipagem segura

// Função assíncrona para buscar um Local específico ou todos os Locais no banco de dados
export async function getLocal(localId: number): Promise<LocalType[] | undefined> {
    try {
        // Verifica se um ID específico foi fornecido (maior que 0)
        if (localId > 0) {
            // Busca um Local específico no banco de dados usando o Prisma
            const local = await prismaClient.locals.findUnique({
                where: {
                    id: localId // Filtra pelo ID do Local
                },
                select: {
                    id: true, // Retorna o ID do Local
                    city: true, // Retorna o nome da cidade
                    image: true, // Retorna a URL da imagem
                    active: true, // Retorna o status ativo/inativo do Local
                    airport: true, // Retorna as informações do aeroporto associado
                }
            });

            // Se o Local não for encontrado, retorna undefined
            if (!local) {
                console.error("Local not found!");
                return undefined;
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
                    id: true, // Retorna o ID do Local
                    city: true, // Retorna o nome da cidade
                    image: true, // Retorna a URL da imagem
                    active: true, // Retorna o status ativo/inativo do Local
                    airport: true, // Retorna as informações do aeroporto associado
                }
            });

            // Retorna a lista de Locais encontrados
            return locais;
        }
    } catch (error) {
        // Em caso de erro, exibe uma mensagem no console com detalhes
        console.error("Failed to Find Locals!", error);
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Garante que a conexão com o Prisma seja encerrada após a operação
        await prismaClient.$disconnect();
    }
}
