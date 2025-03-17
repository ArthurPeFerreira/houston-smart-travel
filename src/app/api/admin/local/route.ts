import { getLocalByCache } from "@/lib/local/cacheLocal"; // Importa a função para buscar Locais no cache
import { createLocal } from "@/lib/local/createLocal"; // Importa a função para criar um Local
import { CreateLocalType, CreateLocalTypeFile } from "@/lib/local/types"; // Importa os tipos para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas
import { promises as fs } from "fs"; // Importa o módulo fs para manipulação de arquivos de forma assíncrona
import path from "path"; // Importa o módulo path para manipulação de caminhos de diretórios e arquivos

// Função GET para buscar todos os Locais
export async function GET() {
    try {
        // Busca todos os Locais no cache, passando 0 como argumento (talvez indicando um limite ou todos)
        const locals = await getLocalByCache(0);

        // Se não houver Locais, retorna um erro 400
        if (!locals) {
            return NextResponse.json(
                { message: "Failed to Find Locals!" }, // Mensagem de erro
                { status: 400 } // Status HTTP 400 (Bad Request)
            );
        }

        // Retorna a lista de Locais encontrados
        return NextResponse.json(locals);
    } catch {
        // Em caso de erro, retorna um erro 500
        return NextResponse.json(
            { error: "Failed to Find Locals!" }, // Mensagem de erro
            { status: 500 } // Status HTTP 500 (Internal Server Error)
        );
    }
}

// Função POST para criar um novo Local
export async function POST(req: NextRequest) {
    try {
        // Obtém os dados do formulário enviado na requisição
        const formData = await req.formData();

        // Extrai os valores dos campos do formulário
        const city = formData.get("city"); // Obtém o valor do campo "city"
        const airportId = formData.get("airportId"); // Obtém o valor do campo "airportId"
        const file = formData.get("image") as File | null; // Obtém o arquivo enviado no campo "image"

        // Verifica se todos os campos obrigatórios foram fornecidos
        if (!city || !airportId || !file) {
            return NextResponse.json(
                { error: "Missing Required Fields!" }, // Mensagem de erro informando campos ausentes
                { status: 400 } // Status HTTP 400 (Bad Request)
            );
        }

        // Converte o ID do aeroporto para número inteiro
        const airportIdNumber = Number(airportId);

        // Busca todos os Locais no cache
        const locals = await getLocalByCache(0);

        // Se houver Locais no cache, verifica se o Local já existe
        if (locals) {
            const filterLocal = locals.find((local) => {
                return local.airport.id === airportIdNumber; // Compara o ID do aeroporto do Local
            });

            // Se o Local já existir, retorna um erro 400
            if (filterLocal) {
                return NextResponse.json(
                    { error: "This Local Already Exists!" }, // Mensagem de erro informando que já existe
                    { status: 400 } // Status HTTP 400 (Bad Request)
                );
            }
        }

        // Converte o arquivo de imagem para um buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Define os caminhos do diretório e do arquivo onde a imagem será armazenada
        const dirPath = path.join(process.cwd(), "public/locals/images");
        const filePath = path.join(dirPath, `${airportIdNumber}.jpg`);

        // Cria o diretório caso não exista
        await fs.mkdir(dirPath, { recursive: true });
        
        // Salva a imagem no diretório especificado
        await fs.writeFile(filePath, buffer);

        // Cria o objeto com os dados para salvar no banco
        const localToCreate: CreateLocalType = {
            city: city.toString(), // Converte a cidade para string e atribui ao objeto
            airportId: airportIdNumber, // Usa o ID do aeroporto convertido
            image: `/locals/images/${airportIdNumber}.jpg` // Define o caminho da imagem salva
        };

        // Cria o Local no banco de dados
        const localCreated = await createLocal(localToCreate);

        // Retorna o Local criado como resposta
        return NextResponse.json(localCreated);
    } catch {
        // Em caso de erro, retorna um erro 500
        return NextResponse.json(
            { error: "Failed to Create Local!" }, // Mensagem de erro
            { status: 500 } // Status HTTP 500 (Internal Server Error)
        );
    }
}