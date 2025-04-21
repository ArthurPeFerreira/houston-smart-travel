import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { createAirport } from "@/lib/airport/createAirport"; // Importa a função para criar um Aeroporto
import { CreateAndEditAirportType } from "@/lib/airport/types"; // Importa o tipo CreateAirportType para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os Aeroportos
export async function GET() {
  try {
    // Busca todos os Aeroportos no cache
    const airports = await getAirportByCache(0);

    // Se não houver Aeroportos, retorna um erro 400
    if (!airports) {
        return NextResponse.json(
          { error: "Failed to Find Airports!" }, // Mensagem de erro
          { status: 400 } // Status HTTP 400 (Bad Request)
        );
      }

    // Retorna a lista de Aeroportos encontrados
    return NextResponse.json(airports);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
        { error: "Failed to Find Airports!" }, // Mensagem de erro
        { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função POST para criar um novo Aeroporto
export async function POST(req: NextRequest) {
    try {
        // Extrai as informações do Aeroporto do corpo da requisição
        const airportInfo: CreateAndEditAirportType = await req.json();  

        // Verifica se todos os campos obrigatórios foram fornecidos
        if(!airportInfo.city || !airportInfo.airportCode){
            return NextResponse.json(
                { error: "Missing Required Fields!" }, // Mensagem de erro
                { status: 400 } // Status HTTP 400 (Bad Request)
            );
        }

        // Busca todos os Aeroportos no cache
        const airports = await getAirportByCache(0);

        // Se houver Aeroportos no cache, verifica se o Aeroporto já existe
        if (airports){
            const filterAirport = airports.find((airport)=>{
                return airport.airportCode === airportInfo.airportCode; // Compara o Codigo do Aeroporto
            })

            // Se o Aeroporto já existir, retorna um erro 400
            if (filterAirport){
                return NextResponse.json(
                    { error: "This Airport Already Exists!" }, // Mensagem de erro
                    { status: 400 } // Status HTTP 400 (Bad Request)
                );
            }
        }
        
        // Cria o Aeroporto com as informações fornecidas
        const AirportCreated = await createAirport(airportInfo);
  
        // Retorna o Aeroporto criado
        return NextResponse.json(AirportCreated);
    } catch {
        // Em caso de erro, retorna um erro 500
        return NextResponse.json(
            { error: "Failed to Create Airport!" }, // Mensagem de erro
            { status: 500 } // Status HTTP 500 (Internal Server Error)
        );
    }
}