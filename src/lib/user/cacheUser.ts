import { redis } from "../redis/redis"; // Importa o cliente Redis para manipulação de cache
import { getUser } from "./getUser"; // Importa a função getUser para buscar usuários no banco de dados
import { UserType } from "./types"; // Importa o tipo UserType para tipagem

// Define a chave usada para armazenar os dados dos usuários no Redis
const cacheKey: string = `hst:users`;

// Função para atualizar o cache de usuários no Redis
export async function updateUserCache(): Promise<UserType[] | undefined> {
  try {
    // Busca todos os usuários no banco de dados (userId = 0 retorna todos os usuários)
    const users = await getUser(0);

    // Armazena os usuários no Redis, convertendo o array de usuários para uma string JSON
    await redis.set(cacheKey, JSON.stringify(users));

    // Retorna os usuários buscados
    return users;
  } catch (error) {
    // Em caso de erro, loga uma mensagem de erro no console
    console.error("Failed to Update User Cache!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}

// Função para buscar um usuário ou todos os usuários no cache do Redis
export async function getUserByCache(userId: number): Promise<UserType[] | undefined> {
  try {
    // Busca os dados dos usuários armazenados no Redis
    const usersData = await redis.get(cacheKey);

    // Converte os dados do Redis (string JSON) de volta para um array de usuários, se existirem
    let users: UserType[] | undefined = usersData
      ? JSON.parse(usersData)
      : undefined;

    // Se não houver dados no cache, atualiza o cache buscando os usuários no banco de dados
    if (!users) {
      users = await updateUserCache();
    }

    // Se ainda não houver usuários, lança um erro
    if (!users) {
        throw new Error("Failed to Find Users!");
    }

    // Verifica se o userId é maior que 0 (ou seja, se é um ID válido)
    if (userId > 0) {
      // Busca o usuário específico no array de usuários
      const user = users.find((user) => {
        return user.id == userId; // Compara o ID do usuário com o ID fornecido
      });

      // Se o usuário não for encontrado, lança um erro
      if (!user) {
        throw new Error("Failed to Find Users!");
      }

      // Retorna o usuário encontrado dentro de um array
      return [user];
    } else {
      // Se o userId não for válido (<= 0), retorna todos os usuários
      return users;
    }
  } catch (error) {
    // Em caso de erro, loga uma mensagem de erro no console
    console.error("Failed to Find Users!");
    return undefined; // Retorna undefined para indicar que a operação falhou
  }
}