"use client"; // Indica que este é um componente do lado do cliente no Next.js (App Router)

// Componente React para exibição de informações de cabines em um modal
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AirportType } from "@/lib/airport/types";
import { CabinKey, cabins } from "@/lib/route/cabins";
import { MdFlight } from "react-icons/md";
import { CabinsType } from "@/lib/route/types";

// Tipagem das propriedades esperadas pelo componente
interface SeeCabinsProps {
  isOpen: boolean; // Define se o modal está aberto
  setIsOpen: (open: boolean) => void; // Função para alterar o estado do modal
  airport1: AirportType; // Aeroporto de origem
  airport2: AirportType; // Aeroporto de destino
  cabinsToShow: CabinsType[]; // Lista de cabines a serem exibidas
}

// Componente principal que renderiza o modal com os detalhes das cabines
export default function SeeCabins({
  isOpen,
  setIsOpen,
  airport1,
  airport2,
  cabinsToShow,
}: SeeCabinsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 sm:w-full max-w-fit border-none text-white h-auto max-h-fit "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Cabins
          </DialogTitle>
        </DialogHeader>

        {/* Grid de exibição das cabines com rolagem se necessário */}
        <div
          className={`overflow-y-auto max-h-[400px] md:max-h-fit grid gap-2 grid-cols-1 ${
            cabinsToShow.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {/* Mapeia cada cabine e exibe suas informações */}
          {cabinsToShow.map((cabin) => (
            <div key={cabin.id} className="p-4 bg-gray-700 rounded w-full">
              {/* Exibe o nome da cabine com base na chave definida em cabins */}
              <div className="bg-gray-800 p-2 rounded mb-2">
                {String(cabins[cabin.key as CabinKey].label)}
              </div>

              {/* Detalhes técnicos e financeiros da cabine */}
              <div className="bg-gray-800 p-2 rounded flex flex-col gap-2">
                <div>Maximum Points: {cabin.maximumPoints}</div>
                <div>Bags Amount: {cabin.bagsAmount}</div>

                <div className="flex flex-row gap-1 items-center">
                  {airport1.airportCode}
                  <MdFlight className="rotate-90" size={20} />
                  {airport2.airportCode}
                  <div>Sale Price (USD)</div>: $
                  {Number(cabin.passagePriceFromAirport1To2).toFixed(2)}
                </div>
                <div className="flex flex-row gap-1 items-center">
                  {airport2.airportCode}
                  <MdFlight className="rotate-90" size={20} />
                  {airport1.airportCode}
                  <div>Sale Price (USD)</div>: $
                  {Number(cabin.passagePriceFromAirport2To1).toFixed(2)}
                </div>
                <div className="flex flex-row gap-1 items-center">
                  Rounded Trip Sale Price (USD): $
                  {Number(cabin.passagePriceRoundTrip).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão para fechar o modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}