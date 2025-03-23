// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação dos tipos utilizados para edição e representação de locais
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";

// Importação dos hooks do React para controle de estado
import React, { useState } from "react";

// Importação do componente de visualização de imagem
import SeeImage from "./components/SeeImage";

// Importação de ícones utilizados na interface
import { FaArrowDown, FaArrowUp, FaSpinner } from "react-icons/fa"; // Ícone de carregamento
import { GoXCircle } from "react-icons/go"; // Ícone de "inativo"
import { MdOutlineExpandCircleDown } from "react-icons/md"; // Ícone de "ativo"

// Importação do componente de edição de locais
import LocalEdit from "../LocalEdit";

// Interface que define as propriedades esperadas pelo componente LocalsInfo
interface LocalsInfoModalProps {
  isOpen: boolean; // Controla a exibição do modal principal
  onClose: () => void; // Função para fechar o modal principal
  isLoading: boolean; // Indica se os dados dos locais estão sendo carregados
  locals: LocalType[] | undefined; // Lista de locais a serem exibidos
  localToEdit: LocalType; // Local selecionado para edição
  setLocalToEdit: (Local: LocalType) => void; // Atualiza o local selecionado para edição
  isOpenEditModal: boolean; // Controla a exibição do modal de edição
  setIsOpenEditModal: (state: boolean) => void; // Atualiza o estado de exibição do modal de edição
  isLoadingEditModal: boolean; // Indica se a edição do local está em carregamento
  isLoadingEditLocalsOrder: boolean; // Indica se a atualização da ordem dos locais está em carregamento
  onEditLocal: (
    e: React.FormEvent<HTMLFormElement>,
    data: EditLocalTypeFile
  ) => void; // Função para submeter a edição do local
  onEditLocalsOrder: (data: LocalType[]) => void; // Função para salvar nova ordem dos locais
  onDeleteLocal: (LocalId: number) => void; // Função para deletar um local
}

// Componente principal que renderiza o modal com a lista de locais e ações associadas
export default function LocalsInfo({
  isOpen,
  onClose,
  isLoading,
  locals,
  localToEdit,
  setLocalToEdit,
  isOpenEditModal,
  setIsOpenEditModal,
  isLoadingEditModal,
  isLoadingEditLocalsOrder,
  onEditLocal,
  onDeleteLocal,
  onEditLocalsOrder,
}: LocalsInfoModalProps) {
  // Caso o modal não esteja aberto, não renderiza nada
  if (!isOpen) return null;

  // Estado que define qual imagem será visualizada no modal
  const [imageToSee, setImageToSee] = useState<string>("");

  // Estado que controla a exibição do modal de imagem
  const [showSeeImageModal, setShowSeeImageModal] = useState<boolean>(false);

  // Estado local que mantém os dados dos locais, permitindo alterações temporárias como reordenação
  const [localsData, setLocalsData] = useState<LocalType[]>(
    locals ? locals : []
  );

  // Classe padrão para células da tabela
  const classItens = "border border-gray-800 p-2 text-center";

  // Move um local para cima na lista (alterando a ordem)
  function moveItemUp(index: number) {
    setLocalsData((prevLocals) => {
      const newLocals = [...prevLocals];
      const temp = newLocals[index - 1];
      newLocals[index - 1] = newLocals[index];
      newLocals[index] = temp;
      return newLocals;
    });
  }

  // Move um local para baixo na lista (alterando a ordem)
  function moveItemDown(index: number) {
    setLocalsData((prevLocals) => {
      const newLocals = [...prevLocals];
      const temp = newLocals[index + 1];
      newLocals[index + 1] = newLocals[index];
      newLocals[index] = temp;
      return newLocals;
    });
  }

  return (
    // Container geral do modal, cobrindo toda a tela
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Área principal do modal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-10/12 h-fit ">
        {/* Cabeçalho com título e botão para salvar nova ordem */}
        <h1 className="text-center font-bold text-3xl mb-5 relative">
          Locals
          <div className="absolute top-0 left-0 text-sm md:text-lg font-normal">
            <button
              onClick={() => {
                onEditLocalsOrder(localsData);
              }}
              className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
            >
              {isLoadingEditLocalsOrder ? (
                <FaSpinner className="animate-spin" size={24} />
              ) : (
                "Save New Order"
              )}
            </button>
          </div>
        </h1>

        {/* Conteúdo com rolagem para exibir a lista */}
        <div className="max-h-96 h-fit min-w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Exibição de carregamento ou tabela de locais */}
          {isLoading ? (
            <div className="text-white w-full flex items-center justify-center px-4 py-2 rounded">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          ) : localsData && localsData.length > 0 ? (
            <table className="w-full text-sm md:text-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className={classItens}>Order</th>
                  <th className={classItens}>Airport</th>
                  <th className={classItens}>City</th>
                  <th className={classItens}>Image</th>
                  <th className={classItens}>Active</th>
                  <th className={classItens}>Edit</th>
                  <th className={classItens}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderiza cada local como uma linha da tabela */}
                {localsData.map((local, index) => (
                  <tr key={local.id} className="text-center bg-gray-600">
                    {/* Coluna de ordem com botões de mover */}
                    <td className={classItens}>
                      <div className="flex flex-col items-center justify-center">
                        {index > 0 ? (
                          <button
                            onClick={() => moveItemUp(index)}
                            className="p-2 cursor-pointer"
                          >
                            <FaArrowUp />
                          </button>
                        ) : null}
                        {index < localsData.length - 1 ? (
                          <button
                            onClick={() => moveItemDown(index)}
                            className="p-2 cursor-pointer"
                          >
                            <FaArrowDown />
                          </button>
                        ) : null}
                      </div>
                    </td>

                    {/* Coluna de informações do aeroporto */}
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

                    {/* Coluna com o nome da cidade */}
                    <td className={classItens}>{local.city}</td>

                    {/* Botão para visualizar a imagem do local */}
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

                    {/* Coluna que mostra se o local está ativo/inativo */}
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {local.active ? (
                          <MdOutlineExpandCircleDown size={25} color="green" />
                        ) : (
                          <GoXCircle size={25} color="red" />
                        )}
                      </div>
                    </td>

                    {/* Botão para abrir o modal de edição */}
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

                    {/* Botão para excluir o local */}
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
            // Exibe mensagem caso não existam locais
            <div className="flex items-center justify-center">
              No Locals Found
            </div>
          )}
        </div>

        {/* Botão para fechar o modal principal */}
        <button
          onClick={onClose}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Modal para visualização da imagem do local */}
      <SeeImage
        image={imageToSee}
        isOpen={showSeeImageModal}
        onClose={() => {
          setShowSeeImageModal(false);
        }}
      />

      {/* Modal para edição de local */}
      <LocalEdit
        isOpen={isOpenEditModal && localToEdit !== null}
        onClose={() => {
          setIsOpenEditModal(false);
        }}
        isLoading={isLoadingEditModal}
        local={localToEdit}
        handleEditLocal={onEditLocal}
      />
    </div>
  );
}
