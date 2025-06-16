/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"; // Indica que este componente roda no cliente (Next.js App Router)

import React, { useEffect, useState } from "react";

// Componentes de modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Ícones utilizados no layout
import {
  FaArrowDown,
  FaArrowUp,
  FaSpinner,
} from "react-icons/fa";

import { MdOutlineExpandCircleDown } from "react-icons/md";
import { GoXCircle } from "react-icons/go";

// API e utilitários
import { api } from "@/lib/api/api";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";

// Tipagem dos dados
import { LocalType } from "@/lib/local/types";

// Componentes auxiliares
import SeeImage from "./components/SeeImage";
import LocalEdit from "../LocalEdit";

// Tipagem das props do componente principal
interface LocalsInfoProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Classe padrão aplicada às células da tabela
const classItens = "border border-gray-800 p-2 text-center";

// Componente principal responsável por exibir e editar os locais cadastrados
export default function LocalsInfo({ isOpen, setIsOpen }: LocalsInfoProps) {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento da tabela
  const [loadingSetLocalsOrder, setLoadingSetLocalsOrder] = useState<boolean>(false); // Estado de carregamento ao salvar a ordem

  const [locals, setLocals] = useState<LocalType[]>([]); // Lista de locais carregados

  // Estados auxiliares para visualização e edição
  const [imageToSee, setImageToSee] = useState<string>(""); // Imagem a ser visualizada
  const [showSeeImageModal, setShowSeeImageModal] = useState<boolean>(false);
  const [showEditLocalModal, setShowEditLocalModal] = useState<boolean>(false);
  const [localToEdit, setLocalToEdit] = useState<LocalType>(); // Local selecionado para edição

  // useEffect inicial: carrega os dados e escuta eventos de atualização
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const responseLocals = await api.get("api/admin/local");
        setLocals(responseLocals.data); // Atualiza a lista de locais
      } catch {
        toast.error("Failed to get locals.", toastConfigs);
      } finally {
        setLoading(false); // Finaliza carregamento inicial
      }
    }

    fetchInitialData();

    // Escuta eventos globais para atualizar os locais ao serem editados
    eventEmitter.on("updateLocalsModal", fetchInitialData);
    return () => {
      eventEmitter.off("updateLocalsModal", fetchInitialData);
    };
  }, []);

  // Reordena um local para cima
  function moveItemUp(index: number) {
    setLocals((prevLocals) => {
      const newLocals = [...prevLocals];
      const temp = newLocals[index - 1];
      newLocals[index - 1] = newLocals[index];
      newLocals[index] = temp;
      return newLocals;
    });
  }

  // Reordena um local para baixo
  function moveItemDown(index: number) {
    setLocals((prevLocals) => {
      const newLocals = [...prevLocals];
      const temp = newLocals[index + 1];
      newLocals[index + 1] = newLocals[index];
      newLocals[index] = temp;
      return newLocals;
    });
  }

  // Envia nova ordem dos locais para o backend
  async function handleEditLocalsOrder(data: LocalType[]) {
    setLoadingSetLocalsOrder(true);
    try {
      const response = await api.put(`api/admin/local`, data);

      if (response.status === 200) {
        toast.success("Locals order edited successfully.", toastConfigs);
      }
    } catch {
      toast.error("Failed to edit locals order.", toastConfigs);
    } finally {
      // Recarrega a lista após salvar
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
      setLoadingSetLocalsOrder(false);
    }
  }

  // Exclui um local do sistema
  async function handleDeleteLocal(localId: number) {
    try {
      if (confirm("Are you sure you want to delete this local?")) {
        await api.delete(`api/admin/local/${localId}`);
        setLocals(locals.filter((local) => local.id !== localId));
        toast.success("Local deleted successfully.", toastConfigs);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to delete local.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      eventEmitter.emit("updateLocals");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg max-w-11/12 min-w-[20rem] sm:max-w-11/12 border-none text-white h-auto min-h-0 max-h-[90vh] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Locals
            {/* Botão de salvar nova ordem dos locais */}
            <div className="mt-3 md:mt-0 md:absolute top-4 left-6 text-lg font-normal">
              <button
                onClick={() => handleEditLocalsOrder(locals)}
                className="bg-yellow-500 py-2 px-14 rounded cursor-pointer hover:bg-yellow-600"
              >
                {loadingSetLocalsOrder ? (
                  <FaSpinner
                    className="animate-spin mx-[52.5px] my-[2px]"
                    size={24}
                  />
                ) : (
                  "Save New Order"
                )}
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Conteúdo do modal com rolagem */}
        <div className="flex-1 min-h-0 max-h-[600px] w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {loading ? (
            // Spinner de carregamento
            <div className="text-white w-full flex items-center justify-center px-4 py-2 rounded">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          ) : locals && locals.length > 0 ? (
            // Tabela com os locais
            <table className="w-full text-sm md:text-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className={classItens}>Order</th>
                  <th className={classItens}>Airport</th>
                  <th className={classItens}>Description</th>
                  <th className={classItens}>Passage Price</th>
                  <th className={classItens}>Image</th>
                  <th className={classItens}>Active</th>
                  <th className={classItens}>Edit</th>
                  <th className={classItens}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderiza cada linha da tabela */}
                {locals.map((local, index) => (
                  <tr key={local.id} className="text-center bg-gray-600">
                    <td className={classItens}>
                      <div className="flex flex-col items-center justify-center">
                        {index > 0 && (
                          <button
                            onClick={() => moveItemUp(index)}
                            className="p-2 cursor-pointer"
                          >
                            <FaArrowUp />
                          </button>
                        )}
                        {index < locals.length - 1 && (
                          <button
                            onClick={() => moveItemDown(index)}
                            className="p-2 cursor-pointer"
                          >
                            <FaArrowDown />
                          </button>
                        )}
                      </div>
                    </td>
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
                    <td className={classItens}>
                      {local.city}, {local.country}
                    </td>
                    <td className={classItens}>
                      $ {Number(local.passagePrice).toFixed(2)}
                    </td>
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
                          setShowEditLocalModal(true);
                          setLocalToEdit(local);
                        }}
                        className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                    <td className={classItens}>
                      <button
                        onClick={() => handleDeleteLocal(local.id)}
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
            // Exibe mensagem se não houver locais
            <div className="flex items-center justify-center">
              No Locals Found
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

      {/* Modal de visualização de imagem */}
      <SeeImage
        image={imageToSee}
        isOpen={showSeeImageModal}
        setIsOpen={setShowSeeImageModal}
      />

      {/* Modal de edição de local */}
      <LocalEdit
        isOpen={showEditLocalModal}
        setIsOpen={setShowEditLocalModal}
        local={localToEdit}
      />
    </Dialog>
  );
}
