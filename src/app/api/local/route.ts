// Importa a função 'getLocalByCache' responsável por buscar locais utilizando cache
import { getLocalByCache } from "@/lib/local/cacheLocal";

// Importa o objeto 'NextResponse' para formatar respostas HTTP na API do Next.js
import { NextResponse } from "next/server";

// Função que trata requisições HTTP GET para retornar todos os locais disponíveis
export async function GET() {
    try {
        // Recupera os locais a partir do cache, utilizando o argumento 0 como chave ou identificador padrão
        const locals = await getLocalByCache(0);

        // Verifica se não foram encontrados locais e retorna uma resposta com status 400 (Bad Request)
        if (!locals) {
            return NextResponse.json(
                { error: "Failed to Find Locals!" },
                { status: 400 }
            );
        }

        // Retorna os locais encontrados como resposta JSON com status 200 (OK) implícito
        return NextResponse.json(locals);
    } catch {
        // Em caso de erro inesperado (ex: falha na comunicação com o cache), retorna erro 500 (Internal Server Error)
        return NextResponse.json(
            { error: "Failed to Find Locals!" },
            { status: 500 }
        );
    }
}
