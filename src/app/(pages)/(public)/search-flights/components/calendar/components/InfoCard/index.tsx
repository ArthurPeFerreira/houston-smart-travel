import { AirportType } from "@/lib/airport/types";
import { CabinKey, cabins } from "@/lib/route/cabins";
import { CabinsType } from "@/lib/route/types";
import { CheckCircle, DollarSign, Luggage, Plane } from "lucide-react";

interface InfoCardProps {
  cabinSelected: CabinsType;
  originAirport: AirportType | undefined;
  destinationAirport: AirportType | undefined;
  departureDate: string;
  returnDate: string;
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
  roundedTrip,
  selection,
  setSelection,
}: InfoCardProps) {
  return (
    <>
      {cabinSelected && (
        <div className="flex flex-col gap-4 lg:flex-row justify-center items-center w-full ">
          <div className="w-fit p-4 border rounded-xl shadow-sm bg-white">
            <div className="flex mb-4 items-center justify-center w-full gap-2 text-xl font-semibold text-[#00001e]">
              <CheckCircle className="text-green-600" size={20} />
              Selected Cabin:
              <span className="font-bold">
                {cabins[cabinSelected.key as CabinKey].label}
              </span>
            </div>
            <div className="flex items-center mb-4 w-full justify-center gap-2 text-base">
              <Luggage className="text-blue-600" size={20} />
              <strong>{`Includes 1 carry-on and ${cabinSelected?.bagsAmount} checked (23kg) bag, free of charge.`}</strong>
            </div>
            {originAirport && destinationAirport && (
              <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10 ">
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
            {roundedTrip && (
              <div className="text-black h-fit">
                <div className="flex flex-col gap-2">
                  <div className="mt-4">
                    <div className="grid grid-cols-2">
                      {departureDate ? (
                        <div>
                          <span className="font-semibold">Departure:</span>{" "}
                          {new Date(departureDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
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
                            timeZone: "UTC",
                          })}
                        </div>
                      ) : roundedTrip ? (
                        <span className="text-gray-500 italic">
                          Select your return date
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-4">
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}{" "}
    </>
  );
}
