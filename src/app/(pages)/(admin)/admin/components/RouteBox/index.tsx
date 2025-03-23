// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Hooks do React para controle de estado e efeito
import { useEffect, useState } from "react";

// Importação do componente Select do react-select para dropdowns customizados
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

// Tipagem dos dados de aeroporto
import { AirportType } from "@/lib/airport/types";

// Dados e tipos relacionados às cabines (classes de voo)
import { Cabin, CabinKey, cabins } from "@/lib/routes/cabins";

// Ícones para ações visuais
import { FaPlus, FaTrash } from "react-icons/fa";

// Lista de programas de milhagem
import { mileagePrograms } from "@/lib/routes/mileagePrograms";

// Tipagem para opções de programa de milhagem usadas no Select
interface MileageProgramOption {
  value: string;
  label: string;
  logoUrl: string;
}

// Props esperadas pelo componente
interface LocalBoxProps {
  airportsInitialData: AirportType[] | undefined;
}

// Componente principal para criação de rotas entre aeroportos
export default function RouteBox({ airportsInitialData }: LocalBoxProps) {
  // Classe base de estilo para inputs reutilizável
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estado que armazena os aeroportos disponíveis
  const [airports, setAirports] = useState<AirportType[]>(
    airportsInitialData ? airportsInitialData : []
  );

  // Estados para seleção dos aeroportos da rota
  const [airportId1, setAirportId1] = useState<number>(0);
  const [airportId2, setAirportId2] = useState<number>(0);

  // Estado para quantidade máxima de pontos na rota
  const [maxPoints, setMaxPoints] = useState<number>(0);

  // Estado para armazenar a cabine selecionada temporariamente
  const [cabinKey, setCabinKey] = useState<string>("");

  // Lista de cabines adicionadas à rota
  const [cabinList, setCabinList] = useState<Cabin[]>([]);

  // Lista de cabines disponíveis para adicionar
  const [cabinToShow, setCabinToShow] = useState<Cabin[]>(
    Object.values(cabins).map((cabin) => cabin)
  );

  // Efeito de montagem (reserva para lógica futura)
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // (vazio no momento)
      } catch {
        console.error("Failed to Find Initial Data!");
      }
    }
    fetchInitialData();
  }, []);

  // Manipula o envio do formulário
  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    handleCreateRoute();
    
  }

  // Função responsável por criar a rota (lógica futura)
  function handleCreateRoute() {
    setAirports(airportsInitialData ? airportsInitialData : [])
  }

  // Mapeia os programas de milhagem para opções do Select
  const options: MileageProgramOption[] = Object.values(mileagePrograms).map(
    (program) => ({
      value: program.key,
      label: program.label,
      logoUrl: program.logoUrl,
    })
  );

  // Estilização customizada do Select (react-select)
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#101828",
      borderColor: "#4b5563",
      color: "#fff",
      borderRadius: "0.25rem",
      minHeight: "auto",
      height: "auto",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4b5563",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#fff",
      padding: "0",
      svg: {
        width: "16px",
        height: "16px",
      },
      "&:hover": {
        color: "#fff",
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#101828",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1967d2" : "#101828",
      color: "#fff",
      ":hover": {
        backgroundColor: "#1967d2",
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
  };

  // Componente customizado de opção do Select com logo e label
  function ProgramOption(props: OptionProps<MileageProgramOption>) {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.logoUrl} alt={data.label} className="w-5 h-5 mr-2" />
          {data.label}
        </div>
      </components.Option>
    );
  }

  // Componente customizado para exibir o valor selecionado com logo
  function ProgramSingleValue(props: SingleValueProps<MileageProgramOption>) {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.logoUrl} alt={data.label} className="w-5 h-5 mr-2" />
          {data.label}
        </div>
      </components.SingleValue>
    );
  }

  // Adiciona uma cabine à lista de seleção
  function addNewCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];
    setCabinToShow((prev) => prev.filter((item) => item.key !== cabinKey));
    setCabinList((prev) => [...prev, cabin]);
    setCabinKey("");
  }

  // Remove uma cabine da lista de seleção
  function removeCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];
    setCabinList((prev) => prev.filter((item) => item.key !== cabinKey));
    setCabinToShow((prev) => [...prev, cabin]);
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título principal */}
        <h1 className="text-center font-bold text-3xl">Create New Route</h1>

        {/* Formulário para criação da rota */}
        <form
          className="w-full mt-4 flex flex-col gap-4"
          onSubmit={handleSubmitForm}
        >
          {/* Seleção do primeiro aeroporto */}
          <div>
            <label className="block mb-1 text-white">Airport 1</label>
            <select
              name="airport1"
              id="airport1"
              className={`${inputs} invalid:text-gray-500`}
              onChange={(e) => setAirportId1(Number(e.target.value))}
              value={airportId1}
              required
            >
              <option value={0} disabled className="text-gray-400">
                Select an airport
              </option>
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

          {/* Seleção do segundo aeroporto */}
          <div>
            <label className="block mb-1 text-white">Airport 2</label>
            <select
              name="airport2"
              id="airport2"
              className={`${inputs} invalid:text-gray-500`}
              onChange={(e) => setAirportId2(Number(e.target.value))}
              value={airportId2}
              required
            >
              <option value={0} disabled className="text-gray-400">
                Select an airport
              </option>
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

          {/* Seleção de cabines da rota */}
          <div className="flex flex-col">
            <label className="block mb-1 text-white">Cabins</label>
            <div className="flex flex-row gap-2 items-center">
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
                {cabinToShow.map((cabin) => (
                  <option key={cabin.key} value={cabin.key}>
                    {cabin.label} - {cabin.code}
                  </option>
                ))}
              </select>
              {/* Botão para adicionar cabine */}
              <button
                disabled={!cabinKey}
                onClick={() => addNewCabin(cabinKey as CabinKey)}
                className="p-2 h-fit bg-green-500 cursor-pointer rounded-full hover:bg-green-600 disabled:cursor-no-drop"
              >
                <FaPlus />
              </button>
            </div>

            {/* Lista de cabines adicionadas */}
            {cabinList.length > 0 && (
              <div className="flex flex-col pt-2 gap-2">
                {cabinList.map((cabin) => (
                  <div
                    key={cabin.key}
                    className="w-full flex flex-row justify-between items-center bg-gray-700 py-2 px-3 rounded-lg"
                  >
                    <label>
                      {cabin.label} - {cabin.code}
                    </label>
                    {/* Botão para remover cabine */}
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeCabin(cabin.key as CabinKey)}
                    >
                      <FaTrash size={24} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seleção do programa de milhagem */}
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
            />
          </div>

          {/* Campo para pontos máximos da rota */}
          <div>
            <label className="block mb-1 text-white">Maximum Points</label>
            <input
              id="aiport code"
              type="number"
              value={maxPoints}
              placeholder="Type airport code"
              onChange={(e) => setMaxPoints(Number(e.target.value))}
              className={inputs}
              required
              min={0}
            />
          </div>

          {/* Botão para criar a rota */}
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Create
          </button>
        </form>

        {/* Link visual para ver as rotas (ainda não funcional) */}
        <label className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline">
          See Routes
        </label>
      </div>
    </div>
  );
}
