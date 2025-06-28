
export const dynamic = "force-dynamic";

// Importação do tipo Metadata do Next.js para definir metadados da página
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import AcessCounterBox from "./components/acessCounter";
import { SeatsTaskStatus } from "./components/SeatsTaskStatus";

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
export default async function Statistics() {
  const globalKey = "__hst_task_scheduled__";
  const isScheduled = Boolean((globalThis as any)[globalKey]);

  return (
    // O elemento <div> com uma classe Tailwind para definir o fundo escuro
    <div className="flex flex-col items-center justify-center">
      {/* Componente Navbar exibido na página */}
      <Navbar />

      <main className="flex flex-col gap-4 p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <AcessCounterBox type="home" />
          <AcessCounterBox type="check flights" />
        </div>

        <SeatsTaskStatus isScheduled={isScheduled} />
      </main>
    </div>
  );
}
