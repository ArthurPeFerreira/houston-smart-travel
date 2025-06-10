/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPen, FaSpinner, FaTrash } from "react-icons/fa";
import { api } from "@/lib/api/api";
import { AirportType } from "@/lib/airport/types";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";
import AirportsEdit from "../AirportEdit";

interface AirportsInfoProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AirportsInfo({ isOpen, setIsOpen }: AirportsInfoProps) {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento do modal
  const [airports, setAirports] = useState<AirportType[]>([]); // Armazena a lista de aeroportos
  const [showAirportsEditModal, setShowAirportsEditModal] =
    useState<boolean>(false); // Controla a visibilidade do modal de informações
  const [airportToEdit, setAirportToEdit] = useState<AirportType>();

  async function fetchInitialData() {
    try {
      const response = await api.get("api/admin/airport");
      setAirports(response.data);
    } catch {
      toast.error("Failed to get airports.", toastConfigs);
    } finally {
      setLoading(false);
    }
  }

  // useEffect para carregar os aeroportos ao montar o componente
  useEffect(() => {
    fetchInitialData();

    // Registra o evento e faz cleanup ao desmontar o componente
    eventEmitter.on("updateAirports", fetchInitialData);
    return () => {
      eventEmitter.off("updateAirports", fetchInitialData);
    };
  }, []);

  // Função para deletar um aeroporto
  async function handleDeleteAirport(airportId: number) {
    try {
      if (confirm("Are you sure you want to delete this airport?")) {
        await api.delete(`api/admin/airport/${airportId}`);

        toast.success("Airport deleted successfully.", toastConfigs);
        setAirports(airports.filter((airport) => airport.id !== airportId));
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to delete airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      eventEmitter.emit("updateAirports");
      eventEmitter.emit("updateLocalsModal");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 sm:w-full max-w-md border-none text-white h-auto max-h-11/12 "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Airports
          </DialogTitle>
        </DialogHeader>

        {/* Modal principal */}

        {/* Container de lista de aeroportos com rolagem */}
        <div className="h-auto max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Exibição do carregamento */}
          {loading ? (
            <div className="text-white w-full flex items-center justify-center px-4 py-2 rounded">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          ) : airports && airports.length > 0 ? (
            <div className="flex flex-col gap-1">
              {/* Mapeamento dos aeroportos para exibição */}
              {airports.map((airport) => (
                <div
                  className="bg-gray-700 rounded-lg p-2 flex flex-row justify-between items-center"
                  key={airport.id}
                >
                  {/* Exibição das informações do aeroporto */}
                  <div className="flex flex-col">
                    <label className="font-semibold">{airport.city}</label>
                    <label className="text-sm text-gray-400">
                      {airport.airportCode}
                    </label>
                  </div>
                  {/* Botões de ação (editar e excluir) */}
                  <div className="flex flex-row gap-4">
                    <button
                      onClick={() => {
                        setAirportToEdit(airport);
                        setShowAirportsEditModal(true);
                      }}
                      className="text-yellow-600 cursor-pointer"
                    >
                      <FaPen size={24} />
                    </button>
                    <button
                      onClick={() => handleDeleteAirport(airport.id)}
                      className="text-red-600 cursor-pointer"
                    >
                      <FaTrash size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Mensagem caso não existam aeroportos cadastrados
            <div className="flex items-center justify-center">
              No Airports Found
            </div>
          )}
        </div>

        {/* Botão para fechar o modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
      <AirportsEdit
        isOpen={showAirportsEditModal}
        setIsOpen={setShowAirportsEditModal}
        airportToEdit={airportToEdit}
      />
    </Dialog>
  );
}
