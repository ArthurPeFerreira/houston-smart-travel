import { getRouteByCache } from "@/lib/route/cacheRoute"; // Importa a função para buscar Rotas no cache
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar um Rota específico pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const routeIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!routeIdNumber || routeIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Rota no cache usando o ID
    const route = await getRouteByCache(routeIdNumber);

    // Se o Rota não for encontrado, retorna um erro 400
    if (!route) {
      return NextResponse.json(
        { error: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Rota encontrado (o primeiro do array, pois getrouteByCache retorna um array)
    return NextResponse.json(route[0]);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Route!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

