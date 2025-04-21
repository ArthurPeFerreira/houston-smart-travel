import { getAirportByCache } from "@/lib/airport/cacheAirport";
import { getRouteByCache } from "@/lib/route/cacheRoute";
import { NextRequest, NextResponse } from "next/server";

// Função handler para requisições HTTP do tipo GET
// Objetivo: retornar uma lista de aeroportos que **não estão conectados** ao aeroporto informado via ID
export async function GET(
  req: NextRequest, // Objeto representando a requisição HTTP
  { params }: { params: Promise<{ airportId: string }> } // Parâmetros da URL contendo o ID do aeroporto como string
) {
  try {
    // Aguarda e extrai o airportId dos parâmetros da rota
    const { airportId } = await params;

    // Converte o ID do aeroporto de string para número
    const airportIdNumber = Number(airportId);

    // Verifica se o ID convertido é válido (maior que zero)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Airports!" }, // Mensagem de erro de validação
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    // Busca todas as rotas no cache (parâmetro 0 utilizado para recuperar todas)
    const routes = await getRouteByCache(0);

    // Busca todos os aeroportos no cache (parâmetro 0 utilizado para recuperar todos)
    const airports = await getAirportByCache(0);

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (!routes || !airports) {
      return NextResponse.json(
        { error: "Failed to Find Airports!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    // Filtra as rotas que contenham o aeroporto buscado
    const filteredRoutes = routes.filter((route) => {
      // Se o primeiro aeroporto da rota tiver ID maior que o buscado, ignora a rota
      if (route.airports[0].id > airportIdNumber) {
        return false;
      }

      // Retorna true se algum aeroporto da rota tiver ID igual ao buscado
      return route.airports.some((airport) => airport.id === airportIdNumber);
    });

    // Conjunto para armazenar os IDs dos aeroportos conectados ao informado
    const connectedAirportIds = new Set<number>();

    // Percorre as rotas filtradas e adiciona todos os aeroportos dessas rotas no conjunto
    for (const route of filteredRoutes) {
      route.airports.forEach((airport) => {
        connectedAirportIds.add(airport.id);
      });
    }

    // Remove o próprio aeroporto buscado da lista de conexões
    connectedAirportIds.delete(airportIdNumber);

    // Filtra os aeroportos que NÃO estão conectados ao aeroporto informado
    const notConnectedAirports = airports.filter(
      (airport) => (!connectedAirportIds.has(airport.id) && airport.id !== airportIdNumber)
    );

    // Retorna a lista de aeroportos não conectados em formato JSON
    return NextResponse.json(notConnectedAirports);
  } catch {
    // Em caso de erro inesperado, retorna HTTP 500 - Internal Server Error
    return NextResponse.json(
      { error: "Failed to Find Routes!" }, // Mensagem de erro genérica
      { status: 500 } // HTTP 500 - Erro Interno
    );
  }
}
