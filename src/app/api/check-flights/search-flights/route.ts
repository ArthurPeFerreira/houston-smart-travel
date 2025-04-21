// Importa função para buscar aeroportos do cache
import { getAirportByCache } from "@/lib/airport/cacheAirport";

// Importa o tipo de dados referente a aeroportos
import { AirportType } from "@/lib/airport/types";

// Importa o cliente Prisma para consultas ao banco de dados
import { prismaClient } from "@/lib/prisma/prisma";

// Importa tipos e objeto com todas as cabines disponíveis
import { Cabin, cabins } from "@/lib/route/cabins";

// Importa função para buscar rotas do cache
import { getRouteByCache } from "@/lib/route/cacheRoute";

// Importa o tipo de dados referente a rotas
import { RouteType } from "@/lib/route/types";

// Importa objetos para manipulação de requisições e respostas HTTP no Next.js
import { NextRequest, NextResponse } from "next/server";

// Função GET para buscar disponibilidade de assentos em uma determinada rota, origem, destino e cabine
export async function GET(req: NextRequest) {
  try {
    // Extrai os parâmetros de consulta da URL recebida na requisição
    const { searchParams } = new URL(req.url);

    // Extrai e converte o parâmetro 'route' (ID da rota)
    const routeParam = searchParams.get("route");
    const routeId = routeParam ? parseInt(routeParam) : undefined;

    // Inicializa variável para armazenar o resultado da busca da rota
    let routeInfo: RouteType[] | undefined = undefined;

    // Caso o ID da rota exista, busca informações da rota no cache
    if (routeId) {
      routeInfo = await getRouteByCache(routeId);
    }

    // Valida se a rota foi corretamente localizada (deve existir e retornar um único resultado)
    if (
      !routeId ||
      !routeInfo ||
      routeInfo.length === 0 ||
      routeInfo.length > 1
    ) {
      return NextResponse.json(
        { error: "Failed to Find route Airport!" },
        { status: 400 }
      );
    }

    // Seleciona a rota encontrada
    const route = routeInfo[0];

    // Extrai e converte o parâmetro 'origin' (ID do aeroporto de origem)
    const originParam = searchParams.get("origin");
    const origin = originParam ? parseInt(originParam) : undefined;

    // Inicializa variável para armazenar o resultado da busca do aeroporto de origem
    let originAirportInfo: AirportType[] | undefined = undefined;

    // Caso o ID do aeroporto de origem exista, busca informações do aeroporto no cache
    if (origin) {
      originAirportInfo = await getAirportByCache(origin);
    }

    // Valida se o aeroporto de origem foi localizado corretamente (deve existir e retornar um único resultado)
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

    // Seleciona o aeroporto de origem
    const originAirport = originAirportInfo[0];

    // Extrai e converte o parâmetro 'destination' (ID do aeroporto de destino)
    const destinationParam = searchParams.get("destination");
    const destination = destinationParam
      ? parseInt(destinationParam)
      : undefined;

    // Inicializa variável para armazenar o resultado da busca do aeroporto de destino
    let destinationAirportInfo: AirportType[] | undefined = undefined;

    // Caso o ID do aeroporto de destino exista, busca informações do aeroporto no cache
    if (destination) {
      destinationAirportInfo = await getAirportByCache(destination);
    }

    // Valida se o aeroporto de destino foi localizado corretamente (deve existir e retornar um único resultado)
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

    // Seleciona o aeroporto de destino
    const destinationAirport = destinationAirportInfo[0];

    // Extrai o parâmetro 'cabin' (tipo de cabine)
    const cabinParam = searchParams.get("cabin");

    // Inicializa variável para armazenar o tipo de cabine selecionado
    let cabin: Cabin | undefined = undefined;

    // Caso o parâmetro de cabine exista, recupera o objeto correspondente no dicionário 'cabins'
    if (cabinParam) {
      cabin = cabins[cabinParam as keyof typeof cabins];
    }

    // Valida se o parâmetro da cabine foi fornecido e existe no objeto 'cabins'
    if (!cabinParam || !cabin) {
      return NextResponse.json(
        { error: "Failed to Find Cabin!" },
        { status: 400 }
      );
    }

    // Extrai e converte o parâmetro 'seats' (quantidade de assentos requisitada)
    const seatsParam = searchParams.get("seats");
    const seats = seatsParam ? parseInt(seatsParam) : undefined;

    // Valida a quantidade de assentos (deve ser número válido e maior ou igual a 1)
    if (!seats || isNaN(seats) || seats < 1) {
      return NextResponse.json(
        { error: "Invalid Seat Amount!" },
        { status: 400 }
      );
    }

    // Realiza consulta no banco de dados para buscar disponibilidade de assentos
    // de acordo com todos os parâmetros informados
    const data = await prismaClient.routesData.findMany({
      where: {
        routeId: routeId, // ID da rota
        cabinKey: String(cabin.key), // Chave da cabine (ex: 'economy', 'business')
        originAirport: originAirport.airportCode, // Código IATA do aeroporto de origem
        destinationAirport: destinationAirport.airportCode, // Código IATA do aeroporto de destino
        seats: { gte: seats }, // Quantidade mínima de assentos disponível
      },
      orderBy: {
        date: "asc", // Ordena resultados por data de partida (ascendente)
      },
    });

    // Retorna os dados encontrados como resposta JSON
    return NextResponse.json(data);
  } catch {
    // Captura exceções e retorna erro 500 com mensagem genérica
    return NextResponse.json(
      { error: "No route found. Please try again later." },
      { status: 500 }
    );
  }
}
