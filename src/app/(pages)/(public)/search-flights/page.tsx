import { Metadata } from "next";
import Calendar from "./components/calendar";

export const metadata: Metadata = {
  title: "Search Flights",
};

export default async function SearchFlights({
  searchParams,
}: {
  searchParams?: Promise<{
    origin?: string;
    destination?: string;
    cabin?: string;
    seats?: string;
  }>;
}) {
  const originAirport = Number((await searchParams)?.origin);
  const destinationAirport = Number((await searchParams)?.destination);
  const cabin = (await searchParams)?.cabin || "";
  const seats = Number((await searchParams)?.seats);

  return (
    <Calendar
      originAirport={originAirport}
      destinationAirport={destinationAirport}
      cabin={cabin}
      seats={seats}
    />
  );
}
