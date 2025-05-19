// Importação do tipo Metadata do Next.js para definir metadados da página
import { Metadata } from "next";

// Importação do componente Navbar, que provavelmente representa a barra de navegação
import Navbar from "./components/Navbar";

// Importação do componente UserTable, que provavelmente exibe uma tabela de usuários
import UserTable from "./components/UserTable";
import AirportBox from "./components/AirportBox";
import LocalBox from "./components/LocalBox";
import RouteBox from "./components/RouteBox";

// Definição dos metadados da página, configurando o título como "Admin Panel"
export const metadata: Metadata = {
  title: "Admin Panel",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,      
    shortcut: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
    apple: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
  },
};

// Componente principal da página de administração
export default async function Admin() {

  return (
    // O elemento <div> com uma classe Tailwind para definir o fundo escuro
    <div className="flex flex-col items-center justify-center">
      {/* Componente Navbar exibido na página */}
      <Navbar />

      <div className="w-11/12 grid grid-cols-1 items-center justify-center gap-4 lg:flex lg:flex-row">
        {/* Componente AirportBox exibido na página */}
        <AirportBox />

        {/* Componente LocalBox exibido na página */}
        <LocalBox />

        {/* Componente RouteBox exibido na página */}
        <RouteBox />
      </div>

      {/* Componente UserTable exibido na página */}
      <div className="w-11/12">
        <UserTable />
      </div>
    </div>
  );
}
