"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CabinsType } from "@/lib/route/types";
import { AirportType } from "@/lib/airport/types";
import { CheckCircle, Luggage, Plane } from "lucide-react";
import { CabinKey, cabins } from "@/lib/route/cabins";
import { FaWhatsapp } from "react-icons/fa";
import { sendWhatsappMessage } from "../sendWhatsappMessage";

interface OneWayTripModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (isRoundTrip: boolean) => void;
  cabinSelected: CabinsType;
  originAirport: AirportType | undefined;
  destinationAirport: AirportType | undefined;
  departureDate: string;
  seats: number;
}

export default function OneWayTripModal({
  isOpen,
  setIsOpen,
  onSelect,
  cabinSelected,
  departureDate,
  destinationAirport,
  originAirport,
  seats,
}: OneWayTripModalProps) {
  const handleSelection = (isRoundTrip: boolean) => {
    onSelect(isRoundTrip);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        // showCloseButton={false}
        className="bg-white text-[#00001e] rounded-md w-10/12 h-fit border-none shadow-lg p-6"
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Is this a round-trip?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col text-md sm:text-lg md:text-xl gap-4">
          <div className="flex items-center justify-center w-full gap-2 font-semibold text-[#00001e]">
            <CheckCircle className="text-green-600" size={20} />
            Selected Cabin:
            <span className="font-bold">
              {cabins[cabinSelected.key as CabinKey].label}
            </span>
          </div>

          <div className="flex items-center w-full justify-center gap-2">
            <Luggage className="text-blue-600" size={20} />
            <strong>{`Includes 1 carry-on and ${cabinSelected?.bagsAmount} checked (23kg) bag, free of charge.`}</strong>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Plane className="text-indigo-600" size={20} />
            <strong>One-way price:</strong>
            <span>
              <strong>{originAirport?.airportCode}</strong> →{" "}
              <strong>{destinationAirport?.airportCode}</strong>: $
              {Number(cabinSelected.passagePriceFromAirport1To2).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <span className="font-semibold">Departure:</span>{" "}
            {new Date(departureDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => {
              if (originAirport && destinationAirport) {
                handleSelection(false);
                sendWhatsappMessage({
                  cabinSelected,
                  departureDate,
                  destinationAirport,
                  originAirport,
                  roundedTrip: false,
                  seats: seats,
                  returnDate: "",
                });
              } else {
                alert("Please select both origin and destination airports.");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer flex flex-row justify-center items-center gap-1"
          >
            <FaWhatsapp />
            One-way only, proceed on WhatsApp
          </button>
          <button
            onClick={() => handleSelection(true)}
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer"
          >
            Yes, add return flight
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
