import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar um Aeroporto específico pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const airportIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Aeroporto no cache usando o ID
    const airport = await getAirportByCache(airportIdNumber);

    // Se o Aeroporto não for encontrado, retorna um erro 400
    if (!airport) {
      return NextResponse.json(
        { error: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Aeroporto encontrado (o primeiro do array, pois getAirportByCache retorna um array)
    return NextResponse.json(airport[0]);
  } catch{
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Airport!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
