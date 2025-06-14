// Importações necessárias do Next.js e bibliotecas internas
import { NextRequest, NextResponse } from "next/server";
import { queueHst } from "@/lib/bullmq/bullmq"; // Fila de tarefas BullMQ
import { getRouteByCache } from "@/lib/route/cacheRoute"; // Função para buscar rotas do cache
import { addYears, format } from "date-fns"; // Utilitários de data
import { UpdateSeatsAvailabilityType } from "@/lib/route/types"; // Tipagem da tarefa

// Handler para o método HTTP PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ routeId: string }> } // Parâmetros da rota
) {
  try {
    // Extrai o parâmetro "routeId" e converte para número
    const { routeId } = await params;
    const routeIdNumber = Number(routeId);

    // Valida se o ID é um número válido (maior que 0)
    if (!routeIdNumber || routeIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Route." }, // Retorna erro se inválido
        { status: 400 }
      );
    }

    // Busca a(s) rota(s) correspondente(s) no cache com base no ID
    const routes = await getRouteByCache(routeIdNumber);

    // Verifica se encontrou exatamente uma rota
    if (!routes || routes.length > 1) {
      return NextResponse.json(
        { error: "Failed to Find Route." }, // Retorna erro se nenhuma ou mais de uma encontrada
        { status: 400 }
      );
    }

    // Seleciona a rota retornada
    const route = routes[0];

    // Verifica se a rota está ativa
    if (!route.active) {
      return NextResponse.json(
        { error: "The route that you want to update isn't active." }, // Retorna erro se estiver inativa
        { status: 400 }
      );
    }

    // Define o intervalo de busca: de hoje até um ano no futuro
    const dateToday = new Date();
    const date1Year = addYears(dateToday, 1);

    // Formata as datas no formato ISO (yyyy-MM-dd)
    const dateTodayStr = format(dateToday, "yyyy-MM-dd");
    const date1YearStr = format(date1Year, "yyyy-MM-dd");

    // Prepara o payload da tarefa
    const data: UpdateSeatsAvailabilityType = {
      route: route,
      startDate: dateTodayStr,
      endDate: date1YearStr,
    };

    // Adiciona a tarefa na fila BullMQ com configurações específicas
    await queueHst.add(
      "updateSeatAvailability", // Nome da tarefa
      data,
      {
        priority: 0, // Prioridade alta
        delay: 0, // Sem atraso
        attempts: 3, // Até 3 tentativas em caso de erro
        removeOnComplete: true, // Remove após sucesso
        removeOnFail: false, // Mantém na fila em caso de falha
        stackTraceLimit: 5, // Limita o rastreamento de erros
      }
    );

    // Retorna sucesso com status 202 (Accepted)
    return NextResponse.json(
      { message: "Seats availability task scheduled for this route." },
      { status: 202 }
    );
  } catch (error) {
    // Captura e loga erros inesperados
    console.error("Failed to schedule seat task:", error);
    return NextResponse.json(
      { error: "Could not schedule seats availability task for this route.." },
      { status: 500 } // Erro interno do servidor
    );
  }
}
