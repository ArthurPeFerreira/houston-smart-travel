// Importa provedores, adaptadores e outras dependências necessárias do NextAuth
import CredentialsProvider from "next-auth/providers/credentials"; // Provedor de autenticação por credenciais
import { PrismaAdapter } from "@auth/prisma-adapter"; // Adaptador do Prisma para NextAuth
import { NextAuthOptions, Session } from "next-auth"; // Tipos do NextAuth
import { prismaClient } from "@/lib/prisma/prisma"; // Cliente do Prisma para interagir com o banco de dados
import { Adapter } from "next-auth/adapters"; // Tipo do adaptador
import { JWT } from "next-auth/jwt"; // Tipo do token JWT
import bcrypt from "bcrypt"; // Biblioteca para criptografia de senhas
import { updateUserCache } from "../cacheUser";

// Interface que define as propriedades de um usuário
interface UserProps {
  id: string; // ID do usuário
  user: string; // Nome de usuário
  name: string; // Nome completo do usuário
  active: boolean; // Status de ativação do usuário
  dateJoined: Date; // Data de cadastro do usuário
  lastLogin: Date | null; // Data do último login (pode ser nula)
  updatedAt: Date; // Data da última atualização do usuário
}

// Configuração do NextAuth
export const authOptions: NextAuthOptions = {
  // Configura o adaptador Prisma para conectar ao banco de dados
  adapter: PrismaAdapter(prismaClient) as Adapter,

  // Define os provedores de autenticação
  providers: [
    // Provedor de autenticação por credenciais (usuário e senha)
    CredentialsProvider({
      name: "Credentials", // Nome do provedor exibido na tela de login
      credentials: {
        user: { label: "Username", type: "text" }, // Campo para entrada do nome de usuário
        password: { label: "Password", type: "password" }, // Campo para entrada da senha
      },
      // Função para autorizar o login
      async authorize(credentials) {
        // Verifica se todas as credenciais foram fornecidas
        if (!credentials?.user || !credentials?.password) {
          throw new Error("Incorrect username or password!"); // Lança erro se faltar credenciais
        }

        // Busca o usuário no banco de dados pelo nome de usuário
        const userValidation = await prismaClient.users.findUnique({
          where: { user: credentials.user }, // Filtra pelo nome de usuário
          select: {
            id: true, // Seleciona o ID do usuário
            user: true, // Seleciona o nome de usuário
            password: true, // Seleciona a senha criptografada
            name: true, // Seleciona o nome completo
            active: true, // Seleciona o status de ativação
            dateJoined: true, // Seleciona a data de cadastro
            lastLogin: true, // Seleciona a data do último login
            updatedAt: true, // Seleciona a data da última atualização
          },
        });

        // Retorna erro se o usuário não existir no banco de dados
        if (!userValidation) {
          throw new Error("Incorrect username or password!"); // Lança erro se o usuário não for encontrado
        }

        // Valida a senha fornecida com a senha criptografada no banco de dados
        const validPassword = await bcrypt.compare(
          credentials.password, // Senha fornecida
          userValidation.password || "" // Senha criptografada no banco
        );

        // Retorna erro se a senha for inválida
        if (!validPassword) {
          throw new Error("Incorrect username or password!"); // Lança erro se a senha não corresponder
        }

        // Verifica se o usuário está ativo
        if (!userValidation.active) {
          throw new Error("Your user is disabled!"); // Lança erro se o usuário estiver inativo
        }

        // Atualiza o campo `lastLogin` do usuário no banco de dados
        await prismaClient.users.update({
          where: { id: userValidation.id }, // Filtra pelo ID do usuário
          data: { lastLogin: new Date() }, // Atualiza com a data/hora atual
        });

        // Desconecta o cliente do Prisma após a operação
        await prismaClient.$disconnect();

        // Cria um objeto de usuário com as informações necessárias
        const user: UserProps = {
          id: String(userValidation.id), // ID do usuário
          user: userValidation.user, // Nome de usuário
          name: userValidation.name, // Nome completo
          active: userValidation.active, // Status de ativação
          dateJoined: userValidation.dateJoined, // Data de cadastro
          lastLogin: userValidation.lastLogin, // Data do último login
          updatedAt: userValidation.updatedAt, // Data da última atualização
        };

        // Atualiza o Cache do Usuário
        await updateUserCache();
        
        // Retorna o usuário autenticado para o NextAuth
        return user;
      },
    }),
  ],

  // Configura callbacks para personalizar o token e a sessão
  callbacks: {
    // Callback JWT: Customiza o token JWT retornado.
    
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        // Adiciona propriedades do usuário ao token JWT
        token.id = user.id; // ID do usuário
        token.user = user.user; // Nome de usuário
        token.name = user.name; // Nome completo
        token.active = user.active; // Status de ativação
        token.dateJoined = user.dateJoined; // Data de cadastro
        token.lastLogin = user.lastLogin; // Data do último login
        token.updatedAt = user.updatedAt; // Data da última atualização
      }
      return token; // Retorna o token personalizado
    },
    // Callback de Sessão: Personaliza os dados da sessão.
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // Adiciona propriedades do usuário autenticado na sessão
        session.user = {
          id: token.id, // ID do usuário
          user: token.user, // Nome de usuário
          name: token.name, // Nome completo
          active: token.active, // Status de ativação
          dateJoined: token.dateJoined, // Data de cadastro
          lastLogin: token.lastLogin, // Data do último login
          updatedAt: token.updatedAt, // Data da última atualização
        };
      }
      return session; // Retorna a sessão personalizada
    },
  },

  // Configuração da sessão
  session: {
    strategy: "jwt", // Usa JWT como estratégia de sessão
    maxAge: 2 * 60 * 60, // Sessão expira em 2 horas
    updateAge: 2 * 60 * 60, // Atualiza o token após 2 horas
  },

  // Segredo usado para assinar os tokens JWT
  secret: process.env.NEXTAUTH_SECRET,
};