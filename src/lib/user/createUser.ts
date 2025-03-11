import { prismaClient } from "../prisma/prisma"; // Importa o cliente do Prisma para interagir com o banco de dados
import { updateUserCache } from "./cacheUser";
import { hashPassword } from "./password"; // Importa a função hashPassword para criptografar a senha
import { CreateUserType, UserType } from "./types"; // Importa os tipos CreateUserType e UserType para tipagem

// Função para criar um novo usuário no banco de dados
export async function createUser(userInfo: CreateUserType): Promise<UserType | undefined> {
    try {
        // Criptografa a senha fornecida usando a função hashPassword
        const hashedPassword = await hashPassword(userInfo.password);

        // Cria um novo usuário no banco de dados usando o Prisma
        const user = await prismaClient.users.create({
            data: {
                user: userInfo.user, // Define o nome de usuário
                password: hashedPassword, // Define a senha criptografada
                name: userInfo.name // Define o nome do usuário
            }
        });

        // Atualiza o Cache dos Usuários
        await updateUserCache();

        // Retorna o usuário criado
        return user;
    } catch {
        // Em caso de erro, loga uma mensagem no console
        console.error("Failed to Create User!");
        return undefined; // Retorna undefined para indicar que a operação falhou
    } finally {
        // Desconecta o cliente do Prisma após a operação, independentemente de sucesso ou falha
        await prismaClient.$disconnect();
    }
}