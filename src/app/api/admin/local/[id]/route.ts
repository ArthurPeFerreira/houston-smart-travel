import { getLocalByCache } from "@/lib/local/cacheLocal"; // Importa a função para buscar Locais no cache
import { deleteLocal } from "@/lib/local/deleteLocal"; // Importa a função para deletar um Local
import { editLocal } from "@/lib/local/editLocal"; // Importa a função para editar um Local
import { LocalType, EditLocalType, EditLocalTypeFile } from "@/lib/local/types";
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas
import { promises as fs } from "fs";
import path from "path";

// Função GET para buscar um Local específico pelo ID
export async function GET({ params }: { params: { id: string } }) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Local no cache usando o ID
    const local = await getLocalByCache(localIdNumber);

    // Se o Local não for encontrado, retorna um erro 400
    if (!local) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Local encontrado (o primeiro do array, pois getLocalByCache retorna um array)
    return NextResponse.json(local[0]);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find Local!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função DELETE para deletar um Local pelo ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o Local no cache usando o ID
    const local = await getLocalByCache(localIdNumber);

    // Se o Local não for encontrado, retorna um erro 400
    if (!local) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Deleta o Local usando o ID
    const deletedLocal = await deleteLocal(localIdNumber);

    // Se a deleção falhar, retorna um erro 400
    if (!deletedLocal) {
      return NextResponse.json(
        { message: "Failed to Delete Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o Local deletado
    return NextResponse.json(deletedLocal);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Delete Local!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função PUT para editar um Local pelo ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    
    // Obtém os dados do formulário enviado na requisição
    const formData = await req.formData();
    
    // Extrai os valores dos campos do formulário
    const city = formData.get("city"); // Obtém o valor do campo "city"
    const airportId = formData.get("airportId"); // Obtém o valor do campo "airportId"
    const active = formData.get("active"); // Obtém o valor do campo "active"
    const image = formData.get("image") as File | null; // Obtém o arquivo enviado no campo "image"
    
    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!city || !image || !airportId || active === undefined) {
      return NextResponse.json(
        { error: "Missing Required Fields!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }
    
    const activeValue = active ? active.toString() === "true" : false;

    const localInfo: EditLocalTypeFile = {
      airportId: Number(airportId),
      city: city.toString(),
      image,
      active: activeValue,
    };
    // Busca o Local no cache usando o ID
    const local = await getLocalByCache(localIdNumber);

    // Se o Local não for encontrado, retorna um erro 400
    if (!local) {
      return NextResponse.json(
        { message: "Failed to Find Local!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
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
    const localToEdit: EditLocalType = {
      city: localInfo.city,
      airportId: localInfo.airportId,
      active: localInfo.active,
    };

    // Edita o Local com as informações fornecidas
    const LocalEdited = await editLocal(localToEdit);

    // Retorna o Local editado
    return NextResponse.json(LocalEdited);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Edit Local!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
