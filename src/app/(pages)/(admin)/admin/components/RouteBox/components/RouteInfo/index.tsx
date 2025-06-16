/* eslint-disable @typescript-eslint/no-explicit-any */

// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaEye, FaSpinner } from "react-icons/fa";
import { api } from "@/lib/api/api";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import { CabinsType, EditRouteType, RouteType } from "@/lib/route/types";
import { AirportType } from "@/lib/airport/types";
import { GoXCircle } from "react-icons/go";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import Image from "next/image";
import getRoutes from "../../functions/getRoutes";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import SeeCabins from "./components/SeeCabins";
import EditRoute from "./components/EditRoute";

interface RouteInfoProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  airports: AirportType[];
}

export default function RouteInfo({
  isOpen,
  setIsOpen,
  airports,
}: RouteInfoProps) {
  // Classe de estilo para os inputs do formulário
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Classe de estilo aplicada às células da tabela
  const classItens = "border border-gray-800 p-2 text-center";

  // Estado para armazenar as cabines selecionadas para visualização
  const [cabinsSelected, setCabinsSelected] = useState<CabinsType[]>([]);
  const [airport1Selected, setAirport1Selected] = useState<AirportType>();
  const [airport2Selected, setAirport2Selected] = useState<AirportType>();

  // Estado para controlar a exibição do modal de cabines
  const [isOpenCabins, setIsOpenCabins] = useState(false);

  // Estado que define qual rota está sendo editada
  const [routeToEdit, setRouteToEdit] = useState<RouteType | undefined>();

  const [isLoadingUpdateRoutes, setIsLoadingUpdateRoutes] = useState(false);

  // Estado do aeroporto atualmente selecionado para filtragem de rotas
  const [airportIdSelected, setAirportIdSelected] = useState<number>(0);

  // Lista de rotas filtradas com base no aeroporto selecionado
  const [filteredRoutes, setFilteredRoutes] = useState<RouteType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingEditModal, setLoadingEditModal] = useState<boolean>(false);

  const [showEditRouteModal, setShowEditRouteModal] = useState<boolean>(false);

  // Hook que busca rotas sempre que um novo aeroporto for selecionado
  useEffect(() => {
    if (airportIdSelected !== 0) {
      getRoutes({
        airportIdSelected: airportIdSelected,
        setFilteredRoutes: setFilteredRoutes,
        setIsLoading: setLoading,
      });
    }
  }, [airportIdSelected]);

  // Remove uma rota existente pelo seu ID
  async function handleDeleteRoute(routeId: number) {
    try {
      await api.delete(`api/admin/route/${routeId}`);
      toast.success("Route deleted successfully!", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to delete route.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      getRoutes({
        airportIdSelected: airportIdSelected,
        setFilteredRoutes: setFilteredRoutes,
        setIsLoading: setLoading,
      });
    }
  }

  async function handleUpdateAllRoutes() {
    setIsLoadingUpdateRoutes(true); // Ativa o loading

    try {
      await api.put("/api/admin/route/update");

      toast.success("All routes are being updated successfully.", toastConfigs);
    } catch {
      toast.error("Failed to request the update of all routes.", toastConfigs);
    } finally {
      setIsLoadingUpdateRoutes(false);
    }
  }

  async function handleUpdateRoute(routeId: number) {
    try {
      await api.put(`/api/admin/route/update/${routeId}`);

      toast.success("Route update started successfully.", toastConfigs);
    } catch {
      toast.error("Failed to request update for this route.", toastConfigs);
    }
  }

  function handleCancel() {
    setAirportIdSelected(0);
    setIsOpen(!isOpen);
  }

  // Atualiza rota existente com dados fornecidos no modal de edição
  async function handleEditRoute(data: EditRouteType) {
    setLoadingEditModal(true);
    try {
      await api.put(`api/admin/route/${data.id}`, data);
      toast.success("Route edited successfully.", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to edit route.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      setLoadingEditModal(false);

      getRoutes({
        airportIdSelected: airportIdSelected,
        setFilteredRoutes: setFilteredRoutes,
        setIsLoading: setLoading,
      });

      setTimeout(() => {
        setShowEditRouteModal(false);
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 border-none text-white h-auto max-h-11/12 "
      >
        <DialogHeader>
          <DialogTitle className="relative text-center text-2xl font-bold">
            Routes
            <div className="mt-2 sm:mt-0 sm:absolute top-[-11px] left-0 text-lg font-normal">
              <button
                onClick={() => {
                  handleUpdateAllRoutes();
                }}
                className="bg-blue-500 py-2 px-5 rounded cursor-pointer hover:bg-blue-600"
              >
                {isLoadingUpdateRoutes ? (
                  <FaSpinner className="animate-spin" size={24} />
                ) : (
                  "Update All Routes"
                )}
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Dropdown para selecionar o aeroporto e filtrar as rotas relacionadas */}
        <select
          name="filterRouteByAirport"
          id="filterRouteByAirport"
          className={inputs}
          onChange={(e) => {
            setAirportIdSelected(Number(e.target.value));
          }}
          value={airportIdSelected}
        >
          <option value={0} disabled>
            Select an airport
          </option>
          {/* Opções baseadas na lista de aeroportos recebida via props */}
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.city} - {airport.airportCode}
            </option>
          ))}
        </select>

        {/* Exibição condicional dos dados da rota com base no estado */}
        {airportIdSelected !== 0 ? (
          loading ? (
            // Ícone de carregamento enquanto os dados são carregados
            <FaSpinner className="animate-spin w-full my-5" size={40} />
          ) : filteredRoutes.length > 0 ? (
            // Tabela com as rotas existentes
            <div className="overflow-x-auto overflow-y-auto w-full max-h-[60vh]">
              <table className="w-full min-w-6xl max-h-5/6 text-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className={classItens}>Mileage Program</th>
                    <th className={classItens}>Enable Layovers</th>
                    <th className={classItens}>Active</th>
                    <th className={classItens}>Airports</th>
                    <th className={classItens}>Cabins</th>
                    <th className={classItens}>Update</th>
                    <th className={classItens}>Edit</th>
                    <th className={classItens}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Iteração sobre cada rota retornada */}
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="text-center bg-gray-600">
                      {/* Programa de milhagem com ícone e label */}
                      <td className={classItens}>
                        <div className="flex items-center justify-center">
                          <Image
                            src={mileagePrograms[route.mileageProgram].logoUrl}
                            alt={mileagePrograms[route.mileageProgram].key}
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          {mileagePrograms[route.mileageProgram].label} -{" "}
                          {mileagePrograms[route.mileageProgram].iataCode}
                        </div>
                      </td>

                      {/* Indicação se a rota permite conexões */}
                      <td className={classItens}>
                        <div className="flex items-center justify-center">
                          {route.enableLayovers ? (
                            <MdOutlineExpandCircleDown
                              size={25}
                              color="green"
                            />
                          ) : (
                            <GoXCircle size={25} color="red" />
                          )}
                        </div>
                      </td>

                      {/* Indicação de status ativo da rota */}
                      <td className={classItens}>
                        <div className="flex items-center justify-center">
                          {route.active ? (
                            <MdOutlineExpandCircleDown
                              size={25}
                              color="green"
                            />
                          ) : (
                            <GoXCircle size={25} color="red" />
                          )}
                        </div>
                      </td>

                      {/* Lista dos aeroportos envolvidos na rota */}
                      <td className={classItens}>
                        <div className="flex flex-col gap-2">
                          {route.airports.map((airport) => (
                            <div
                              key={airport.id}
                              className="bg-gray-800 py-2 rounded text-sm text-white"
                            >
                              {airport.city} - {airport.airportCode}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Botão para visualizar as cabines associadas à rota */}
                      <td className={classItens}>
                        <div className="flex w-full items-center justify-center">
                          <button
                            className="bg-green-500 py-2 px-5 rounded cursor-pointer hover:bg-green-600 flex flex-row gap-2 items-center"
                            onClick={() => {
                              setAirport1Selected(route.airports[0]);
                              setAirport2Selected(route.airports[1]);
                              setCabinsSelected(route.cabins);
                              setIsOpenCabins(true);
                            }}
                          >
                            <FaEye size={25} color="white" />
                            <label>({route.cabins.length})</label>
                          </button>
                        </div>
                      </td>

                      {/* Botão de atualização da rota */}
                      <td className={classItens}>
                        <button
                          onClick={() => {
                            handleUpdateRoute(route.id);
                          }}
                          className="bg-blue-500 py-2 px-5 rounded cursor-pointer hover:bg-blue-600"
                        >
                          {isLoadingUpdateRoutes ? (
                            <FaSpinner className="animate-spin" size={24} />
                          ) : (
                            "Update Route"
                          )}
                        </button>
                      </td>

                      {/* Botão de edição da rota, abrindo o modal com os dados atuais */}
                      <td className={classItens}>
                        <button
                          className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
                          onClick={() => {
                            setRouteToEdit(route);
                            setShowEditRouteModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>

                      {/* Botão para remover a rota */}
                      <td className={classItens}>
                        <button
                          className="bg-red-500 py-2 px-3 rounded cursor-pointer hover:bg-red-600"
                          onClick={() => {
                            handleDeleteRoute(route.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Mensagem caso não haja rotas cadastradas
            <div className="mt-2 py-5 text-center text-gray-400 text-2xl">
              This airport has no routes registered.
            </div>
          )
        ) : null}

        {/* Modal que exibe as cabines da rota selecionada */}
        {airport1Selected && airport2Selected && (
          <SeeCabins
            airport1={airport1Selected}
            airport2={airport2Selected}
            cabinsToShow={cabinsSelected}
            isOpen={isOpenCabins}
            setIsOpen={setIsOpenCabins}
          />
        )}

        {routeToEdit ? (
          <EditRoute
            isOpen={showEditRouteModal}
            setIsOpen={setShowEditRouteModal}
            initialData={routeToEdit}
            onEdit={handleEditRoute}
            loading={loadingEditModal}
          />
        ) : null}

        {/* Botão para fechar o modal */}
        <button
          onClick={() => handleCancel()}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
