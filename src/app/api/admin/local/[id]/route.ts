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

// Importa biblioteca para manipulação precisa de valores decimais
import Decimal from "decimal.js";
import { s3Client } from "@/lib/aws/s3/s3Client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { ulid } from "ulid";

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

    // Envia a imagem
    const body = Buffer.from(await localInfo.image.arrayBuffer());

    const imageUlid = ulid();

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: `${process.env.BUCKET_NAME}`, // nome do bucket
        Key: `locals/${local[0].image}`, // caminho/arquivo a apagar
      })
    );

    await s3Client.send(
      new PutObjectCommand({
        Bucket: `${process.env.BUCKET_NAME}`,
        Key: `locals/${imageUlid}.${localInfo.image.type.split("/")[1]}`,
        Body: body,
        ContentType: localInfo.image.type,
        ContentLength: localInfo.image.size,
      })
    );

    // Cria o objeto com os dados finais para serem salvos no banco
    const localToEdit: EditLocalType = {
      city: localInfo.city,
      country: localInfo.country,
      passagePrice: localInfo.passagePrice,
      airportId: localInfo.airportId,
      active: localInfo.active,
      image: `${imageUlid}.${localInfo.image.type.split("/")[1]}`,
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
