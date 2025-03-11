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
    <div className="flex h-full items-center justify-center">
      {/* Renderiza o componente de login */}
      <LoginBox />
    </div>
  );
}
