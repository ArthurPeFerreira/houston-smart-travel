import { getUserByCache } from "@/lib/user/cacheUser"; // Importa a função para buscar usuários no cache
import { deleteUser } from "@/lib/user/deleteUser"; // Importa a função para deletar um usuário
import { editUser } from "@/lib/user/editUser"; // Importa a função para editar um usuário
import { EditUserType } from "@/lib/user/types"; // Importa o tipo EditUserType para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar um usuário específico pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const userIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!userIdNumber || userIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o usuário no cache usando o ID
    const user = await getUserByCache(userIdNumber);

    // Se o usuário não for encontrado, retorna um erro 400
    if (!user) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o usuário encontrado (o primeiro do array, pois getUserByCache retorna um array)
    return NextResponse.json(user[0]);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Find User!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função DELETE para deletar um usuário pelo ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const userIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!userIdNumber || userIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o usuário no cache usando o ID
    const user = await getUserByCache(userIdNumber);

    // Se o usuário não for encontrado, retorna um erro 400
    if (!user) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Deleta o usuário usando o ID
    const deletedUser = await deleteUser(userIdNumber);

    // Se a deleção falhar, retorna um erro 400
    if (!deletedUser) {
      return NextResponse.json(
        { error: "Failed to Delete User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Retorna o usuário deletado
    return NextResponse.json(deletedUser);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Delete User!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função PUT para editar um usuário pelo ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Converte o ID da string para número
    const { id } = await params;
    const userIdNumber = Number(id);

    // Verifica se o ID é válido (deve ser um número maior que 0)
    if (!userIdNumber || userIdNumber < 1) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Extrai as informações do usuário do corpo da requisição
    const userInfo: EditUserType = await req.json();

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (
      !userInfo.name === undefined ||
      !userInfo.user === undefined ||
      userInfo.active === undefined
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Busca o usuário no cache usando o ID
    const user = await getUserByCache(userIdNumber);

    // Se o usuário não for encontrado, retorna um erro 400
    if (!user) {
      return NextResponse.json(
        { error: "Failed to Find User!" }, // Mensagem de erro
        { status: 400 } // Status HTTP 400 (Bad Request)
      );
    }

    // Edita o usuário com as informações fornecidas
    const userEdited = await editUser(userInfo);

    // Retorna o usuário editado
    return NextResponse.json(userEdited);
  } catch {
    // Em caso de erro inesperado, retorna um erro 500
    return NextResponse.json(
      { error: "Failed to Edit User!" }, // Mensagem de erro
      { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}
