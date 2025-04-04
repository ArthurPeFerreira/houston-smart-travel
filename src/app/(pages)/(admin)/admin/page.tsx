// Importação do tipo Metadata do Next.js para definir metadados da página
import { Metadata } from "next";

// Importação do componente Navbar, que provavelmente representa a barra de navegação
import Navbar from "./components/Navbar";

// Importação do componente UserTable, que provavelmente exibe uma tabela de usuários
import UserTable from "./components/UserTable";
import AirportBox from "./components/AirportBox";
import LocalBox from "./components/LocalBox";
import RouteBox from "./components/RouteBox";
import { getAirportByCache } from "@/lib/airport/cacheAirport";
import { getLocalByCache } from "@/lib/local/cacheLocal";

// Definição dos metadados da página, configurando o título como "Admin Panel"
export const metadata: Metadata = {
  title: "Admin Panel",
};

// Componente principal da página de administração
export default async function Admin() {
  // Puxa os Aeroportos
  const airports = await getAirportByCache(0);
  const locals = await getLocalByCache(0);

  return (
    // O elemento <div> com uma classe Tailwind para definir o fundo escuro
    <div className="flex flex-col items-center justify-center">
      {/* Componente Navbar exibido na página */}
      <Navbar />

      <div className="w-11/12 grid grid-cols-1 items-center justify-center gap-4 lg:flex lg:flex-row">
        <div>
          {/* Componente AirportBox exibido na página */}
          <AirportBox airportsInitialData={airports} />

          {/* Componente LocalBox exibido na página */}
          <LocalBox airportsInitialData={airports} localsInitialData={locals} />
        </div>

        {/* Componente RouteBox exibido na página */}
        <RouteBox airportsInitialData={airports} />
      </div>

      {/* Componente UserTable exibido na página */}
      <div className="w-11/12">
        <UserTable />
      </div>
    </div>
  );
}
