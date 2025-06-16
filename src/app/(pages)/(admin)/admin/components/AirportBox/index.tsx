/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"; // Indica que este é um componente do lado do cliente no Next.js (App Router)

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useState } from "react";

// Importações para exibição de notificações
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";

// Tipagem dos dados necessários para criar/editar um aeroporto
import { CreateAndEditAirportType } from "@/lib/airport/types";

// Ícone de loading (spinner)
import { FaSpinner } from "react-icons/fa";

// Modal de exibição de aeroportos
import AirportsInfo from "./components/AirportsInfo";

// Emissor de eventos para atualização global
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente principal responsável por cadastrar novos aeroportos
export default function AirportBox() {
  // Classe de estilo para os campos de input
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados para controlar os campos do formulário
  const [city, setCity] = useState<string>(""); // Cidade do aeroporto
  const [airportCode, setAirportCode] = useState<string>(""); // Código do aeroporto
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento durante envio
  const [showAirportsInfoModal, setShowAirportsInfoModal] =
    useState<boolean>(false); // Visibilidade do modal de listagem de aeroportos

  // Função responsável por criar um novo aeroporto
  async function handleCreateAirport() {
    try {
      setLoading(true); // Inicia o carregamento

      // Monta o corpo da requisição
      const data: CreateAndEditAirportType = { city, airportCode };

      // Chamada à API para criar o aeroporto
      await api.post("api/admin/airport", data);

      // Exibe mensagem de sucesso
      toast.success("Airport created successfully.", toastConfigs);
    } catch (error: any) {
      // Exibe mensagem de erro personalizada
      const errorMessage =
        error?.response?.data?.error || "Failed to create airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      // Limpa os campos, encerra carregamento e emite evento de atualização
      setCity("");
      setAirportCode("");
      setLoading(false);
      eventEmitter.emit("updateAirports");
    }
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      {/* Container principal do formulário */}
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        <h1 className="text-center font-bold text-3xl">Create New Airport</h1>

        {/* Formulário de criação de aeroporto */}
        <form
          className="w-full mt-4"
          onSubmit={async (e) => {
            e.preventDefault(); // Evita recarregamento da página
            await handleCreateAirport(); // Executa função de criação
          }}
        >
          {/* Campo: Cidade */}
          <label className="block mb-1 text-white">City</label>
          <input
            id="airport city"
            type="text"
            value={city}
            placeholder="Type airport city"
            onChange={(e) => setCity(e.target.value)}
            className={inputs}
            required
          />

          {/* Campo: Código do aeroporto */}
          <label className="block mb-1 text-white mt-4">Airport Code</label>
          <input
            id="aiport code"
            type="text"
            value={airportCode}
            placeholder="Type airport code"
            onChange={(e) => setAirportCode(e.target.value)}
            className={inputs}
            required
          />

          {/* Botão de envio ou spinner de carregamento */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 w-full flex items-center justify-center text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={24} />
            ) : (
              "Create"
            )}
          </button>
        </form>

        {/* Link para abrir o modal de listagem de aeroportos */}
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowAirportsInfoModal(true);
          }}
        >
          See Airports
        </button>
      </div>

      {/* Modal de visualização de aeroportos cadastrados */}
      <AirportsInfo
        isOpen={showAirportsInfoModal}
        setIsOpen={setShowAirportsInfoModal}
      />
    </div>
  );
}
