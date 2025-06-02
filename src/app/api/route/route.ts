import { getRouteByCache } from "@/lib/route/cacheRoute"; // Importa a função para buscar Rotas no cache
import { NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Rotas
export async function GET() {
  try {
    // Busca todos os Rotas no cache
    const routes = await getRouteByCache(0);

    // Se não houver Rotas, retorna um erro 400
    if (!routes) {
      return NextResponse.json(
        { error: "Failed to Find Routes!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna a lista de Rotas encontrados
    return NextResponse.json(routes);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Routes!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
