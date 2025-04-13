/* eslint-disable @typescript-eslint/no-explicit-any */
// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Hooks do React para controle de estado e efeito
import { useState } from "react";

// Importação do componente Select do react-select para dropdowns customizados
import Select from "react-select";

// Tipagem dos dados de aeroporto
import { AirportType } from "@/lib/airport/types";

// Dados e tipos relacionados às cabines (classes de voo)
import { Cabin, CabinKey, cabinPriority, cabins } from "@/lib/route/cabins";

// Ícones para ações visuais
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";

// Biblioteca para operações com números decimais
import Decimal from "decimal.js";

// Tipagem do objeto de criação de rota
import { CreateRouteType, EditRouteType, RouteType } from "@/lib/route/types";

// Configurações e instância do toast para notificações
import { toastConfigs } from "@/lib/toastify/toastify";
import { toast } from "react-toastify";
import { api } from "@/lib/api/api";
import RouteInfo from "./components/RouteInfo";
import getRoutes from "./functions/getRoutes";
import {
  customStyles,
  MileageProgramOption,
  options,
  ProgramOption,
  ProgramSingleValue,
} from "./functions/selectMileageProgram";
import eventEmitter from "@/lib/event/eventEmmiter";

// Tipagem interna das cabines utilizadas no componente
interface CabinData {
  key: CabinKey; // Identificador único da cabine (econômica, executiva etc.)
  label: string; // Nome descritivo da cabine
  code: "Y" | "J" | "F" | "W"; // Código IATA da classe (Y: econômica, J: executiva etc.)
  maximumPoints: number; // Pontos máximos permitidos pelo programa de milhagem
  bagsAmount: number; // Quantidade de bagagens permitidas
  passagePrice: Decimal; // Preço da passagem em dólares
  cancellationPrice: Decimal; // Taxa de cancelamento em dólares
}

// Tipagem das props recebidas pelo componente RouteBox
interface RouteBoxProps {
  airportsInitialData: AirportType[] | undefined; // Lista inicial de aeroportos, opcional
}

