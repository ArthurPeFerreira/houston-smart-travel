"use client"; // Indica que este é um componente do lado do cliente no Next.js (App Router)

// Função de logout do NextAuth
import { signOut } from "next-auth/react";

// Componente de link do Next.js para navegação interna
import Link from "next/link";

// Ícones utilizados na barra de navegação
import { IoIosLogOut } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

// Hooks do React e do Next.js
import { useState } from "react";
import { useRouter } from "next/navigation";

// Componente de navegação principal do sistema
export default function Navbar() {
  // Estado que controla o loading durante o processo de logout
  const [loading, setLoading] = useState<boolean>(false);

  // Hook para redirecionar entre páginas
  const router = useRouter();

  // Função responsável por executar o logout
  async function handleLogout() {
    setLoading(true); // Inicia o loading
    await signOut({ redirect: false }); // Encerra a sessão sem redirecionar automaticamente
    router.push("/login"); // Redireciona para a página de login
    setLoading(false); // Finaliza o loading
  }

  return (
    <nav className="text-white w-full h-15 bg-gray-800 flex items-center justify-between px-4 py-3">
      {/* Navegação entre páginas */}
      <div className="flex flex-row gap-8 text-xl">
        <Link href={"/"}>
          <h2 className="font-medium hover:text-gray-300 transition-colors duration-200">
            Home
          </h2>
        </Link>

        <Link href={"/admin"}>
          <h2 className="font-medium hover:text-gray-300 transition-colors duration-200">
            Admin
          </h2>
        </Link>

        <Link href={"/admin/statistics"}>
          <h2 className="font-medium hover:text-gray-300 transition-colors duration-200">
            Statistics
          </h2>
        </Link>
      </div>

      {/* Botão de logout com ícone */}
      <button
        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? (
          // Ícone de loading enquanto realiza logout
          <FaSpinner className="animate-spin p-2" size={40} />
        ) : (
          // Ícone de logout padrão
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
