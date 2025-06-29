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
import { FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
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
  resetDepatureDate: () => void;
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
  resetDepatureDate,
}: OneWayTripModalProps) {
  const handleSelection = (isRoundTrip: boolean) => {
    onSelect(isRoundTrip);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-white text-[#00001e] rounded-md w-11/12 
                  max-w-md sm:w-full sm:max-w-lg mx-auto h-fit 
                  max-h-fit border-none shadow-lg p-6"
      >
        <DialogHeader className="mb-2">
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
            <strong>{`Includes ${cabinSelected?.bagsAmount} checked (23kg) bag.`}</strong>
          </div>

          <div className="flex items-center w-full justify-center gap-2">
            <BsFillSuitcase2Fill className="text-blue-600" size={20} />
            <strong>{`Includes 1 carry-on bag.`}</strong>
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

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelection(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer flex flex-row justify-center items-center gap-1"
          >
            <FaCalendarAlt />
            Yes, make it round-trip
          </button>
          <button
            onClick={() => {
              resetDepatureDate();
              handleSelection(false);
            }}
            className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer flex flex-row justify-center items-center gap-1"
          >
            <RiArrowGoBackFill />
            One-way only, choose another date
          </button>
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
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white font-medium transition cursor-pointer flex flex-row justify-center items-center gap-1"
          >
            <FaWhatsapp />
            One-way only, proceed on WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
