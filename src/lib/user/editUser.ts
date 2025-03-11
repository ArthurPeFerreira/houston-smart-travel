import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateUserCache } from "./cacheUser"; // Importa a função para atualizar o cache dos usuários
import { hashPassword } from "./password"; // Importa a função hashPassword para criptografar a senha do usuário
import { EditUserType, UserType } from "./types"; // Importa os tipos EditUserType e UserType para garantir tipagem segura

// Função assíncrona para editar as informações de um usuário no banco de dados
export async function editUser(userInfo: EditUserType): Promise<UserType | undefined> {
    try {
        // Atualiza as informações do usuário no banco de dados usando o Prisma
        let userEdited = await prismaClient.users.update({
            where: {
                user: userInfo.user // Localiza o usuário pelo nome de usuário fornecido
            },
            data: {
                user: userInfo.user, // Atualiza o nome de usuário (pode ser mantido ou alterado)
                name: userInfo.name, // Atualiza o nome real do usuário
                active: userInfo.active, // Atualiza o status ativo/inativo do usuário
                updatedAt: new Date() // Define a data/hora da última atualização
            }
        });

        // Se um novo password for fornecido, ele será atualizado separadamente
        if (userInfo.password) {
            // Criptografa a senha fornecida usando a função hashPassword
            const hashedPassword = await hashPassword(userInfo.password);

            // Atualiza a senha do usuário no banco de dados
            userEdited = await prismaClient.users.update({
                where: {
                    user: userEdited.user // Garante que o usuário atualizado seja o mesmo
                },
                data: {
                    password: hashedPassword, // Armazena a senha criptografada
                    updatedAt: new Date() // Atualiza novamente a data de modificação
                }
            });
        }

        // Atualiza o Cache dos Usuários para refletir as mudanças recentes
        await updateUserCache();

        // Retorna o usuário atualizado com as novas informações
        return userEdited;
    } catch {
        // Em caso de erro, exibe uma mensagem no console
        console.error("Failed to Edit User!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, garantindo que a conexão seja encerrada
        await prismaClient.$disconnect();
    }
}
