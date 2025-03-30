import { getRouteByCache } from "@/lib/route/cacheRoute"; // Importa a função para buscar Rotas no cache
import { createRoute } from "@/lib/route/createRoute"; // Importa a função para criar um Rota
import { CreateRouteType } from "@/lib/route/types"; // Importa o tipo CreateRouteType para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Rotas
export async function GET() {
  try {
    // Busca todos os Rotas no cache
    const routes = await getRouteByCache(0);

    // Se não houver Rotas, retorna um erro 400
    if (!routes) {
      return NextResponse.json(
        { message: "Failed to Find Routes!" }, // Mensagem de erro
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

// Função POST para criar um novo Rota
export async function POST(req: NextRequest) {
  try {
    // Extrai as informações do Rota do corpo da requisição
    const routeInfo: CreateRouteType = await req.json();

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (
      !routeInfo.mileageProgram ||
      routeInfo.enableLayovers === undefined ||
      !routeInfo.airportsId ||
      routeInfo.airportsId.length !== 2 ||
      !routeInfo.cabins ||
      routeInfo.cabins.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields!" },
        { status: 400 }
      );
    }

    // Ordena os IDs dos aeroportos para comparação (independente da ordem enviada)
    const [id1, id2] = routeInfo.airportsId.sort((a, b) => a - b);

    // Busca todas as rotas armazenadas no cache
    const routes = await getRouteByCache(0);

    // Se houver rotas, verifica se já existe uma rota com os mesmos aeroportos
    if (routes) {
      const filterRoute = routes.find((route) => {
        // Extrai e ordena os IDs dos aeroportos da rota existente
        const existingIds = route.airports
          .map((a) => a.id)
          .sort((a, b) => a - b);
        return existingIds[0] === id1 && existingIds[1] === id2;
      });

      // Se a rota já existir, retorna erro
      if (filterRoute) {
        return NextResponse.json(
          { error: "This Route Already Exists!" },
          { status: 400 }
        );
      }
    }
    
    // Cria a nova rota
    const RouteCreated = await createRoute(routeInfo);
    
    // Retorna a nova rota criada
    return NextResponse.json(RouteCreated);
  } catch {
    // Em caso de erro, retorna erro interno
    return NextResponse.json(
      { error: "Failed to Create Route!" },
      { status: 500 }
    );
  }
}
