// Importa a função para obter dados de locais armazenados em cache
import { getLocalByCache } from "@/lib/local/cacheLocal";

// Importa a função responsável por criar um novo local
import { createLocal } from "@/lib/local/createLocal";

// Importa os tipos utilizados para tipagem dos dados de Local
import { CreateLocalType, LocalType } from "@/lib/local/types";

// Importa tipos do Next.js para manipular requisições e respostas
import { NextRequest, NextResponse } from "next/server";

// Importa função para editar a ordem dos Locais
import { editLocalsOrder } from "@/lib/local/editLocalsOrder";

// Importa biblioteca para manipulação precisa de valores decimais
import Decimal from "decimal.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/aws/s3/s3Client";

import { ulid } from "ulid";

// Função HTTP GET — Responsável por retornar todos os locais existentes
export async function GET() {
  try {
    // Recupera todos os locais armazenados em cache (passando 0 como argumento)
    const locals = await getLocalByCache(0);

    // Caso nenhum local seja encontrado, retorna erro 400 (bad request)
    if (!locals) {
      return NextResponse.json(
        { error: "Failed to Find Locals!" },
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

// Função HTTP POST — Responsável por criar um novo local com imagem
export async function POST(req: NextRequest) {
  try {
    // Obtém os dados do formulário multipart enviado na requisição
    const formData = await req.formData();

    // Extrai os campos específicos do formulário
    const city = formData.get("city"); // Nome da cidade
    const country = formData.get("country"); // Nome do país
    const passagePrice = formData.get("passagePrice"); // Preço da passagem
    const airportId = formData.get("airportId"); // ID do aeroporto
    const file = formData.get("image") as File | null; // Arquivo de imagem

    // Valida se todos os campos obrigatórios foram preenchidos
    if (!city || !airportId || !file || !country || !passagePrice) {
      return NextResponse.json(
        { error: "Missing Required Fields!" },
        { status: 400 }
      );
    }

    // Converte o ID do aeroporto para número
    const airportIdNumber = Number(airportId);

    // Busca todos os locais existentes no cache
    const locals = await getLocalByCache(0);

    // Verifica se já existe um local com o mesmo ID de aeroporto
    if (locals) {
      const filterLocal = locals.find((local) => {
        return local.airport.id === airportIdNumber;
      });

      // Impede a criação duplicada do local
      if (filterLocal) {
        return NextResponse.json(
          { error: "This Local Already Exists!" },
          { status: 400 }
        );
      }
    }

    // Envia a imagem
    const body = Buffer.from(await file.arrayBuffer());

    const imageUlid = ulid(); 

    await s3Client.send(
      new PutObjectCommand({
        Bucket: `${process.env.BUCKET_NAME}`,
        Key: `locals/${imageUlid}.${file.type.split("/")[1]}`,
        Body: body,
        ContentType: file.type,
        ContentLength: file.size,
      })
    );

    // Monta registro para o banco
    const localToCreate: CreateLocalType = {
      city: city.toString(),
      country: country.toString(),
      passagePrice: Decimal(passagePrice.toString()),
      airportId: airportIdNumber,
      image: `${imageUlid}.${file.type.split("/")[1]}`,
    };
    // Executa a criação do local no banco
    const localCreated = await createLocal(localToCreate);

    // Retorna os dados do local recém-criado
    return NextResponse.json(localCreated);
  } catch (error){
    console.log(error);
    // Em caso de erro interno, retorna erro 500
    return NextResponse.json(
      { error: "Failed to Create Local!" },
      { status: 500 }
    );
  }
}

// Função HTTP PUT — Responsável por atualizar a ordem dos locais
export async function PUT(req: NextRequest) {
  try {
    // Extrai o novo array de locais (com nova ordem) do corpo da requisição
    const newLocalsOrder: LocalType[] = await req.json();

    // Valida se o array foi corretamente enviado
    if (!newLocalsOrder) {
      return NextResponse.json(
        { error: "Missing Required Fields!" },
        { status: 400 }
      );
    }

    // Busca os locais atuais no cache
    const locals = await getLocalByCache(0);

    // Verifica se todos os locais ainda existem e se o array não possui inconsistências
    if (
      locals?.length !== newLocalsOrder.length ||
      !locals.every((oldLocal) =>
        newLocalsOrder.some(
          (newLocal) => newLocal.airport.id === oldLocal.airport.id
        )
      )
    ) {
      return NextResponse.json(
        { error: "Some Locals are missing or the new array has extra items!" },
        { status: 400 }
      );
    }

    // Atualiza a ordem dos locais no banco de dados
    const localCreated = await editLocalsOrder(newLocalsOrder);

    // Retorna a nova ordenação salva
    return NextResponse.json(localCreated);
  } catch {
    // Em caso de erro interno, retorna erro 500
    return NextResponse.json(
      { error: "Failed to Edit Locals Order!" },
      { status: 500 }
    );
  }
}
