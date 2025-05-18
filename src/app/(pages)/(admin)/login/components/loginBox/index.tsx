// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da função de autenticação do NextAuth
import { signIn } from "next-auth/react";

// Importação do hook `useRouter` do Next.js para redirecionamento
import { useRouter } from "next/navigation";

// Importação do hook `useState` do React para gerenciamento de estados
import { useState } from "react";

// Importação de ícones para alternar visibilidade da senha e exibir status de carregamento
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

// Componente da caixa de login
export default function LoginBox() {
  // Estados para gerenciar os valores do formulário e feedback do usuário
  const [user, setUser] = useState(""); // Armazena o nome de usuário
  const [password, setPassword] = useState(""); // Armazena a senha
  const [error, setError] = useState(""); // Armazena mensagens de erro
  const [loading, setLoading] = useState(false); // Indica se a requisição de login está em andamento
  const [showPassword, setShowPassword] = useState(true); // Controla a visibilidade da senha

  // Hook do Next.js para redirecionar o usuário após o login
  const router = useRouter();

  // Classe CSS reutilizável para os campos de entrada
  const inputs = "w-full border border-gray-600 bg-gray-900 p-2 rounded";

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    setLoading(true); // Ativa o estado de carregamento

    // Verifica se os campos estão preenchidos
    if (!user || !password) {
      setError("Please fill in all fields!");
      setLoading(false); // Desativa o estado de carregamento

      // Remove a mensagem de erro após 5 segundos
      setTimeout(() => {
        setError("");
      }, 5000);

      return;
    }

    // Tenta autenticar o usuário usando o NextAuth
    const result = await signIn("credentials", {
      user: user,
      password: password,
      redirect: false, // Evita redirecionamento automático
    });

    // Se houver um erro na autenticação
    if (result?.error) {
      setError(String(result?.error)); // Define a mensagem de erro

      // Remove a mensagem de erro após 5 segundos
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    // Se o login for bem-sucedido, redireciona para a página de administração
    if (result?.ok) {
      router.push("/admin");
    }

    setLoading(false); // Desativa o estado de carregamento
  };

  return (
    // Estrutura da página de login
    <div className="text-white flex flex-col bg-gray-800 p-8 rounded-2xl w-100">
      {/* Título da página */}
      <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>

      {/* Campo de entrada para o nome de usuário */}
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-5">
          <h2 className="mb-1">Username</h2>
          <input
            className={inputs}
            type="text"
            placeholder="Type your username"
            value={user}
            onChange={(e) => setUser(e.target.value)} // Atualiza o estado do nome de usuário
          />
        </div>

        {/* Campo de entrada para a senha */}
        <h2 className="mb-1">Password</h2>
        <div className="w-full flex justify-between items-center mb-5">
          <input
            className={inputs}
            type={showPassword ? "password" : "text"} // Alterna entre "text" e "password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
          {/* Botão para alternar visibilidade da senha */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="text-gray-500 px-2 cursor-pointer"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>

        {/* Botão de login */}
        <button
          className="bg-blue-700 text-white p-2 rounded flex justify-center items-center hover:bg-blue-800 cursor-pointer transition-colors duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            // Exibe um ícone de carregamento se o estado "loading" for verdadeiro
            <FaSpinner className="animate-spin p2" size={24} />
          ) : (
            // Exibe o texto "Login" se o estado "loading" for falso
            "Login"
          )}
        </button>
      </form>
      {/* Exibe a mensagem de erro, se houver */}
      {error && <h2 className="text-red-500 mt-4">{error}</h2>}
    </div>
  );
}
