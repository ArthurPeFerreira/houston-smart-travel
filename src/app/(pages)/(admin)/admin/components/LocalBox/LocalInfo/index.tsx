// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação dos tipos para representar Locais
import { EditLocalType, LocalType } from "@/lib/local/types";

// Importação dos hooks do React para gerenciamento de estado
import React, { useState } from "react";

import SeeImage from "./components/SeeImage";

// Importação de ícones do React Icons para ações de edição e exclusão
import { FaSpinner } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import LocalEdit from "../LocalEdit";

// Definição da interface das propriedades do modal de informações de Locais
interface LocalsInfoModalProps {
  isOpen: boolean; // Indica se o modal está aberto
  onClose: () => void; // Função para fechar o modal
  isLoading: boolean; // Indica se os dados estão carregando
  locals: LocalType[] | undefined; // Lista de Locais
  localToEdit: LocalType; // Local selecionado para edição
  setLocalToEdit: (Local: LocalType) => void; // Define o Local a ser editado
  isOpenEditModal: boolean; // Estado do modal de edição
  setIsOpenEditModal: (state: boolean) => void; // Função para controlar a abertura do modal de edição
  onCloseEditModal: () => void; // Função para fechar o modal de edição
  isLoadingEditModal: boolean; // Indica se o modal de edição está carregando
  onEditLocal: (data: EditLocalType) => void; // Função para edição de Local
  onDeleteLocal: (LocalId: number) => void; // Função para excluir um Local
}

// Componente de mod- al para exibição da lista de Locais
export default function LocalsInfo({
  isOpen,
  onClose,
  isLoading,
  locals,
  localToEdit,
  setLocalToEdit,
  isOpenEditModal,
  setIsOpenEditModal,
  onCloseEditModal,
  isLoadingEditModal,
  onEditLocal,
  onDeleteLocal,
}: LocalsInfoModalProps) {
  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  const [imageToSee, setImageToSee] = useState<string>("");
  const [showSeeImageModal, setShowSeeImageModal] = useState<boolean>(false);

  const classItens = "border border-gray-800 p-2 text-center";

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Modal principal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-10/12">
        <h1 className="text-center font-bold text-3xl mb-5">Locals</h1>

        {/* Container de lista de Locais com rolagem */}
        <div className="max-h-96 min-w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Exibição do carregamento */}
          {isLoading ? (
            <div className="text-white w-full flex items-center justify-center px-4 py-2 rounded">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          ) : locals && locals.length > 0 ? (
            <table className="w-full text-sm md:text-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className={classItens}>Airport</th>
                  <th className={classItens}>City</th>
                  <th className={classItens}>Image</th>
                  <th className={classItens}>Active</th>
                  <th className={classItens}>Edit</th>
                  <th className={classItens}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {locals.map((local) => (
                  <tr key={local.id} className="text-center bg-gray-600">
                    <td className={classItens}>
                      <div className="flex flex-col">
                        <label className="font-semibold">
                          {local.airport.city}
                        </label>
                        <label className="text-sm text-gray-400">
                          {local.airport.airportCode}
                        </label>
                      </div>
                    </td>
                    <td className={classItens}>{local.city}</td>
                    <td className={classItens}>
                      <button
                        onClick={() => {
                          setShowSeeImageModal(true);
                          setImageToSee(local.image);
                        }}
                        className="bg-blue-500 py-2 px-5 rounded cursor-pointer hover:bg-blue-600"
                      >
                        See Image
                      </button>
                    </td>
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {local.active ? (
                          <MdOutlineExpandCircleDown size={25} color="green" />
                        ) : (
                          <GoXCircle size={25} color="red" />
                        )}
                      </div>
                    </td>
                    <td className={classItens}>
                      <button
                        onClick={() => {
                          setIsOpenEditModal(true);
                          setLocalToEdit(local);
                        }}
                        className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                    <td className={classItens}>
                      <button
                        onClick={() => onDeleteLocal(local.id)}
                        className="bg-red-500 py-2 px-3 rounded cursor-pointer hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Mensagem caso não existam Locais cadastrados
            <div className="flex items-center justify-center">
              No Locals Found
            </div>
          )}
        </div>
      </div>

      <SeeImage
        image={imageToSee}
        isOpen={showSeeImageModal}
        onClose={() => {
          setShowSeeImageModal(false);
        }}
      />

      {/* Modal de edição de Local */}

      <LocalEdit
        isOpen={isOpenEditModal && localToEdit !== null}
        onClose={() => {
          setIsOpenEditModal(false);
        }}
        isLoading={isLoadingEditModal}
        local={localToEdit}
        handleCancel={onCloseEditModal}
        handleEditLocal={onEditLocal}
      />
    </div>
  );
}
