import { getRouteByCache } from "@/lib/route/cacheRoute"; // Importa a função para buscar Rotas no cache
import { deleteRoute } from "@/lib/route/deleteRoute"; // Importa a função para deletar um Rota
import { editRoute } from "@/lib/route/editRoute"; // Importa a função para editar um Rota
import { EditRouteType } from "@/lib/route/types";
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
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Rota no cache usando o ID
    const route = await getRouteByCache(routeIdNumber);

    // Se o Rota não for encontrado, retorna um erro 400
    if (!route) {
      return NextResponse.json(
        { message: "Failed to Find Route!" }, // Mensagem de erro
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

// Função DELETE para deletar um Rota pelo ID
export async function DELETE(
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
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Rota no cache usando o ID
    const route = await getRouteByCache(routeIdNumber);

    // Se o Rota não for encontrado, retorna um erro 400
    if (!route) {
      return NextResponse.json(
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Deleta o Rota usando o ID
    const deletedRoute = await deleteRoute(routeIdNumber);

    // Se a deleção falhar, retorna um erro 400
    if (!deletedRoute) {
      return NextResponse.json(
        { message: "Failed to Delete Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Rota deletado
    return NextResponse.json(deletedRoute);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Delete route!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função PUT para editar um Rota pelo ID
export async function PUT(
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
        { message: "Failed to Find route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Extrai as informações do Rota do corpo da requisição
    const routeInfo: EditRouteType = await req.json();

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (
      !routeInfo.id ||
      !routeInfo.mileageProgram ||
      routeInfo.enableLayovers === undefined ||
      routeInfo.active === undefined ||
      !routeInfo.cabins ||
      routeInfo.cabins.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Rota no cache usando o ID
    const route = await getRouteByCache(routeIdNumber);

    // Se o Rota não for encontrado, retorna um erro 400
    if (!route) {
      return NextResponse.json(
        { message: "Failed to Find Route!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Edita o Rota com as informações fornecidas
    const routeEdited = await editRoute(routeInfo);

    // Retorna o Rota editado
    return NextResponse.json(routeEdited);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Edit Route!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
