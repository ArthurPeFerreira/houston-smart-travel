import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { AirportType } from "@/lib/airport/types";
import { prismaClient } from "@/lib/prisma/prisma";
import { Cabin, cabins } from "@/lib/route/cabins";
import { getRouteByCache } from "@/lib/route/cacheRoute";
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Aeroportos
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const originParam = searchParams.get("origin");
    const origin = originParam ? parseInt(originParam) : undefined;

    let originAirportInfo: AirportType[] | undefined = undefined;

    if (origin) {
      originAirportInfo = await getAirportByCache(origin);
    }

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (
      !origin ||
      !originAirportInfo ||
      originAirportInfo.length === 0 ||
      originAirportInfo.length > 1
    ) {
      return NextResponse.json(
        { message: "Failed to Find Origin Airport!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    const originAirport = originAirportInfo[0];

    const destinationParam = searchParams.get("destination");
    const destination = destinationParam
      ? parseInt(destinationParam)
      : undefined;

    let destinationAirportInfo: AirportType[] | undefined = undefined;

    if (destination) {
      destinationAirportInfo = await getAirportByCache(destination);
    }

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (
      !destination ||
      !destinationAirportInfo ||
      destinationAirportInfo.length === 0 ||
      destinationAirportInfo.length > 1
    ) {
      return NextResponse.json(
        { message: "Failed to Find Destination Airport!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    const destinationAirport = destinationAirportInfo[0];

    const cabinParam = searchParams.get("cabin");

    let cabin: Cabin | undefined = undefined;

    if (cabinParam) {
      cabin = cabins[cabinParam as keyof typeof cabins];
    }

    if (!cabinParam || !cabin) {
      return NextResponse.json(
        { message: "Failed to Find Cabin!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    const seatsParam = searchParams.get("seats");
    const seats = seatsParam ? parseInt(seatsParam) : undefined;

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (!seats || isNaN(seats) || seats < 1) {
      return NextResponse.json(
        { message: "Invalid Seat Amount!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    // Busca todas as rotas no cache (parâmetro 0 utilizado para recuperar todas)
    const routes = await getRouteByCache(0);

    // Se rotas ou aeroportos não forem encontrados, retorna erro 400
    if (!routes) {
      return NextResponse.json(
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    const filteredRoute = routes.find((route) => {
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

    if (!filteredRoute) {
      return NextResponse.json(
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // HTTP 400 - Bad Request
      );
    }

    const data = await prismaClient.routesData.findMany({
      where: {
        routeId: filteredRoute.id,
        cabinKey: String(cabin.key),
        originAirport: originAirport.airportCode,
        destinationAirport: destinationAirport.airportCode,
        seats: { gte: seats },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Retorna a lista de Aeroportos encontrados
    return NextResponse.json(data);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Route!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
