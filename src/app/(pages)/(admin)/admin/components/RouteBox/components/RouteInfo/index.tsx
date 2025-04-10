// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

import { AirportType } from "@/lib/airport/types";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { CabinsType, RouteType } from "@/lib/route/types";
import { useEffect, useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import getRoutes from "../../functions/getRoutes";
import Image from "next/image";
import SeeCabins from "./components/seeCabins";

// Tipagem das propriedades esperadas pelo componente RouteInfo
interface RouteInfoModalProps {
  airports: AirportType[]; // Lista de aeroportos disponíveis
  isOpen: boolean; // Define se o modal está visível
  onClose: () => void; // Função para fechar o modal
  isLoading: boolean; // Indica se os dados estão sendo carregados
  setIsLoading: (value: boolean) => void; // Função para alterar o estado de carregamento
  airportIdSelected: number; // ID do aeroporto atualmente selecionado
  setAirportIdSelected: (value: number) => void; // Função para alterar o aeroporto selecionado
  filteredRoutes: RouteType[]; // Lista de rotas filtradas associadas ao aeroporto selecionado
  setFilteredRoutes: (value: RouteType[]) => void; // Função para atualizar a lista de rotas filtradas
  onDeleteRoute: (routeId: number) => void; // Função para excluir uma rota
}

// Componente responsável por exibir um modal com informações das rotas de um aeroporto selecionado
export default function RouteInfo({
  airports,
  isOpen,
  onClose,
  isLoading,
  setIsLoading,
  airportIdSelected,
  setAirportIdSelected,
  filteredRoutes,
  setFilteredRoutes,
  onDeleteRoute,
}: RouteInfoModalProps) {
  // Classe de estilo para os inputs do modal
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Classe de estilo para os itens da tabela
  const classItens = "border border-gray-800 p-2 text-center";

  const [cabinsSelected, setCabinsSelected] = useState<CabinsType[]>([]);
  const [isOpenCabins, setIsOpenCabins] = useState(false);

  // Hook de efeito responsável por buscar as rotas sempre que o aeroporto selecionado muda
  useEffect(() => {
    if (airportIdSelected !== 0) {
      getRoutes({
        airportIdSelected: airportIdSelected,
        setFilteredRoutes: setFilteredRoutes,
        setIsLoading: setIsLoading,
      });
    }
  }, [airportIdSelected]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Container principal do modal
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Conteúdo do modal */}
      <div className={`bg-gray-800 p-6 rounded shadow-lg h-fit w-10/12`}>
        <h1 className="text-center font-bold text-3xl mb-5 relative">Routes</h1>

        {/* Dropdown para selecionar o aeroporto e filtrar as rotas */}
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
          {/* Lista de aeroportos disponíveis */}
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.city} - {airport.airportCode}
            </option>
          ))}
        </select>

        {/* Exibição condicional com base na seleção do aeroporto */}
        {airportIdSelected !== 0 ? (
          isLoading ? (
            // Ícone de carregamento
            <FaSpinner className="animate-spin w-full my-5" size={40} />
          ) : filteredRoutes.length > 0 ? (
            // Tabela com as rotas encontradas
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
                  {/* Itera sobre cada rota filtrada e exibe seus dados */}
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="text-center bg-gray-600">
                      {/* Coluna com o programa de milhagem */}
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

                      {/* Coluna indicando se a rota permite conexões */}
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

                      {/* Coluna indicando se a rota está ativa */}
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

                      {/* Coluna listando os aeroportos envolvidos na rota */}
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

                      {/* Coluna com botão para visualizar as cabines da rota */}
                      <td className={classItens}>
                        <div className="flex w-full items-center justify-center">
                          <button
                            className="bg-green-500 py-2 px-5 rounded cursor-pointer hover:bg-green-600 flex flex-row gap-2 items-center"
                            onClick={() => {
                              setCabinsSelected(route.cabins);
                              setIsOpenCabins(true);
                            }}
                          >
                            <FaEye size={25} color="white" />{" "}
                            <label>({route.cabins.length})</label>
                          </button>
                        </div>
                      </td>

                      {/* Botão de edição da rota (ainda não implementado) */}
                      <td className={classItens}>
                        <button className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600">
                          Edit
                        </button>
                      </td>

                      {/* Botão para deletar a rota, executando a função de callback */}
                      <td className={classItens}>
                        <button
                          className="bg-red-500 py-2 px-3 rounded cursor-pointer hover:bg-red-600"
                          onClick={() => {
                            onDeleteRoute(route.id);
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
            // Exibição quando não há rotas registradas para o aeroporto
            <div className="mt-2 py-5 text-center text-gray-400 text-2xl">
              This airport has no routes registered.
            </div>
          )
        ) : null}

        {/* Botão para fechar o modal e resetar a seleção de aeroporto */}
        <button
          onClick={() => {
            onClose();
            setAirportIdSelected(0);
          }}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>

        <SeeCabins
          cabinsToShow={cabinsSelected}
          isOpen={isOpenCabins}
          onClose={() => {
            setCabinsSelected([]);
            setIsOpenCabins(false);
          }}
        />
      </div>
    </div>
  );
}
