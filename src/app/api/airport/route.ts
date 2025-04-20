import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Aeroportos
export async function GET() {
  try {
    // Busca todos os Aeroportos no cache
    const airports = await getAirportByCache(0);

    // Se não houver Aeroportos, retorna um erro 400
    if (!airports) {
        return NextResponse.json(
          { message: "Failed to Find Airports!" }, // Mensagem de erro
          { status: 400 } // Status HTTP 400 (Bad Request)
        );
      }

    // Retorna a lista de Aeroportos encontrados
    return NextResponse.json(airports);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
        { error: "Failed to Find Airports!" }, // Mensagem de erro
        { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
