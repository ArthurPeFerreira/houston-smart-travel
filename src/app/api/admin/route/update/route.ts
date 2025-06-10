import { NextResponse } from "next/server";
import { queueHst } from "@/lib/bullmq/bullmq";

export async function PUT() {
  try {
    // Adiciona a tarefa na fila
    await queueHst.add(
      "getSeatsAvailability", // Nome da tarefa
      {
        priority: 0, // Define a prioridade da tarefa (0 para alta prioridade)
        delay: 0, // Define o atraso (0 segundos)
        attempts: 3, // Número de tentativas permitidas em caso de falha
        removeOnComplete: true, // Remove a tarefa da fila automaticamente após a conclusão bem-sucedida
        removeOnFail: false, // Mantém a tarefa na fila em caso de falha
        stackTraceLimit: 5, // Limita o número de rastros de pilha mantidos para erros
      }
    );

    // Retorna resposta 202 (Accepted) informando sucesso
    return NextResponse.json(
      { message: "Seats availability task scheduled." },
      { status: 202 }
    );
  } catch (error) {
    console.error("Failed to schedule seats task:", error);
    return NextResponse.json(
      { error: "Could not schedule seats availability task." },
      { status: 500 }
    );
  }
}
