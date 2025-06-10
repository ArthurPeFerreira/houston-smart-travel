import { Queue, QueueEvents, Worker } from "bullmq";
import { redis } from "@/lib/redis/redis";
import { getTask } from "./tasks";


// Nome da fila que será configurada
const queueName = "hst";

// Configuração da fila "Hst" utilizando BullMQ
export const queueHst = new Queue(queueName, {
  connection: redis, // Conexão configurada para utilizar o Redis
});

// Configuração de eventos da fila "Hst" para monitorar atividades, como falhas ou conclusão
export const queueEvents = new QueueEvents(queueName);

// Configuração do worker para processar as tarefas adicionadas à fila
export const worker = new Worker(
  queueName, // Nome da fila que o worker vai processar
  async (job) => {
    // Obtém a função da tarefa correspondente utilizando o nome do job
    const task = getTask(job.name);

    if (task) {
      try {
        console.log(`Processando job ${job.id}: ${job.name}`);
        // Executa a tarefa passando os dados associados ao job
        return await task(job.data);
      } catch (error) {
        // Registra erros caso a execução da tarefa falhe
        console.error(`Erro ao processar a tarefa ${job.name}: ${error}`);
      }
    } else {
      // Caso a tarefa não esteja registrada, exibe um aviso
      console.warn(`Tarefa ${job.name} não encontrada no taskRegistry.`);
    }
  },
  {
    connection: redis, // Conexão com Redis
    concurrency: 10, // Limita a quantidade de tarefas processadas simultaneamente
  }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
// Função para adicionar uma tarefa repetitiva à fila
export async function addRepeatingTaskCron(
  taskName: string, // Nome da tarefa a ser adicionada]
  data: any, // Dados associados à tarefa
  cron: string // Intervalo de repetição da tarefa em milissegundos
) {
  try {
    await queueHst.add(taskName, data, {
      priority: 0, // Define a prioridade da tarefa (0 = padrão)
      delay: 0, // Não adiciona atraso inicial antes da execução
      attempts: 3, // Limita o número de tentativas em caso de falha
      backoff: { type: "exponential", delay: 2000 }, // Configura backoff exponencial para tentativas
      removeOnComplete: true, // Remove a tarefa após execução bem-sucedida
      removeOnFail: false, // Mantém a tarefa em caso de falha para análise posterior
      repeat: {
        pattern: cron, // Configura o intervalo de repetição no padrão Cron
      },
      stackTraceLimit: 5, // Limita o armazenamento de rastros de pilha a 5 níveis
    });
  } catch (error) {
    // Registra erros caso a adição da tarefa à fila falhe
    console.error(
      `Erro ao adicionar a tarefa ${taskName} repetitiva à fila: ${error}`
    );
  }
}