// Componente principal responsável pela criação de rotas entre dois aeroportos
export default function RouteBox({ airportsInitialData }: RouteBoxProps) {
  // Classe de estilo aplicada a todos os inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Inicialização da lista de aeroportos (vinda de props)
  const airports = airportsInitialData ? airportsInitialData : [];

  // Lista de aeroportos filtrados para seleção como destino
  const [airport2Select, setAirport2Select] = useState<AirportType[]>([]);

  // Estados para armazenar os IDs dos aeroportos selecionados (origem e destino)
  const [airportId1, setAirportId1] = useState<number>(0);
  const [airportId2, setAirportId2] = useState<number>(0);

  // Estado do identificador da cabine selecionada antes de ser adicionada à lista
  const [cabinKey, setCabinKey] = useState<string>("");

  // Estado do programa de milhagem atualmente selecionado
  const [mileageProgram, setMileageProgram] =
    useState<MileageProgramOption | null>(options[0]);

  // Lista de cabines adicionadas à rota atual
  const [cabinList, setCabinList] = useState<CabinData[]>([]);

  // Lista de cabines disponíveis para adicionar (controla quais não estão ainda em uso)
  const [cabinToShow, setCabinToShow] = useState<Cabin[]>(
    Object.values(cabins).map((cabin) => cabin)
  );

  // Define se conexões (layovers) são permitidas na rota
  const [enableLayovers, setEnableLayovers] = useState<boolean>(false);

  // Indicadores de carregamento para o botão de criação de rota e modais
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRoutesInfoModal, setLoadingRoutesInfoModal] =
    useState<boolean>(true);
  const [loadingEditRouteModal, setLoadingEditRouteModal] =
    useState<boolean>(false);

  // Controle de visibilidade dos modais de visualização e edição de rotas
  const [showRoutesInfoModal, setShowRoutesInfoModal] =
    useState<boolean>(false);
  const [showEditRouteModal, setShowEditRouteModal] = useState<boolean>(false);

  // Estado do aeroporto atualmente selecionado para filtragem de rotas
  const [airportIdSelected, setAirportIdSelected] = useState<number>(0);

  // Lista de rotas filtradas com base no aeroporto selecionado
  const [filteredRoutes, setFilteredRoutes] = useState<RouteType[]>([]);

  // Envia a requisição para criar uma nova rota com os dados preenchidos no formulário
  async function handleCreateRoute(e: React.FormEvent) {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!mileageProgram || !mileageProgram?.value) {
      toast.error("Please select the mileage program", toastConfigs);
      return;
    }
    if (!airportId1) {
      toast.error("Please select airport 1", toastConfigs);
      return;
    }
    if (!airportId2) {
      toast.error("Please select airport 2", toastConfigs);
      return;
    }
    if (!cabinList || cabinList.length == 0) {
      toast.error("Please select at least one cabin", toastConfigs);
      return;
    }

    // Criação do objeto de rota a ser enviado à API
    const route: CreateRouteType = {
      mileageProgram: mileageProgram.value,
      enableLayovers: enableLayovers,
      airportsId:
        airportId1 < airportId2
          ? [airportId1, airportId2]
          : [airportId2, airportId1],
      cabins: cabinList.map((cabin) => ({
        key: cabin.key,
        maximumPoints: cabin.maximumPoints,
        bagsAmount: cabin.bagsAmount,
        passagePrice: cabin.passagePrice,
        cancellationPrice: cabin.cancellationPrice,
      })),
    };

    try {
      setLoading(true);
      await api.post("api/admin/route", route);
      toast.success("Route created successfully!", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to create route.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      // Reseta os campos após tentativa de criação
      setAirportId1(0);
      setAirportId2(0);
      setAirport2Select([]);
      setEnableLayovers(false);
      setLoading(false);
    }
  }

  // Atualiza rota existente com dados fornecidos no modal de edição
  async function handleEditRoute(data: EditRouteType) {
    setLoadingEditRouteModal(true);
    try {
      await api.put(`api/admin/route/${data.id}`, data);
      toast.success("Route edited successfully!", toastConfigs);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to edit route.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      eventEmitter.emit("updateRoutes");
      setLoadingEditRouteModal(false);
      setShowEditRouteModal(false);
    }
  }

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
        setIsLoading: setLoadingRoutesInfoModal,
      });
    }
  }

  // Ao selecionar o aeroporto 1, busca os possíveis destinos ainda não relacionados
  async function handleSelectAirport1(id: number) {
    try {
      setAirport2Select([]);
      setAirportId1(id);
      const data = await api.get(`/api/admin/route/filter/${id}/no-route`);
      setAirport2Select(data.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to get airports.";
      toast.error(errorMessage, toastConfigs);
    }
  }

  // Adiciona nova cabine à rota e remove da lista de disponíveis
  function addNewCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];

    // Remove a cabine da lista de disponíveis
    setCabinToShow((prev) => prev.filter((item) => item.key !== cabinKey));

    // Adiciona a nova cabine e reordena conforme prioridade
    setCabinList((prev) => {
      const newList = [
        ...prev,
        {
          key: cabin.key,
          label: cabin.label,
          code: cabin.code,
          maximumPoints: 0,
          bagsAmount: 0,
          passagePrice: Decimal(0),
          cancellationPrice: Decimal(0),
        },
      ];
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });

    setCabinKey("");
  }

  // Remove cabine da lista atual e adiciona de volta na lista de disponíveis
  function removeCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];

    setCabinList((prev) => {
      const newList = prev.filter((item) => item.key !== cabinKey);
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });

    setCabinToShow((prev) => {
      const newList = [...prev, cabin];
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });
  }

  // Atualiza um campo numérico específico de uma cabine na lista
  function updateCabinField(
    cabinKey: CabinKey,
    field: keyof Omit<CabinData, "key" | "label" | "code">,
    value: number
  ) {
    setCabinList((prev) =>
      prev.map((cabin) =>
        cabin.key === cabinKey ? { ...cabin, [field]: value } : cabin
      )
    );
  }

  return (
    // Container principal centralizado na tela
    <div className="mt-10 flex items-center justify-center">
      {/* Caixa visual do formulário */}
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título da seção de criação de rota */}
        <h1 className="text-center font-bold text-3xl">Create New Route</h1>

        {/* Formulário de criação de rota */}
        <form
          className="w-full mt-4 flex flex-col gap-4"
          onSubmit={handleCreateRoute}
        >
          {/* Campo de seleção do primeiro aeroporto */}
          <div>
            <label className="block mb-1 text-white">Airport 1</label>
            <select
              name="airport1"
              id="airport1"
              className={`${inputs} invalid:text-gray-500`}
              onChange={(e) => handleSelectAirport1(Number(e.target.value))}
              value={airportId1}
              required
            >
              {/* Opção inicial desabilitada */}
              <option value={0} disabled className="text-gray-400">
                Select an airport
              </option>
              {/* Lista dinâmica de aeroportos disponíveis */}
              {airports.map((airport) => (
                <option
                  value={airport.id}
                  key={airport.id}
                  className="text-white"
                >
                  {airport.city} - {airport.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de seleção do segundo aeroporto */}
          <div>
            <label className="block mb-1 text-white">Airport 2</label>
            <select
              name="airport2"
              id="airport2"
              className={`${inputs} invalid:text-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed`}
              onChange={(e) => setAirportId2(Number(e.target.value))}
              value={airportId2}
              disabled={airport2Select.length === 0}
              required
            >
              {/* Opção inicial desabilitada */}
              <option value={0} disabled className="text-gray-400">
                Select an airport
              </option>
              {/* Lista dinâmica de aeroportos disponíveis */}
              {airport2Select.map((airport) => (
                <option
                  value={airport.id}
                  key={airport.id}
                  className="text-white"
                >
                  {airport.city} - {airport.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* Seção de seleção e adição de cabines à rota */}
          <div className="flex flex-col">
            <label className="block mb-1 text-white">Cabins</label>
            <div className="flex flex-row gap-2 items-center">
              {/* Dropdown de cabines disponíveis */}
              <select
                name="cabins"
                id="cabins"
                className={inputs}
                onChange={(e) => {
                  setCabinKey(e.target.value as CabinKey);
                }}
                value={cabinKey}
              >
                <option value="" disabled>
                  Select a cabin
                </option>
                {/* Lista de cabines que ainda podem ser adicionadas */}
                {cabinToShow.map((cabin) => (
                  <option key={cabin.key} value={cabin.key}>
                    {cabin.label} - {cabin.code}
                  </option>
                ))}
              </select>
              {/* Botão para adicionar nova cabine à lista */}
              <button
                disabled={!cabinKey}
                onClick={() => addNewCabin(cabinKey as CabinKey)}
                className="p-2 h-fit bg-green-500 cursor-pointer rounded-full hover:bg-green-600 disabled:cursor-no-drop"
              >
                <FaPlus />
              </button>
            </div>

            {/* Lista visual de cabines já adicionadas */}
            {cabinList.length > 0 && (
              <div
                className={`pt-2 gap-4 ${
                  cabinList.length > 1
                    ? "grid grid-cols-1 sm:grid-cols-2"
                    : "flex flex-col"
                }`}
              >
                {/* Para cada cabine adicionada, exibe um painel com seus campos */}
                {cabinList.map((cabin) => (
                  <div
                    key={cabin.key}
                    className="w-full bg-gray-700 py-2 px-3 rounded-lg"
                  >
                    {/* Cabeçalho com nome da cabine e botão de remoção */}
                    <div className="flex flex-row justify-between items-center bg-gray-900 p-2 rounded mb-2">
                      <label>
                        {cabin.label} - {cabin.code}
                      </label>
                      {/* Botão para remover a cabine */}
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeCabin(cabin.key as CabinKey)}
                      >
                        <FaTrash size={24} />
                      </button>
                    </div>

                    {/* Campo de pontos máximos permitidos */}
                    <div>
                      <label className="block mb-1 text-white">
                        Maximum Mileage Program Points
                      </label>
                      <input
                        id="Maximum Mileage Program Points"
                        type="number"
                        inputMode="decimal"
                        step="1"
                        value={cabin.maximumPoints}
                        onChange={(e) =>
                          updateCabinField(
                            cabin.key,
                            "maximumPoints",
                            Number(e.target.value)
                          )
                        }
                        className={inputs}
                        required
                        min={0}
                      />
                    </div>

                    {/* Campo da quantidade de Bagagens */}
                    <div>
                      <label className="block mb-1 text-white">
                        Bags Amount
                      </label>
                      <input
                        id="Bags Amount"
                        type="number"
                        inputMode="decimal"
                        step="1"
                        value={Number(cabin.bagsAmount)}
                        onChange={(e) =>
                          updateCabinField(
                            cabin.key,
                            "bagsAmount",
                            Number(e.target.value)
                          )
                        }
                        className={inputs}
                        required
                        min={0}
                      />
                    </div>

                    {/* Campo de preço da passagem */}
                    <div>
                      <label className="block mb-1 text-white">
                        Sale Price (USD)
                      </label>
                      <input
                        id="Sale Price"
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        value={Number(cabin.passagePrice)}
                        onChange={(e) =>
                          updateCabinField(
                            cabin.key,
                            "passagePrice",
                            Number(e.target.value)
                          )
                        }
                        className={inputs}
                        required
                        min={0}
                      />
                    </div>

                    {/* Campo de taxa de cancelamento */}
                    <div>
                      <label className="block mb-1 text-white">
                        Cancelation Fee (USD)
                      </label>
                      <input
                        id="Cancelation Fee"
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        value={Number(cabin.cancellationPrice)}
                        onChange={(e) =>
                          updateCabinField(
                            cabin.key,
                            "cancellationPrice",
                            Number(e.target.value)
                          )
                        }
                        className={inputs}
                        required
                        min={0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seção de seleção do programa de milhagem */}
          <div>
            <label className="block mb-1 text-white">Mileage Program</label>
            <Select<MileageProgramOption>
              instanceId="mileage-program-select"
              inputId="mileage-program-select"
              options={options}
              components={{
                Option: ProgramOption,
                SingleValue: ProgramSingleValue,
              }}
              styles={customStyles}
              defaultValue={options[0]}
              value={mileageProgram}
              onChange={(e) => setMileageProgram(e)}
            />
          </div>

          {/* Checkbox para permitir conexões na rota */}
          <div className="cursor-pointer">
            <input
              id="EnableLayovers"
              type="checkbox"
              checked={enableLayovers}
              onChange={(e) => {
                setEnableLayovers(e.target.checked);
              }}
              className="mr-2"
            />
            <label
              htmlFor="EnableLayovers"
              className="text-white cursor-pointer"
            >
              Enable Layovers
            </label>
          </div>

          {/* Botão de envio para criar a nova rota */}
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex justify-center items-center"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={24} />
            ) : (
              "Create"
            )}
          </button>
        </form>

        {/* Link para visualizar rotas cadastrados */}
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowRoutesInfoModal(true);
            document.body.classList.add("overflow-hidden");
          }}
        >
          See Routes
        </button>

        <RouteInfo
          airports={airports}
          isOpen={showRoutesInfoModal}
          isOpenEditModal={showEditRouteModal}
          setIsOpenEditModal={() => setShowEditRouteModal(true)}
          onClose={() => {
            setShowRoutesInfoModal(false);
            document.body.classList.remove("overflow-hidden");
          }}
          onCloseEditModal={() => setShowEditRouteModal(false)}
          isLoading={loadingRoutesInfoModal}
          isLoadingEditModal={loadingEditRouteModal}
          setIsLoading={(value: boolean) => setLoadingRoutesInfoModal(value)}
          airportIdSelected={airportIdSelected}
          setAirportIdSelected={setAirportIdSelected}
          filteredRoutes={filteredRoutes}
          setFilteredRoutes={setFilteredRoutes}
          onDeleteRoute={handleDeleteRoute}
          onEditRoute={(data) => handleEditRoute(data)}
        />
      </div>
    </div>
  );
}
