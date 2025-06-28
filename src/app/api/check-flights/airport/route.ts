// Importa a função que busca todos os aeroportos no cache
import { getAirportByCache } from "@/lib/airport/cacheAirport";

// Importa a função que busca todas as rotas no cache
import { getRouteByCache } from "@/lib/route/cacheRoute";

// Importa utilitário para construção de respostas HTTP na API do Next.js
import { NextResponse } from "next/server";

// Função responsável por lidar com requisições HTTP GET
// Objetivo: retornar apenas os aeroportos que estão presentes em alguma rota
export async function GET() {
  try {
    // Recupera todas as rotas do cache utilizando o argumento 0
    const routes = await getRouteByCache(0);

    // Recupera todos os aeroportos do cache utilizando o argumento 0
    const airports = await getAirportByCache(0);

    // Verificação de integridade: caso não existam rotas ou aeroportos, retorna erro 400
    if (!routes || !airports) {
      return NextResponse.json(
        { error: "Failed to Find Airports!" },
        { status: 400 }
      );
    }

    // Filtra apenas as rotas ativas
    const activeRoutes = routes.filter(route => route.active);

    // Cria um conjunto para armazenar os IDs de aeroportos que aparecem em pelo menos uma rota
    const airportIdsWithRoutes = new Set<number>();
    activeRoutes.forEach((route) => {
      // Adiciona o ID do primeiro aeroporto da rota ao conjunto
      airportIdsWithRoutes.add(route.airports[0].id);

      // Adiciona o ID do segundo aeroporto da rota ao conjunto
      airportIdsWithRoutes.add(route.airports[1].id);
    });

    // Filtra os aeroportos que estão presentes no conjunto de aeroportos utilizados em rotas
    const filteredAirports = airports.filter((airport) =>
      airportIdsWithRoutes.has(airport.id)
    );

    // Retorna os aeroportos filtrados em formato JSON com status 200 (OK)
    return NextResponse.json(filteredAirports);
  } catch {
    // Captura erros inesperados e retorna erro 500 (Internal Server Error)
    return NextResponse.json(
      { error: "Failed to Find Airports!" },
      { status: 500 }
    );
  }
}
