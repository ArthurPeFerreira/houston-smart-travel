// Importa a função para buscar Locais armazenados em cache
import { getLocalByCache } from "@/lib/local/cacheLocal";

// Importa a função responsável por deletar um Local do banco de dados
import { deleteLocal } from "@/lib/local/deleteLocal";

// Importa a função responsável por editar um Local
import { editLocal } from "@/lib/local/editLocal";

// Importa os tipos utilizados para a edição do Local
import { EditLocalType, EditLocalTypeFile } from "@/lib/local/types";

// Importa tipos de requisição e resposta do Next.js
import { NextRequest, NextResponse } from "next/server";

// Importa a API de Promises do sistema de arquivos para salvar a imagem localmente
import { promises as fs } from "fs";

// Importa o módulo 'path' para construção de caminhos
import path from "path";

// Importa biblioteca para manipulação precisa de valores decimais
import Decimal from "decimal.js";

// =========================
// Função GET — Busca um Local específico pelo ID
// =========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da URL (string) para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Valida se o ID é válido (número positivo)
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Busca o Local no cache utilizando o ID
    const local = await getLocalByCache(localIdNumber);

    // Retorna erro caso o Local não seja encontrado
    if (!local) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Retorna o Local encontrado (posição 0 do array retornado)
    return NextResponse.json(local[0]);
  } catch {
    // Retorna erro interno em caso de falha inesperada
    return NextResponse.json(
      { error: "Failed to Find Local!" },
      { status: 500 }
    );
  }
}

// =========================
// Função DELETE — Deleta um Local específico pelo ID
// =========================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da URL (string) para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Valida o ID
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Verifica se o Local existe no cache
    const local = await getLocalByCache(localIdNumber);

    // Se não existir, retorna erro
    if (!local) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Executa a deleção do Local no banco
    const deletedLocal = await deleteLocal(localIdNumber);

    // Verifica se a operação de deleção teve sucesso
    if (!deletedLocal) {
      return NextResponse.json(
        { error: "Failed to Delete Local!" },
        { status: 400 }
      );
    }

    // Retorna o Local que foi deletado
    return NextResponse.json(deletedLocal);
  } catch {
    // Retorna erro interno em caso de falha inesperada
    return NextResponse.json(
      { error: "Failed to Delete Local!" },
      { status: 500 }
    );
  }
}

// =========================
// Função PUT — Edita um Local específico pelo ID
// =========================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da URL (string) para número
    const { id } = await params;
    const localIdNumber = Number(id);

    // Verifica se o ID é válido
    if (!localIdNumber || localIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Lê os dados do formulário multipart enviado
    const formData = await req.formData();

    // Extrai os campos necessários do formulário
    const city = formData.get("city");
    const country = formData.get("country");
    const passagePrice = formData.get("passagePrice");
    const airportId = formData.get("airportId");
    const active = formData.get("active");
    const image = formData.get("image") as File | null;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (
      !city ||
      !image ||
      !airportId ||
      active === undefined ||
      !country ||
      !passagePrice
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields!" },
        { status: 400 }
      );
    }

    // Converte o valor booleano do campo 'active'
    const activeValue = active ? active.toString() === "true" : false;

    // Cria o objeto que representa os dados para edição (com imagem)
    const localInfo: EditLocalTypeFile = {
      airportId: Number(airportId),
      city: city.toString(),
      country: country.toString(),
      passagePrice: Decimal(passagePrice.toString()),
      image,
      active: activeValue,
    };

    // Verifica se o Local realmente existe
    const local = await getLocalByCache(localIdNumber);
    if (!local) {
      return NextResponse.json(
        { error: "Failed to Find Local!" },
        { status: 400 }
      );
    }

    // Converte o arquivo de imagem em buffer
    const arrayBuffer = await localInfo.image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define o caminho onde o arquivo de imagem será salvo
    const dirPath = path.join(process.cwd(), "public/locals/images");
    const filePath = path.join(dirPath, `${localInfo.airportId}.jpg`);

    // Garante que o diretório exista (criação recursiva)
    await fs.mkdir(dirPath, { recursive: true });

    // Escreve o novo arquivo de imagem no caminho especificado
    await fs.writeFile(filePath, buffer);

    // Cria o objeto com os dados finais para serem salvos no banco
    const localToEdit: EditLocalType = {
      city: localInfo.city,
      country: localInfo.country,
      passagePrice: localInfo.passagePrice,
      airportId: localInfo.airportId,
      active: localInfo.active,
    };

    // Executa a atualização dos dados no banco
    const LocalEdited = await editLocal(localToEdit);

    // Retorna os dados atualizados do Local
    return NextResponse.json(LocalEdited);
  } catch {
    // Retorna erro interno caso ocorra falha na edição
    return NextResponse.json(
      { error: "Failed to Edit Local!" },
      { status: 500 }
    );
  }
}
