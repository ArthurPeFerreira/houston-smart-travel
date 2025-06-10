import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import { Metadata } from "next";
import { queueHst } from "@/lib/bullmq/bullmq";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {

  await queueHst.add(
      "incrementHomeAccessCount", // Nome da tarefa
      {
        priority: 0, // Define a prioridade da tarefa (0 para alta prioridade)
        delay: 0, // Define o atraso (0 segundos)
        attempts: 3, // Número de tentativas permitidas em caso de falha
        removeOnComplete: true, // Remove a tarefa da fila automaticamente após a conclusão bem-sucedida
        removeOnFail: false, // Mantém a tarefa na fila em caso de falha
        stackTraceLimit: 5, // Limita o número de rastros de pilha mantidos para erros
      }
    );

  return (
    <main className="flex-1 w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center">
      <HeroSection/>
      <Locals/>
      <CTASection/>
    </main>
  );
}


