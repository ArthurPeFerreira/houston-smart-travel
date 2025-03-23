import { getAirportByCache } from "@/lib/airport/cacheAirport"; // Importa a função para buscar Aeroportos no cache
import { deleteAirport } from "@/lib/airport/deleteAirport"; // Importa a função para deletar um Aeroporto
import { editAirport } from "@/lib/airport/editAirport"; // Importa a função para editar um Aeroporto
import { AirportType, CreateAndEditAirportType } from "@/lib/airport/types";
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar um Aeroporto específico pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const airportIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Aeroporto no cache usando o ID
    const airport = await getAirportByCache(airportIdNumber);

    // Se o Aeroporto não for encontrado, retorna um erro 400
    if (!airport) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Aeroporto encontrado (o primeiro do array, pois getAirportByCache retorna um array)
    return NextResponse.json(airport[0]);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Airport!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função DELETE para deletar um Aeroporto pelo ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const airportIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Aeroporto no cache usando o ID
    const airport = await getAirportByCache(airportIdNumber);

    // Se o Aeroporto não for encontrado, retorna um erro 400
    if (!airport) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Deleta o Aeroporto usando o ID
    const deletedAirport = await deleteAirport(airportIdNumber);

    // Se a deleção falhar, retorna um erro 400
    if (!deletedAirport) {
      return NextResponse.json(
        { message: "Failed to Delete Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Aeroporto deletado
    return NextResponse.json(deletedAirport);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Delete Airport!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função PUT para editar um Aeroporto pelo ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const airportIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!airportIdNumber || airportIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Extrai as informações do Aeroporto do corpo da requisição
    const airportInfo: CreateAndEditAirportType = await req.json();

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (
      !airportInfo.city === undefined ||
      airportInfo.airportCode === undefined
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Aeroporto no cache usando o ID
    const airport = await getAirportByCache(airportIdNumber);

    // Se o Aeroporto não for encontrado, retorna um erro 400
    if (!airport) {
      return NextResponse.json(
        { message: "Failed to Find Airport!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    const airportEditInfo: AirportType = {
      id: airportIdNumber,
      city: airportInfo.city,
      airportCode: airportInfo.airportCode,
    };

    // Edita o Aeroporto com as informações fornecidas
    const AirportEdited = await editAirport(airportEditInfo);

    // Retorna o Aeroporto editado
    return NextResponse.json(AirportEdited);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Edit Airport!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
