"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { api } from "@/lib/api/api";
import { AirportType } from "@/lib/airport/types";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";

interface AirportsEditProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  airportToEdit?: AirportType;
}

// Classe de estilo para os inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

export default function AirportsEdit({ isOpen, setIsOpen, airportToEdit }: AirportsEditProps)   {
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento do modal
  const [airportId, setAirportId] = useState<number>(0); 
  const [airportCity, setAirportCity] = useState<string>(""); 
  const [airportCode, setAirportCode] = useState<string>("");

  // useEffect para carregar os aeroportos ao montar o componente
  useEffect(() => {
    if (airportToEdit) {
      setAirportId(airportToEdit.id);
      setAirportCity(airportToEdit.city);
      setAirportCode(airportToEdit.airportCode);
    }
  }, [airportToEdit]);

  // Função para editar um aeroporto existente
  async function handleEditAirport(data: AirportType) {
    try {
      setLoading(true);
      await api.put(`api/admin/airport/${data.id}`, {
        city: data.city,
        airportCode: data.airportCode,
      });
  
      toast.success("Airport edited successfully.", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to edit airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      setLoading(false);
      eventEmitter.emit("updateAirports");
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 sm:w-100 max-w-md border-none text-white h-auto "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Airport
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditAirport({
              id: airportId,
              city: airportCity,
              airportCode: airportCode,
            })
          }}
          className=" rounded shadow-lg w-full max-w-sm"
        >
          {/* Campo de cidade */}
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1 text-white">
              City
            </label>
            <input
              id="city"
              type="text"
              value={airportCity}
              placeholder="Type city"
              onChange={(e) => setAirportCity(e.target.value)}
              className={inputs}
              required
            />
          </div>

          {/* Campo de código do aeroporto */}
          <div className="mb-4">
            <label htmlFor="airportCode" className="block mb-1 text-white">
              Airport Code
            </label>
            <input
              id="airportCode"
              type="text"
              value={airportCode}
              placeholder="Type name"
              onChange={(e) => setAirportCode(e.target.value)}
              className={inputs}
              required
            />
          </div>

          {/* Botões de ação */}
          <div className="flex w-full ">
            {/* Botão de cancelar edição */}

            {/* Botão de salvar com loading spinner quando a ação está em andamento */}
            {loading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center"
              >
                Save
              </button>
            )}
          </div>
        </form>

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
