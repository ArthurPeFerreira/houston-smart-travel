import { getLocalByCache } from "@/lib/local/cacheLocal"; // Importa a função para buscar Locais no cache
import { createLocal } from "@/lib/local/createLocal"; // Importa a função para criar um Local
import {  CreateLocalType, CreateLocalTypeFile } from "@/lib/local/types"; // Importa o tipo CreateLocalType para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas
import { promises as fs } from "fs";
import path from "path";

// Função GET para buscar todos os Locais
export async function GET() {
  try {
    // Busca todos os Locais no cache
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
        // Extrai as informações do Local do corpo da requisição
        const localInfo: CreateLocalTypeFile = await req.json();  

        // Verifica se todos os campos obrigatórios foram fornecidos
        if(!localInfo.city || !localInfo.airportId || !localInfo.image){
            return NextResponse.json(
                { error: "Missing Required Fields!" }, // Mensagem de erro
                { status: 400 } // Status HTTP 400 (Bad Request)
            );
        }

        // Busca todos os Locais no cache
        const locals = await getLocalByCache(0);

        // Se houver Locais no cache, verifica se o Local já existe
        if (locals){
            const filterLocal = locals.find((local)=>{
                return local.airport.id === localInfo.airportId; // Compara o Aeroporto do Local
            })

            // Se o Local já existir, retorna um erro 400
            if (filterLocal){
                return NextResponse.json(
                    { error: "This Local Already Exists!" }, // Mensagem de erro
                    { status: 400 } // Status HTTP 400 (Bad Request)
                );
            }
        }

         // Converte o File em um Buffer
         const arrayBuffer = await localInfo.image.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
 
         // Define o caminho onde o arquivo será salvo
         const dirPath = path.join(process.cwd(), "public/locals/images");
         const filePath = path.join(dirPath, `${localInfo.airportId}.jpg`);
 
         // Cria a pasta se não existir
         await fs.mkdir(dirPath, { recursive: true });
 
         // Salva o arquivo
         await fs.writeFile(filePath, buffer);
 
         // Cria o objeto para ser salvo no banco
         const localToCreate: CreateLocalType = {
             city: localInfo.city,
             airportId: localInfo.airportId,
             image: `/locals/images/${localInfo.airportId}.jpg`
         };

        // Cria o Local com as informações fornecidas
        const localCreated = await createLocal(localToCreate);
  
        // Retorna o Local criado
        return NextResponse.json(localCreated);
    } catch {
        // Em caso de erro, retorna um erro 500
        return NextResponse.json(
            { error: "Failed to Create Local!" }, // Mensagem de erro
            { status: 500 } // Status HTTP 500 (Internal Server Error)
        );
    }
}