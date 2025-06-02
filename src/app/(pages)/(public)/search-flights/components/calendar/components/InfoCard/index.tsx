import { AirportType } from "@/lib/airport/types";
import { CabinKey, cabins } from "@/lib/route/cabins";
import { CabinsType } from "@/lib/route/types";
import { CheckCircle, DollarSign, Luggage, Plane } from "lucide-react";

import { format } from "date-fns";
import { phone } from "@/lib/systemInfo/contacts";

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "EEE, MMM dd, yyyy");
}

function handleSendWhatsApp({
  departureDate,
  returnDate,
  roundedTrip,
  originAirport,
  destinationAirport,
  cabinSelected,
  cabin,
  seats,
}: {
  departureDate: string;
  returnDate?: string;
  roundedTrip: boolean;
  originAirport: AirportType;
  destinationAirport: AirportType;
  cabinSelected: CabinsType;
  cabin: CabinKey;
  seats: number;
}) {
  const baseURL = "https://wa.me/";
  const formattedDeparture = formatDate(departureDate);
  const formattedReturn = returnDate ? formatDate(returnDate) : "";

  const oneWayPrice = cabinSelected.passagePriceFromAirport1To2;
  const returnPrice = cabinSelected.passagePriceFromAirport2To1;
  const roundTripPrice = cabinSelected.passagePriceRoundTrip;

  const message = roundedTrip
    ? `Hello! I'd like to book a round trip.\n\n` +
      `Class: ${cabins[cabin].label}, ` +
      `Checked bags: ${cabinSelected.bagsAmount}, ` +
      `Seats: ${seats}\n\n` +
      `Departure: ${formattedDeparture} (${originAirport.airportCode} → ${destinationAirport.airportCode}), ` +
      `Price: $${Number(oneWayPrice).toFixed(2)}\n\n` +
      `Return: ${formattedReturn} (${destinationAirport.airportCode} → ${originAirport.airportCode}), ` +
      `Price: $${Number(returnPrice).toFixed(2)}\n\n` +
      `Total round trip: $${Number(roundTripPrice).toFixed(2)}`
    : `Hello! I'd like to book a one-way trip.\n\n` +
      `Class: ${cabins[cabin].label}, ` +
      `Checked bags: ${cabinSelected.bagsAmount}, ` +
      `Seats: ${seats}\n\n` +
      `Departure: ${formattedDeparture} (${originAirport.airportCode} → ${destinationAirport.airportCode}), ` +
      `Price: $${Number(oneWayPrice).toFixed(2)}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `${baseURL}${phone}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

interface InfoCardProps {
  cabinSelected: CabinsType;
  originAirport: AirportType | undefined;
  destinationAirport: AirportType | undefined;
  departureDate: string;
  returnDate: string;
  cabin: CabinKey;
  roundedTrip: boolean;
  selection: "departure" | "return";
  setSelection: (selection: "departure" | "return") => void;
  seats: number;
}

export default function InfoCard({
  cabinSelected,
  originAirport,
  destinationAirport,
  departureDate,
  returnDate,
  cabin,
  roundedTrip,
  selection,
  setSelection,
  seats,
}: InfoCardProps) {
  return (
    <>
      {cabinSelected && (
        <div className="flex flex-col-reverse gap-4 lg:flex-row justify-center items-center w-full ">
          <div className="w-fit p-4 border rounded-xl shadow-sm bg-white space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold text-[#00001e]">
              <CheckCircle className="text-green-600" size={20} />
              Selected Cabin:
              <span className="font-bold">
                {cabins[cabin as CabinKey].label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-base">
              <Luggage className="text-blue-600" size={20} />
              <strong>{`Includes ${cabinSelected?.bagsAmount} checked bag(s) free of charge.`}</strong>
            </div>
            {originAirport && destinationAirport && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Plane className="text-indigo-600" size={20} />
                  <span>
                    <strong>{originAirport.airportCode}</strong> →{" "}
                    <strong>{destinationAirport.airportCode}</strong>: $
                    {Number(
                      cabinSelected.passagePriceFromAirport1To2
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Plane className="rotate-180 text-indigo-600" size={20} />
                  <span>
                    <strong>{destinationAirport.airportCode}</strong> →{" "}
                    <strong>{originAirport.airportCode}</strong>: $
                    {Number(
                      cabinSelected.passagePriceFromAirport2To1
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                  <DollarSign className="text-green-600" size={20} />
                  Round trip:{" "}
                  <strong className="ml-1 text-green-700">
                    $
                    {Number(cabinSelected.passagePriceRoundTrip).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </strong>
                </div>
              </div>
            )}
            <div className="text-black">
              <div className="flex flex-col gap-2">
                {departureDate ? (
                  <div>
                    <span className="font-semibold">Departure:</span>{" "}
                    {new Date(departureDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">
                    Select your departure date
                  </span>
                )}
                {returnDate ? (
                  <div>
                    <span className="font-semibold">Return:</span>{" "}
                    {new Date(returnDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                ) : roundedTrip ? (
                  <span className="text-gray-500 italic">
                    Select your return date
                  </span>
                ) : (
                  <></>
                )}
                {roundedTrip && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => setSelection("departure")}
                      className={`px-4 py-2 rounded-md border transition-all duration-200 ${
                        selection === "departure"
                          ? "bg-blue-600 text-white border-blue-600 shadow cursor-default"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      Departure
                    </button>
                    <button
                      onClick={() => setSelection("return")}
                      className={`px-4 py-2 rounded-md border transition-all duration-200 ${
                        selection === "return"
                          ? "bg-blue-600 text-white border-blue-600 shadow cursor-default"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      Return
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-3">
                {departureDate &&
                  (!roundedTrip || (roundedTrip && returnDate)) &&
                  originAirport &&
                  destinationAirport && (
                    <button
                      onClick={() =>
                        handleSendWhatsApp({
                          departureDate,
                          returnDate,
                          roundedTrip,
                          originAirport,
                          destinationAirport,
                          cabinSelected,
                          cabin,
                          seats, // ou passe o valor dinâmico correto aqui
                        })
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition"
                    >
                      Send via WhatsApp
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
