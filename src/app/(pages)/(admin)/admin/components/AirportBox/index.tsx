/* eslint-disable @typescript-eslint/no-explicit-any */
// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useState } from "react";

// Importação do Toastify para notificações
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";
import { CreateAndEditAirportType } from "@/lib/airport/types";
import { FaSpinner } from "react-icons/fa";
import AirportsInfo from "./components/AirportsInfo";
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente principal que gerencia aeroportos
export default function AirportBox() {
  // Classe para estilização de inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados do componente
  const [city, setCity] = useState<string>(""); // Armazena a cidade do aeroporto
  const [airportCode, setAirportCode] = useState<string>(""); // Armazena o código do aeroporto
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento para criação
  const [showAirportsInfoModal, setShowAirportsInfoModal] =
    useState<boolean>(false); // Controla a visibilidade do modal de informações

  // Função para criar um novo aeroporto
  async function handleCreateAirport() {
    try {
      setLoading(true);

      const data: CreateAndEditAirportType = { city, airportCode };

      await api.post("api/admin/airport", data);

      toast.success("Airport created successfully.", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to create airport.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      setCity("");
      setAirportCode("");
      setLoading(false);
      eventEmitter.emit("updateAirports");
    }
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        <h1 className="text-center font-bold text-3xl">Create New Airport</h1>
        <form
          className="w-full mt-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreateAirport();
          }}
        >
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
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowAirportsInfoModal(true);
          }}
        >
          See Airports
        </button>
      </div>
      <AirportsInfo
        isOpen={showAirportsInfoModal}
        setIsOpen={setShowAirportsInfoModal}
      />
    </div>
  );
}
