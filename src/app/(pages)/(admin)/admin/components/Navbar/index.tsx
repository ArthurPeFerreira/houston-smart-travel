// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da função de logout do NextAuth
import { signOut } from "next-auth/react";

// Importação do componente de link do Next.js para navegação interna
import Link from "next/link";

// Importação dos ícones do React Icons
import { IoIosLogOut } from "react-icons/io";
import { FaSpinner } from "react-icons/fa"; // Ícone de carregamento

// Importação dos hooks do React para gerenciamento de estado e navegação
import { useState } from "react";
import { useRouter } from "next/navigation";

// Componente Navbar para a barra de navegação
export default function Navbar() {
  // Estado para controlar o carregamento do logout
  const [loading, setLoading] = useState<boolean>(false);
  
  // Hook para redirecionamento de páginas
  const router = useRouter();

  // Função para lidar com o logout do usuário
  async function handleLogout() {
    setLoading(true); // Ativa o estado de carregamento
    await signOut({ redirect: false }); // Faz o logout sem redirecionamento automático
    router.push("/login"); // Redireciona o usuário para a página de login
    setLoading(false); // Desativa o estado de carregamento
  }

  return (
    <nav className="text-white w-full h-15 bg-gray-800 flex items-center justify-between px-4 py-3">
      {/* Link para a página inicial */}
      <Link href={"/"}>
        <h2 className="font-medium hover:text-gray-300 transition-colors duration-200">
          Home
        </h2>
      </Link>

      {/* Título do painel de administração */}
      <h1 className="font-bold text-3xl">Admin Panel</h1>

      {/* Botão de logout */}
      <button
        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
        onClick={handleLogout}
        disabled={loading} // Desabilita o botão enquanto o logout está em andamento
      >
        {loading ? (
          // Exibe o ícone de carregamento se o logout estiver em andamento
          <FaSpinner className="animate-spin p-2" size={40} />
        ) : (
          // Exibe o ícone de logout normalmente
          <IoIosLogOut
            className="hover:cursor-pointer hover:opacity-80 transition-opacity duration-200"
            color="red"
            size={40}
          />
        )}
      </button>
    </nav>
  );
}
