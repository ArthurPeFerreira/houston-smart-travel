import { Metadata } from "next";
import CheckFlightsBox from "./components/CheckFlightsBox";
import Image from "next/image";
import { queueHst } from "@/lib/bullmq/bullmq";

export const metadata: Metadata = {
  title: "Check Flights",
};

export default async function CheckFlights({
  searchParams,
}: {
  searchParams?: Promise<{ airportId?: string }>;
}) {
  const airportId = (await searchParams)?.airportId;
  const destinationAirportId = airportId ? parseInt(airportId) : 0;

  await queueHst.add(
        "incrementCheckFlightsAccessCount", // Nome da tarefa
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
    <main className="relative flex-1 w-full min-h-[60vh] md:min-h-fit flex items-center justify-center bg-no-repeat bg-cover bg-center p-5">
      <Image
        src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/mountain.jpg`}
        quality={100}
        fill
        alt="Montain Background"
        className="absolute inset-0"
      />
      <div className="absolute inset-0">
        <CheckFlightsBox initialDestinationAirportId={destinationAirportId} />
      </div>
    </main>
  );
}
