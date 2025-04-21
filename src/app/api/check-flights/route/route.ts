// Importa função responsável por buscar aeroportos a partir do cache
import { getAirportByCache } from "@/lib/airport/cacheAirport";

// Importa o tipo de dados representando um aeroporto
import { AirportType } from "@/lib/airport/types";

// Importa função para recuperar rotas do cache
import { getRouteByCache } from "@/lib/route/cacheRoute";

// Importa utilitários para manipulação de requisições e respostas HTTP no Next.js
import { NextRequest, NextResponse } from "next/server";

// Função GET que retorna uma rota específica com base em origem e destino informados via query params
export async function GET(req: NextRequest) {
  try {
    // Extrai os parâmetros de consulta da URL da requisição
    const { searchParams } = new URL(req.url);

    // Obtém o parâmetro 'origin' da URL e o converte para número, se presente
    const originParam = searchParams.get("origin");
    const origin = originParam ? parseInt(originParam) : undefined;

    // Inicializa variável para armazenar o resultado da consulta do aeroporto de origem
    let originAirportInfo: AirportType[] | undefined = undefined;

    // Busca os dados do aeroporto de origem no cache, se o ID for válido
    if (origin) {
      originAirportInfo = await getAirportByCache(origin);
    }

    // Validações: verifica se a origem é válida e se apenas um aeroporto foi retornado
    if (
      !origin ||
      !originAirportInfo ||
      originAirportInfo.length === 0 ||
      originAirportInfo.length > 1
    ) {
      return NextResponse.json(
        { error: "Failed to Find Origin Airport!" },
        { status: 400 }
      );
    }

    // Obtém o objeto do aeroporto de origem
    const originAirport = originAirportInfo[0];

    // Obtém o parâmetro 'destination' da URL e o converte para número, se presente
    const destinationParam = searchParams.get("destination");
    const destination = destinationParam
      ? parseInt(destinationParam)
      : undefined;

    // Inicializa variável para armazenar o resultado da consulta do aeroporto de destino
    let destinationAirportInfo: AirportType[] | undefined = undefined;

    // Busca os dados do aeroporto de destino no cache, se o ID for válido
    if (destination) {
      destinationAirportInfo = await getAirportByCache(destination);
    }

    // Validações: verifica se o destino é válido e se apenas um aeroporto foi retornado
    if (
      !destination ||
      !destinationAirportInfo ||
      destinationAirportInfo.length === 0 ||
      destinationAirportInfo.length > 1
    ) {
      return NextResponse.json(
        { error: "Failed to Find Destination Airport!" },
        { status: 400 }
      );
    }

    // Obtém o objeto do aeroporto de destino
    const destinationAirport = destinationAirportInfo[0];

    // Recupera todas as rotas armazenadas no cache
    const routes = await getRouteByCache(0);

    // Valida se a lista de rotas foi retornada corretamente
    if (!routes) {
      return NextResponse.json(
        { error: "Failed to Find Route!" },
        { status: 400 }
      );
    }

    // Filtra a rota específica que conecta os aeroportos de origem e destino
    const filteredRoute = routes.find((route) => {
      // Garante a ordem correta dos aeroportos com base na menor ID primeiro (regra do sistema)
      if (originAirport.id < destinationAirport.id) {
        return (
          route.airports[0].id === originAirport.id &&
          route.airports[1].id === destinationAirport.id
        );
      } else {
        return (
          route.airports[1].id === originAirport.id &&
          route.airports[0].id === destinationAirport.id
        );
      }
    });

    // Se nenhuma rota correspondente for encontrada, retorna erro 400
    if (!filteredRoute) {
      return NextResponse.json(
        { error: "Failed to Find Route!" },
        { status: 400 }
      );
    }

    // Retorna a rota encontrada como resposta em formato JSON
    return NextResponse.json(filteredRoute);
  } catch {
    // Captura erros inesperados e retorna erro 500
    return NextResponse.json(
      { error: "Failed to Find Route!" },
      { status: 500 }
    );
  }
}
