import { getRouteByCache } from "@/lib/route/cacheRoute";
import { NextRequest, NextResponse } from "next/server";

// Função handler para requisições HTTP do tipo GET
export async function GET(
  req: NextRequest, // Objeto da requisição HTTP contendo detalhes da chamada
  { params }: { params: Promise<{ airportId: string }> } // Objeto com os parâmetros da rota, contendo o ID do aeroporto como string
) {
  try {
    // Aguarda a resolução da Promise dos parâmetros e extrai o airportId
    const { airportId } = await params;
    
    // Converte o ID do aeroporto de string para número
    const airportIdNumber = Number(airportId);

    // Verifica se o ID convertido é válido (deve ser um número maior que 0)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Route!" }, // Mensagem de erro se o ID for inválido
        { status: 400 } // Retorna status HTTP 400 (Bad Request)
      );
    }

    // Recupera todas as rotas do cache, passando 0 como parâmetro genérico
    const routes = await getRouteByCache(0);

    // Verifica se as rotas foram encontradas com sucesso
    if (!routes) {
      return NextResponse.json(
        { error: "Failed to Find Routes!" }, // Mensagem de erro caso não haja rotas
        { status: 400 } // Retorna status HTTP 400 (Bad Request)
      );
    }

    // Filtra as rotas com base no ID do aeroporto informado
    const filteredRoutes = routes.filter((route) => {
      // Se o primeiro aeroporto da lista tiver ID maior que o buscado,
      // a rota é descartada, pois os aeroportos estão ordenados por ID crescente
      if (route.airports[0].id > airportIdNumber) {
        return false;
      }

      // Verifica se algum dos aeroportos da rota possui o ID igual ao buscado
      return route.airports.some((airport) => airport.id === airportIdNumber);
    });

    // Retorna a lista de rotas filtradas em formato JSON com status padrão 200
    return NextResponse.json(filteredRoutes);
  } catch {
    // Captura qualquer erro não tratado e retorna status HTTP 500
    return NextResponse.json(
      { error: "Failed to Find Routes!" }, // Mensagem de erro genérica
      { status: 500 } // Retorna status HTTP 500 (Internal Server Error)
    );
  }
}
