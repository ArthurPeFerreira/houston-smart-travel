import { Metadata } from "next";
import CheckFlightsBox from "./components/CheckFlightsBox";
import Image from "next/image";

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

  return (
    <main className="relative flex-1 w-full min-h-[60vh] md:min-h-fit flex items-center justify-center bg-no-repeat bg-cover bg-center p-5">
      <Image
        src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/mountain.jpg`}
        quality={100}
        fill
        alt="Beach Background"
        className="absolute inset-0"
      />
      <div className="absolute inset-0">
        <CheckFlightsBox initialDestinationAirportId={destinationAirportId} />
      </div>
    </main>
  );
}
