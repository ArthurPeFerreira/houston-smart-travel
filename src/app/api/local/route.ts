import { getLocalByCache } from "@/lib/local/cacheLocal";
import { NextResponse } from "next/server";

// Função HTTP GET — Responsável por retornar todos os locais existentes
export async function GET() {
    try {
        // Recupera todos os locais armazenados em cache (passando 0 como argumento)
        const locals = await getLocalByCache(0);

        // Caso nenhum local seja encontrado, retorna erro 400 (bad request)
        if (!locals) {
            return NextResponse.json(
                { message: "Failed to Find Locals!" },
                { status: 400 }
            );
        }

        // Retorna os locais encontrados como resposta JSON
        return NextResponse.json(locals);
    } catch {
        // Em caso de erro inesperado, retorna erro 500 (internal server error)
        return NextResponse.json(
            { error: "Failed to Find Locals!" },
            { status: 500 }
        );
    }
}
