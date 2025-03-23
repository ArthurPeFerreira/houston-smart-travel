// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação dos tipos para representar aeroportos
import { AirportType } from "@/lib/airport/types";

// Importação dos hooks do React para gerenciamento de estado
import React from "react";

// Importação de ícones do React Icons para ações de edição e exclusão
import { FaPen, FaSpinner, FaTrash } from "react-icons/fa";

// Importação do componente de edição de aeroportos
import AirportEdit from "../AirportEdit";

// Definição da interface das propriedades do modal de informações de aeroportos
interface AirportsInfoModalProps {
  isOpen: boolean; // Indica se o modal está aberto
  onClose: () => void; // Função para fechar o modal
  isLoading: boolean; // Indica se os dados estão carregando
  airports: AirportType[] | undefined; // Lista de aeroportos
  airportToEdit: AirportType; // Aeroporto selecionado para edição
  setAirportToEdit: (airport: AirportType) => void; // Define o aeroporto a ser editado
  isOpenEditModal: boolean; // Estado do modal de edição
  setIsOpenEditModal: (state: boolean) => void; // Função para controlar a abertura do modal de edição
  onCloseEditModal: () => void; // Função para fechar o modal de edição
  isLoadingEditModal: boolean; // Indica se o modal de edição está carregando
  onEditAirport: (data: AirportType) => void; // Função para edição de aeroporto
  onDeleteAirport: (airportId: number) => void; // Função para excluir um aeroporto
}

// Componente de modal para exibição da lista de aeroportos
export default function AirportsInfo({
  isOpen,
  onClose,
  isLoading,
  airports,
  airportToEdit,
  setAirportToEdit,
  isOpenEditModal,
  setIsOpenEditModal,
  onCloseEditModal,
  isLoadingEditModal,
  onEditAirport,
  onDeleteAirport,
}: AirportsInfoModalProps) {
  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 bg-gray-900">
      {/* Modal principal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-3xl mb-5">Airports</h1>
        
        {/* Container de lista de aeroportos com rolagem */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Exibição do carregamento */}
          {isLoading ? (
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
                    <label className="text-sm text-gray-400">{airport.airportCode}</label>
                  </div>
                  {/* Botões de ação (editar e excluir) */}
                  <div className="flex flex-row gap-4">
                    <button 
                      onClick={() => {
                        setAirportToEdit(airport);
                        setIsOpenEditModal(true);
                      }} 
                      className="text-yellow-600 cursor-pointer"
                    >
                      <FaPen size={24} />
                    </button>
                    <button 
                      onClick={() => onDeleteAirport(airport.id)} 
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
          onClick={onClose}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Modal de edição de aeroporto */}
      {isOpenEditModal && airportToEdit && (
        <AirportEdit 
          isOpen={isOpenEditModal} 
          isLoading={isLoadingEditModal} 
          airport={airportToEdit} 
          onClose={onCloseEditModal} 
          onEditAirport={onEditAirport} 
        />
      )}
    </div>
  );
}