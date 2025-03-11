// Importa a biblioteca ioredis para gerenciamento de conexões com o Redis
import { Redis } from "ioredis";

// Configuração de conexão com o Redis
export const redis = new Redis({
  host: `${process.env.REDIS_IP}`, // Define o host do Redis a partir da variável de ambiente
  port: Number(process.env.REDIS_PORT), // Define a porta do Redis convertendo a variável de ambiente para número
  maxRetriesPerRequest: null, // Desabilita o limite de tentativas para solicitações
});

// Listener para o evento de conexão bem-sucedida ao Redis
redis.on("connect", async () => {
  // Pode ser usado para registrar mensagens de sucesso ou monitorar conexões (atualmente vazio)
});

// Listener para o evento de erro durante a conexão ao Redis
redis.on("error", (err) => {
  // Loga a mensagem de erro no console
  console.error("Erro ao conectar ao Redis:", err);
});