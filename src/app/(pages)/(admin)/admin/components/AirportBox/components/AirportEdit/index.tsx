// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação dos tipos para edição de usuário e usuário do sistema
import { AirportType } from "@/lib/airport/types";

// Importação dos hooks do React para gerenciamento de estado e efeitos colaterais
import React, { useEffect, useState } from "react";

// Importação do ícone de carregamento do React Icons
import { FaSpinner } from "react-icons/fa";

// Definição da interface das propriedades do modal de edição de aeroportos
interface AirportsEditModalProps {
  isOpen: boolean; // Indica se o modal está aberto ou fechado
  isLoading: boolean; // Indica se os dados estão carregando
  airport: AirportType; // Dados do aeroporto a ser editado
  onClose: () => void; // Função para fechar o modal
  onEditAirport: (data: AirportType) => void; // Função para editar o aeroporto
}

// Componente de modal para edição de aeroportos
export default function AirportEdit({
  isOpen,
  isLoading,
  airport,
  onClose,
  onEditAirport,
}: AirportsEditModalProps) {
  // Estados para armazenar os valores editáveis do aeroporto
  const [city, setCity] = useState<string>("");
  const [airportCode, setAirportCode] = useState<string>("");

  // Classe de estilo para os inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Atualiza os campos do formulário quando o aeroporto muda
  useEffect(() => {
    setCity(airport.city);
    setAirportCode(airport.airportCode);
  }, [airport]);

  // Função para resetar os campos ao cancelar a edição
  function handleCancel() {
    setCity("");
    setAirportCode("");
  }

  // Função para enviar o formulário de edição
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    onEditAirport({ id: airport.id, city, airportCode });
  }

  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 bg-gray-900">
      {/* Modal principal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-white">Edit Airport</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Campo de cidade */}
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1 text-white">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              placeholder="Type city"
              onChange={(e) => setCity(e.target.value)}
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
          <div className="flex justify-end">
            {/* Botão de cancelar edição */}
            <button
              type="button"
              onClick={() => {
                handleCancel();
                onClose();
              }}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
            >
              Cancel
            </button>

            {/* Botão de salvar com loading spinner quando a ação está em andamento */}
            {isLoading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
