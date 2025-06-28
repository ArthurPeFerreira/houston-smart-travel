

"use client"; // Indica que este componente roda no cliente (Next.js App Router)

import React, { useEffect, useState } from "react";

// Importa os componentes de diálogo personalizados
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Ícone de loading animado
import { FaSpinner } from "react-icons/fa";

// Instância da API configurada
import { api } from "@/lib/api/api";

// Tipagem do aeroporto
import { AirportType } from "@/lib/airport/types";

// Notificações (toast) personalizadas
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";

// Emissor de eventos globais para comunicação entre componentes
import eventEmitter from "@/lib/event/eventEmmiter";

// Tipagem das props recebidas pelo componente
interface AirportsEditProps {
  isOpen: boolean; // Define se o modal está aberto
  setIsOpen: (open: boolean) => void; // Função para abrir/fechar modal
  airportToEdit?: AirportType; // Objeto do aeroporto que será editado
}

// Classe de estilo aplicada aos inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

// Componente principal de edição de aeroportos
export default function AirportsEdit({
  isOpen,
  setIsOpen,
  airportToEdit,
}: AirportsEditProps) {
  // Estados para controle do formulário
  const [loading, setLoading] = useState<boolean>(false); // Indica se o envio está em andamento
  const [airportId, setAirportId] = useState<number>(0); // ID do aeroporto
  const [airportCity, setAirportCity] = useState<string>(""); // Cidade
  const [airportCode, setAirportCode] = useState<string>(""); // Código do aeroporto (ex: GRU)

  // Quando um aeroporto é selecionado para edição, preenche os campos com seus dados
  useEffect(() => {
    if (airportToEdit) {
      setAirportId(airportToEdit.id);
      setAirportCity(airportToEdit.city);
      setAirportCode(airportToEdit.airportCode);
    }
  }, [airportToEdit]);

  // Função responsável por enviar os dados editados para o backend
  async function handleEditAirport(data: AirportType) {
    try {
      setLoading(true); // Ativa o estado de carregamento

      // Chamada PUT para editar o aeroporto
      await api.put(`api/admin/airport/${data.id}`, {
        city: data.city,
        airportCode: data.airportCode,
      });

      // Exibe mensagem de sucesso
      toast.success("Airport edited successfully.", toastConfigs);
    } catch (error: any) {
      // Em caso de erro, exibe mensagem personalizada
      const errorMessage =
        error?.response?.data?.error || "Failed to edit airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      // Finaliza carregamento e fecha o modal após delay
      setLoading(false);

      // Emite eventos para atualizar listas e componentes relacionados
      eventEmitter.emit("updateAirports");
      eventEmitter.emit("updateLocalsModal");

      // Fecha o modal após 1 segundo
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 sm:w-100 max-w-md border-none text-white h-auto"
      >
        {/* Cabeçalho do modal */}
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Airport
          </DialogTitle>
        </DialogHeader>

        {/* Formulário de edição */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Previne recarregamento da página
            handleEditAirport({
              id: airportId,
              city: airportCity,
              airportCode: airportCode,
            });
          }}
          className="rounded shadow-lg w-full max-w-sm"
        >
          {/* Campo: Cidade */}
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

          {/* Campo: Código do aeroporto */}
          <div className="mb-4">
            <label htmlFor="airportCode" className="block mb-1 text-white">
              Airport Code
            </label>
            <input
              id="airportCode"
              type="text"
              value={airportCode}
              placeholder="Type code"
              onChange={(e) => setAirportCode(e.target.value)}
              className={inputs}
              required
            />
          </div>

          {/* Botão de envio ou indicador de carregamento */}
          <div className="flex w-full">
            {loading ? (
              // Ícone animado durante o carregamento
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              // Botão de salvar
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center"
              >
                Save
              </button>
            )}
          </div>
        </form>

        {/* Botão para fechar o modal manualmente */}
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
