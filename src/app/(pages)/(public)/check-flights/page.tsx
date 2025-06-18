import { Metadata } from "next";
import CheckFlightsBox from "./components/CheckFlightsBox";
import Image from "next/image";
import ClientSideCounter from "../components/ClientSideCounter";

export const metadata: Metadata = {
  title: "Check Flights",
};

export default async function CheckFlights({
  searchParams,
}: {
  searchParams?: Promise<{ airportId?: string }>;
}) {
  const airportId = (await searchParams)?.airportId;
  const destinationAirportId = airportId ? parseInt(airportId) : undefined;

  return (
     <main
      className="
        relative            
        flex flex-1
        w-full min-h-[60dvh] 
        items-center justify-center
        p-5 bg-center bg-cover bg-no-repeat
      "
    >
      {/* plano de fundo */}
      <Image
        src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/mountain.jpg`}
        alt="Mountain Background"
        quality={100}
        fill
        className="absolute inset-0 -z-10 object-cover"
      />

      {/* conteúdo – agora no fluxo normal, sem absolute */}
      <CheckFlightsBox initialDestinationAirportId={destinationAirportId} />
      <ClientSideCounter type="check flights" />
    </main>
  );
}
