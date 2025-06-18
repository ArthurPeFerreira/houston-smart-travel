import { format } from "date-fns";
import { phone } from "@/lib/systemInfo/contacts";
import { AirportType } from "@/lib/airport/types";
import { CabinsType } from "@/lib/route/types";
import { CabinKey, cabins } from "@/lib/route/cabins";

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "EEE, MMM dd, yyyy");
}

export function sendWhatsappMessage({
  departureDate,
  returnDate,
  roundedTrip,
  originAirport,
  destinationAirport,
  cabinSelected,
  seats,
}: {
  departureDate: string;
  returnDate?: string;
  roundedTrip: boolean;
  originAirport: AirportType;
  destinationAirport: AirportType;
  cabinSelected: CabinsType;
  seats: number;
}) {
  const baseURL = "https://wa.me/";
  const formattedDeparture = formatDate(departureDate);
  const formattedReturn = returnDate ? formatDate(returnDate) : "";

  const oneWayPrice = cabinSelected.passagePriceFromAirport1To2;
  const returnPrice = cabinSelected.passagePriceFromAirport2To1;
  const roundTripPrice = cabinSelected.passagePriceRoundTrip;

  const message = roundedTrip
    ? `Hello! I'd like to book these round trip.\n\n` +
      `Class: ${cabins[cabinSelected.key as CabinKey].label}, ` +
      `Checked bags: ${cabinSelected.bagsAmount}, ` +
      `Seats: ${seats}\n\n` +
      `Departure: ${formattedDeparture} (${originAirport.airportCode} → ${destinationAirport.airportCode}), ` +
      `Price: $${Number(oneWayPrice).toFixed(2)}\n\n` +
      `Return: ${formattedReturn} (${destinationAirport.airportCode} → ${originAirport.airportCode}), ` +
      `Price: $${Number(returnPrice).toFixed(2)}\n\n` +
      `Total round trip: $${Number(roundTripPrice).toFixed(2)}`
    : `Hello! I'd like to book this one-way trip.\n\n` +
      `Class: ${cabins[cabinSelected.key as CabinKey].label}, ` +
      `Checked bags: ${cabinSelected.bagsAmount}, ` +
      `Seats: ${seats}\n\n` +
      `Departure: ${formattedDeparture} (${originAirport.airportCode} → ${destinationAirport.airportCode}), ` +
      `Price: $${Number(oneWayPrice).toFixed(2)}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `${baseURL}${phone}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}