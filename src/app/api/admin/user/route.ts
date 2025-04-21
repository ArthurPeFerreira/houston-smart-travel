import { getUserByCache } from "@/lib/user/cacheUser"; // Importa a função para buscar usuários no cache
import { createUser } from "@/lib/user/createUser"; // Importa a função para criar um usuário
import { CreateUserType } from "@/lib/user/types"; // Importa o tipo CreateUserType para tipagem
import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do Next.js para manipulação de requisições e respostas

// Função GET para buscar todos os usuários
export async function GET() {
  try {
    // Busca todos os usuários no cache
    const users = await getUserByCache(0);

    // Se não houver usuários, retorna um erro 400
    if (!users) {
        return NextResponse.json(
          { error: "Failed to Find Users!" }, // Mensagem de erro
          { status: 400 } // Status HTTP 400 (Bad Request)
        );
      }

    // Retorna a lista de usuários encontrados
    return NextResponse.json(users);
  } catch {
    // Em caso de erro, retorna um erro 500
    return NextResponse.json(
        { error: "Failed to Find Users!" }, // Mensagem de erro
        { status: 500 } // Status HTTP 500 (Internal Server Error)
    );
  }
}

// Função POST para criar um novo usuário
export async function POST(req: NextRequest) {
    try {
        // Extrai as informações do usuário do corpo da requisição
        const userInfo: CreateUserType = await req.json();  

        // Verifica se todos os campos obrigatórios foram fornecidos
        if(!userInfo.name || !userInfo.password || !userInfo.user){
            return NextResponse.json(
                { error: "Missing Required Fields!" }, // Mensagem de erro
                { status: 400 } // Status HTTP 400 (Bad Request)
            );
        }

        // Busca todos os usuários no cache
        const users = await getUserByCache(0);

        // Se houver usuários no cache, verifica se o nome de usuário já existe
        if (users){
            const filterUser = users.find((user)=>{
                return user.user === userInfo.user; // Compara o nome de usuário
            })

            // Se o usuário já existir, retorna um erro 400
            if (filterUser){
                return NextResponse.json(
                    { error: "This User Already Exists!" }, // Mensagem de erro
                    { status: 400 } // Status HTTP 400 (Bad Request)
                );
            }
        }
        
        // Cria o usuário com as informações fornecidas
        const userCreated = await createUser(userInfo);
  
        // Retorna o usuário criado
        return NextResponse.json(userCreated);
    } catch {
        // Em caso de erro, retorna um erro 500
        return NextResponse.json(
            { error: "Failed to Create User!" }, // Mensagem de erro
            { status: 500 } // Status HTTP 500 (Internal Server Error)
        );
    }
}