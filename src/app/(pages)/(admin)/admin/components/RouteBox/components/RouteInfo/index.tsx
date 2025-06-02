// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importações de tipos e dependências necessárias para funcionamento do componente
import { AirportType } from "@/lib/airport/types";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { CabinsType, EditRouteType, RouteType } from "@/lib/route/types";
import { useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import Image from "next/image";
import SeeCabins from "./components/SeeCabins";
import EditRoute from "./components/EditRoute";
import { toastConfigs } from "@/lib/toastify/toastify";
import { toast } from "react-toastify";
import { api } from "@/lib/api/api";

// Tipagem das props esperadas pelo modal de informações de rotas
interface RouteInfoModalProps {
  airports: AirportType[];
  isOpen: boolean;
  isOpenEditModal: boolean;
  setIsOpenEditModal: () => void;
  onClose: () => void;
  onCloseEditModal: () => void;
  isLoading: boolean;
  isLoadingEditModal: boolean;
  airportIdSelected: number;
  setAirportIdSelected: (value: number) => void;
  filteredRoutes: RouteType[];
  onDeleteRoute: (routeId: number) => void;
  onEditRoute: (route: EditRouteType) => void;
}

// Componente responsável por exibir um modal com as rotas filtradas por aeroporto
export default function RouteInfo({
  airports,
  isOpen,
  isOpenEditModal,
  setIsOpenEditModal,
  onClose,
  onCloseEditModal,
  isLoading,
  isLoadingEditModal,
  airportIdSelected,
  setAirportIdSelected,
  filteredRoutes,
  onDeleteRoute,
  onEditRoute,
}: RouteInfoModalProps) {
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

  async function handleClick() {
    setIsLoadingUpdateRoutes(true); // Ativa o loading

    try {
      await api.get("http://54.204.244.247:8000/update");

      toast.success("Update routes request sent successfully.", toastConfigs);
    } catch (error) {
      console.log(error)
      toast.error("Error updating routes.", toastConfigs);
    } finally {
      setIsLoadingUpdateRoutes(false);
    }
  }

  // Verifica se o modal deve ser exibido
  if (!isOpen) return null;

  return (
    // Camada de sobreposição do modal, preenchendo toda a tela
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Conteúdo interno do modal */}
      <div className={`bg-gray-800 p-6 rounded shadow-lg h-fit w-10/12`}>
        {/* Título do modal */}
        <h1 className="text-center font-bold text-3xl mb-5 relative">
          Routes
          <div className="mt-2 sm:mt-0 sm:absolute top-0 left-0 text-sm md:text-lg font-normal">
            <button
              onClick={() => {
                handleClick();
              }}
              className="bg-blue-500 py-2 px-5 rounded cursor-pointer hover:bg-blue-600"
            >
              {isLoadingUpdateRoutes ? (
                <FaSpinner className="animate-spin" size={24} />
              ) : (
                "Save New Order"
              )}
            </button>
          </div>
        </h1>

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
          isLoading ? (
            // Ícone de carregamento enquanto os dados são carregados
            <FaSpinner className="animate-spin w-full my-5" size={40} />
          ) : filteredRoutes.length > 0 ? (
            // Tabela com as rotas existentes
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
                              className="bg-gray-800 p-2 rounded text-sm text-white"
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

                      {/* Botão de edição da rota, abrindo o modal com os dados atuais */}
                      <td className={classItens}>
                        <button
                          className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
                          onClick={() => {
                            setRouteToEdit(route);
                            setIsOpenEditModal();
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
            // Mensagem caso não haja rotas cadastradas
            <div className="mt-2 py-5 text-center text-gray-400 text-2xl">
              This airport has no routes registered.
            </div>
          )
        ) : null}

        {/* Botão para fechar o modal e limpar seleção de aeroporto */}
        <button
          onClick={() => {
            onClose();
            setAirportIdSelected(0);
          }}
          className="w-full p-2 mt-3 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>

        {/* Modal que exibe as cabines da rota selecionada */}
        {airport1Selected && airport2Selected && (
          <SeeCabins
            airport1={airport1Selected}
            airport2={airport2Selected}
            cabinsToShow={cabinsSelected}
            isOpen={isOpenCabins}
            onClose={() => {
              setCabinsSelected([]);
              setIsOpenCabins(false);
            }}
          />
        )}

        {/* Modal de edição da rota (condicional) */}
        {routeToEdit ? (
          <EditRoute
            isOpen={isOpenEditModal}
            isLoading={isLoadingEditModal}
            onClose={() => {
              onCloseEditModal();
              setRouteToEdit(undefined);
            }}
            onSave={(data) => onEditRoute(data)}
            initialData={routeToEdit}
          />
        ) : null}
      </div>
    </div>
  );
}
