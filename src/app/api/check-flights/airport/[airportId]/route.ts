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

    // Filtra rotas que contenham o aeroporto especificado pelo ID
    const filteredRoutes = routes.filter((route) => {
      // Ignora rotas cujo primeiro aeroporto tem ID maior que o buscado (regra de negócio específica)
      if (route.airports[0].id > airportIdNumber) {
        return false;
      }

      // Mantém a rota se algum dos aeroportos nela tiver o mesmo ID do buscado
      return route.airports.some((airport) => airport.id === airportIdNumber);
    });

    // Cria um conjunto para armazenar os IDs dos aeroportos conectados ao aeroporto informado
    const connectedAirportIds = new Set<number>();

    // Adiciona ao conjunto todos os aeroportos das rotas filtradas
    for (const route of filteredRoutes) {
      route.airports.forEach((airport) => {
        connectedAirportIds.add(airport.id);
      });
    }

    // Remove do conjunto o próprio aeroporto informado (não deve ser incluído na resposta)
    connectedAirportIds.delete(airportIdNumber);

    // Filtra os aeroportos que não estão conectados ao aeroporto informado
    const notConnectedAirports = airports.filter(
      (airport) => (connectedAirportIds.has(airport.id) && airport.id !== airportIdNumber)
    );

    // Retorna a lista de aeroportos não conectados em formato JSON
    return NextResponse.json(notConnectedAirports);
  } catch {
    // Captura qualquer erro inesperado e retorna status 500 com mensagem de erro
    return NextResponse.json(
      { error: "Failed to Find Routes!" },
      { status: 500 }
    );
  }
}
