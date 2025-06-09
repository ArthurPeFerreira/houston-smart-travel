// Importação do tipo Metadata do Next.js para definir metadados da página
import { Metadata } from "next";

// Importação do componente LoginBox, que contém o formulário de login
import LoginBox from "./components/loginBox";

// Definição dos metadados da página, configurando o título como "Login"
export const metadata: Metadata = {
  title: "Login",
};

// Componente principal da página de login
export default function Login() {
  return (
    // Estrutura da página de login
    <main className="flex-1 flex flex-col items-center justify-center min-h-fit overflow-x-hidden overflow-y-hidden">

      {/* Renderiza o componente de login */}
      <LoginBox />

    </main>
  );
}
