/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"; // Indica que este componente roda no cliente (Next.js App Router)

import React, { useEffect, useState } from "react";

// Importa componentes de modal reutilizáveis
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Ícones para ações visuais
import { FaPen, FaSpinner, FaTrash } from "react-icons/fa";

// Instância configurada da API
import { api } from "@/lib/api/api";

// Tipagem dos dados do aeroporto
import { AirportType } from "@/lib/airport/types";

// Configurações para notificações
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";

// Emissor de eventos globais
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente de edição de aeroportos
import AirportsEdit from "../AirportEdit";

// Tipagem das props esperadas pelo modal de informações
interface AirportsInfoProps {
  isOpen: boolean; // Define se o modal está visível
  setIsOpen: (open: boolean) => void; // Função para alterar visibilidade do modal
}

// Componente que exibe e gerencia a lista de aeroportos
export default function AirportsInfo({ isOpen, setIsOpen }: AirportsInfoProps) {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento dos dados
  const [airports, setAirports] = useState<AirportType[]>([]); // Lista de aeroportos disponíveis
  const [showAirportsEditModal, setShowAirportsEditModal] = useState<boolean>(false); // Controle de visibilidade do modal de edição
  const [airportToEdit, setAirportToEdit] = useState<AirportType>(); // Armazena o aeroporto que será editado

  // Função que busca os aeroportos do backend
  async function fetchInitialData() {
    try {
      const response = await api.get("api/admin/airport");
      setAirports(response.data); // Atualiza estado com os dados recebidos
    } catch {
      toast.error("Failed to get airports.", toastConfigs);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  }

  // useEffect que executa ao montar o componente
  useEffect(() => {
    fetchInitialData(); // Carrega os aeroportos ao iniciar

    // Registra escuta do evento para atualizar dados ao editar/deletar
    eventEmitter.on("updateAirports", fetchInitialData);
    return () => {
      eventEmitter.off("updateAirports", fetchInitialData); // Limpa evento ao desmontar
    };
  }, []);

  // Função para deletar um aeroporto específico
  async function handleDeleteAirport(airportId: number) {
    try {
      if (confirm("Are you sure you want to delete this airport?")) {
        await api.delete(`api/admin/airport/${airportId}`);

        // Exibe mensagem de sucesso e remove localmente da lista
        toast.success("Airport deleted successfully.", toastConfigs);
        setAirports(airports.filter((airport) => airport.id !== airportId));
      }
    } catch (error: any) {
      // Mensagem de erro personalizada
      const errorMessage =
        error?.response?.data?.error || "Failed to delete airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      // Atualiza os componentes relacionados
      eventEmitter.emit("updateAirports");
      eventEmitter.emit("updateLocalsModal");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 sm:w-full max-w-md border-none text-white h-auto max-h-11/12"
      >
        {/* Cabeçalho do modal */}
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Airports
          </DialogTitle>
        </DialogHeader>

        {/* Corpo principal do modal */}
        <div className="h-auto max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Caso esteja carregando os dados */}
          {loading ? (
            <div className="text-white w-full flex items-center justify-center px-4 py-2 rounded">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          ) : airports && airports.length > 0 ? (
            <div className="flex flex-col gap-1">
              {/* Itera sobre os aeroportos e exibe cada um com ações */}
              {airports.map((airport) => (
                <div
                  className="bg-gray-700 rounded-lg p-2 flex flex-row justify-between items-center"
                  key={airport.id}
                >
                  {/* Informações do aeroporto */}
                  <div className="flex flex-col">
                    <label className="font-semibold">{airport.city}</label>
                    <label className="text-sm text-gray-400">
                      {airport.airportCode}
                    </label>
                  </div>

                  {/* Ações: editar e deletar */}
                  <div className="flex flex-row gap-4">
                    {/* Botão de edição */}
                    <button
                      onClick={() => {
                        setAirportToEdit(airport); // Define aeroporto atual
                        setShowAirportsEditModal(true); // Abre modal de edição
                      }}
                      className="text-yellow-600 cursor-pointer"
                    >
                      <FaPen size={24} />
                    </button>

                    {/* Botão de exclusão */}
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
            // Caso não haja aeroportos cadastrados
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

      {/* Modal de edição, aberto quando o botão de edição é acionado */}
      <AirportsEdit
        isOpen={showAirportsEditModal}
        setIsOpen={setShowAirportsEditModal}
        airportToEdit={airportToEdit}
      />
    </Dialog>
  );
}
