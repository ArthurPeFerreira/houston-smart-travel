// Importa função que recupera aeroportos utilizando cache
import { getAirportByCache } from "@/lib/airport/cacheAirport";

// Importa função que recupera rotas utilizando cache
import { getRouteByCache } from "@/lib/route/cacheRoute";

// Importa objetos do Next.js para manipulação de requisições e respostas HTTP
import { NextRequest, NextResponse } from "next/server";

// Função que lida com requisições GET
// Objetivo: retornar aeroportos que **não estão conectados** ao aeroporto especificado via ID na URL
export async function GET(
  req: NextRequest, // Representa a requisição HTTP recebida
  { params }: { params: Promise<{ airportId: string }> } // Parâmetros da URL contendo o ID do aeroporto
) {
  try {
    // Extrai o airportId dos parâmetros após resolução da Promise
    const { airportId } = await params;

    // Converte o ID recebido como string para número
    const airportIdNumber = Number(airportId);

    // Validação: verifica se o ID é numérico e maior que zero
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Airports!" },
        { status: 400 }
      );
    }

    // Recupera todas as rotas disponíveis do cache
    const routes = await getRouteByCache(0);

    // Recupera todos os aeroportos disponíveis do cache
    const airports = await getAirportByCache(0);

    // Validação: verifica se as rotas ou aeroportos foram recuperados com sucesso
    if (!routes || !airports) {
      return NextResponse.json(
        { error: "Failed to Find Airports!" },
        { status: 400 }
      );
    }

    // Filtra só as rotas ativas que incluam o airportId
    const activeRoutes = routes.filter(
      (route) =>
        route.active && route.airports.some((a) => a.id === airportIdNumber)
    );

    // Monta o set de IDs dos aeroportos conectados
    const connectedAirportIds = new Set<number>();
    for (const route of activeRoutes) {
      for (const a of route.airports) {
        if (a.id !== airportIdNumber) {
          connectedAirportIds.add(a.id);
        }
      }
    }

    // Filtra os aeroportos para incluir só os conectados
    const connectedAirports = airports.filter((a) =>
      connectedAirportIds.has(a.id)
    );

    return NextResponse.json(connectedAirports);
  } catch {
    // Captura qualquer erro inesperado e retorna status 500 com mensagem de erro
    return NextResponse.json(
      { error: "Failed to Find Routes!" },
      { status: 500 }
    );
  }
}
