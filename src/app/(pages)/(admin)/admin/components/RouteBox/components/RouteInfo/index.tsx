/* eslint-disable @typescript-eslint/no-explicit-any */
// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

import { AirportType } from "@/lib/airport/types";
import { api } from "@/lib/api/api";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { RouteType } from "@/lib/route/types";
import { toastConfigs } from "@/lib/toastify/toastify";
import { useEffect, useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { toast } from "react-toastify";

interface RouteInfoModalProps {
  airports: AirportType[];
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  //   localToEdit: LocalType;
  //   setLocalToEdit: (Local: LocalType) => void;
  //   isOpenEditModal: boolean;
  //   setIsOpenEditModal: (state: boolean) => void;
  //   isLoadingEditModal: boolean;
  //   isLoadingEditLocalsOrder: boolean;
  //   onEditLocalsOrder: (data: LocalType[]) => void;
  //   onDeleteLocal: (LocalId: number) => void;
}

// Componente principal responsável pela criação de rotas entre dois aeroportos
export default function RouteInfo({
  airports,
  isOpen,
  onClose,
  isLoading,
  setIsLoading,
}: RouteInfoModalProps) {
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  const classItens = "border border-gray-800 p-2 text-center";

  const [airportIdSelected, setAirportIdSelected] = useState<number>(0);
  const [filteredRoutes, setFilteredRoutes] = useState<RouteType[]>([]);

  useEffect(() => {
    async function getRoutes() {
      try {
        setIsLoading(true);

        const data = await api.get(
          `/api/admin/route/filter/${airportIdSelected}`
        );

        setFilteredRoutes(data.data);
      } catch (error: any) {
        // Tenta extrair mensagem de erro do servidor
        const errorMessage =
          error?.response?.data?.error || "Failed to get routes.";

        // Exibe mensagem de erro
        toast.error(errorMessage, toastConfigs);
      } finally {
        setIsLoading(false);
      }
    }

    if (airportIdSelected !== 0) {
      getRoutes();
    }
  }, [airportIdSelected]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Área principal do modal */}
      <div
        // className={`bg-gray-800 p-6 rounded shadow-lg h-fit ${
        //   isLoading ? "w-fit" : "w-10/12"
        // }`}
        className={`bg-gray-800 p-6 rounded shadow-lg h-fit w-10/12`}
      >
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
          {/* Lista de cabines que ainda podem ser adicionadas */}
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.city} - {airport.airportCode}
            </option>
          ))}
        </select>
        {isLoading ? (
          <FaSpinner className="animate-spin w-full my-5" size={40} />
        ) : (
          <div className="overflow-x-auto overflow-y-auto w-full mt-3 max-h-[60vh]">
            <table className="w-full min-w-6xl max-h-5/6 text-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className={classItens}>Mileage Program</th>
                  <th className={classItens}>Enable Layovers</th>
                  <th className={classItens}>Active</th>
                  <th className={classItens}>Airports</th>
                  <th className={classItens}>Cabins</th>
                  <th className={classItens}>Edit</th>
                  <th className={classItens}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="text-center bg-gray-600">
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          src={mileagePrograms[route.mileageProgram].logoUrl}
                          alt={mileagePrograms[route.mileageProgram].key}
                          className="w-5 h-5 mr-2"
                        />
                        {mileagePrograms[route.mileageProgram].label} -{" "}
                        {mileagePrograms[route.mileageProgram].iataCode}
                      </div>
                    </td>
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {route.enableLayovers ? (
                          <MdOutlineExpandCircleDown size={25} color="green" />
                        ) : (
                          <GoXCircle size={25} color="red" />
                        )}
                      </div>
                    </td>
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {route.active ? (
                          <MdOutlineExpandCircleDown size={25} color="green" />
                        ) : (
                          <GoXCircle size={25} color="red" />
                        )}
                      </div>
                    </td>
                    <td className={classItens}>
                      <div className="flex flex-col gap-2">
                        {route.airports.map((airport) => (
                          <div
                            key={airport.id}
                            className="bg-gray-800 p-2 rounded text-sm text-white"
                          >
                            {airport.city} - {airport.airportCode}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className={classItens}>
                      <div className="flex w-full items-center justify-center">
                        <button className="bg-green-500 py-2 px-5 rounded cursor-pointer hover:bg-green-600 flex flex-row gap-2 items-center">
                          <FaEye size={25} color="white" />{" "}
                          <label>({route.cabins.length})</label>
                        </button>
                      </div>
                    </td>

                    {/* Botão para abrir o modal de edição */}
                    <td className={classItens}>
                      <button className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600">
                        Edit
                      </button>
                    </td>

                    {/* Botão para excluir o local */}
                    <td className={classItens}>
                      <button className="bg-red-500 py-2 px-3 rounded cursor-pointer hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botão para fechar o modal principal */}
        <button
          onClick={onClose}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
