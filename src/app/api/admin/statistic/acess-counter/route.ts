import { NextResponse, NextRequest } from "next/server";
import { getAcessCounterByCache } from "@/lib/statistics/acessCounter/cacheAcessCounter";
import { resetAcessCounter } from "@/lib/statistics/acessCounter/resetAcessCounter";

export async function GET(request: NextRequest) {
  try {
    // Parseia a URL e extrai o query param "type"
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "check flights" | "home" | null;

    // Se não veio type, retorna Bad Request
    if (!type) {
      return NextResponse.json(
        { error: "Missing query parameter: type" },
        { status: 400 }
      );
    }

    // Pega do Cache
    const access = await getAcessCounterByCache(type);

    // 4. Se não existir, retorna 404
    if (!access) {
      return NextResponse.json(
        { error: `No record found for type ${type}` },
        { status: 404 }
      );
    }

    // 5. Retorna o JSON com o resultado
    return NextResponse.json(access);
  } catch (error) {
    console.error("Failed to fetch access data.", error);
    return NextResponse.json(
      { error: "Failed to fetch access data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Lê o body como JSON
    const body = await request.json();

    const { type }: { type: "check flights" | "home" | undefined } = body;

    // Valida se veio o parâmetro no JSON
    if (!type) {
      return NextResponse.json(
        { error: "Missing field in body: type" },
        { status: 400 }
      );
    }

    // Executa o reset no contador
    const access = await resetAcessCounter(type);

    // Se não veio nada de volta, retorna 404
    if (!access) {
      return NextResponse.json(
        { error: `Failed to reset access data for type ${type}` },
        { status: 404 }
      );
    }

    // Retorna o JSON com o objeto atualizado
    return NextResponse.json(access);
  } catch (error) {
    console.error("Failed to reset access data.", error);
    return NextResponse.json(
      { error: "Failed to reset access data." },
      { status: 500 }
    );
  }
}
