import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { getRouteByCache } from "@/lib/route/cacheRoute";
import { NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Aeroportos
export async function GET() {
  try {
    // Busca todas as rotas no cache (parâmetro 0 utilizado para recuperar todas)
    const routes = await getRouteByCache(0);

    // Busca todos os aeroportos no cache (parâmetro 0 utilizado para recuperar todos)
    const airports = await getAirportByCache(0);

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (!routes || !airports) {
      return NextResponse.json(
        { message: "Failed to Find Airports!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    // 🔍 Cria um Set com os IDs de todos os aeroportos usados em rotas
    const airportIdsWithRoutes = new Set<number>();
    routes.forEach((route) => {
      airportIdsWithRoutes.add(route.airports[0].id); // Adiciona o ID do primeiro aeroporto da rota
      airportIdsWithRoutes.add(route.airports[1].id); // Adiciona o ID do segundo aeroporto da rota
    });

    // ✂️ Filtra apenas aeroportos presentes em alguma rota
    const filteredAirports = airports.filter((airport) =>
      airportIdsWithRoutes.has(airport.id)
    );

    // Retorna a lista de Aeroportos encontrados
    return NextResponse.json(filteredAirports);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Airports!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
