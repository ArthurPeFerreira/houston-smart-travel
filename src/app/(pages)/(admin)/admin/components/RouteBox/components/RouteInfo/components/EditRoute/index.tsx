// Indica que este é um componente do lado do cliente (Next.js App Router)
"use client";

// Importações de tipos utilizados para edição e exibição de rotas
import { EditRouteType, RouteType } from "@/lib/route/types";

// Importação do componente Select e configurações do seletor customizado
import Select from "react-select";
import {
  customStyles,
  MileageProgramOption,
  options,
  ProgramOption,
  ProgramSingleValue,
} from "../../../../functions/selectMileageProgram";

// Hooks do React e utilitários
import { useEffect, useState } from "react";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { Cabin, CabinKey, cabinPriority, cabins } from "@/lib/route/cabins";
import Decimal from "decimal.js";

// Ícones utilizados nas ações
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

// Tipagem interna das cabines utilizadas no formulário de edição
interface CabinData {
  key: CabinKey;
  label: string;
  code: "Y" | "J" | "F" | "W";
  maximumPoints: number;
  bagsAmount: number;
  passagePriceFromAirport1To2: Decimal;
  passagePriceFromAirport2To1: Decimal;
  passagePriceRoundTrip: Decimal;
}

// Tipagem das props esperadas pelo modal de edição de rota
interface EditRouteModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: EditRouteType) => void;
  initialData: RouteType;
}

export default function EditRoute({
  isOpen,
  isLoading,
  onClose,
  onSave,
  initialData,
}: EditRouteModalProps) {
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  const [mileageProgram, setMileageProgram] =
    useState<MileageProgramOption | null>(null);
  const [enableLayovers, setEnableLayovers] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [cabinList, setCabinList] = useState<CabinData[]>([]);
  const [cabinToShow, setCabinToShow] = useState<Cabin[]>([]);
  const [cabinKey, setCabinKey] = useState<string>("");
  const [lastModifiedField, setLastModifiedField] = useState<{
    cabinKey: CabinKey;
    field: string;
  } | null>(null);

  useEffect(() => {
    if (!initialData) return;

    const program = mileagePrograms[initialData.mileageProgram];
    setMileageProgram({
      value: program.key,
      label: program.label,
      logoUrl: program.logoUrl,
    });

    setEnableLayovers(initialData.enableLayovers);
    setActive(initialData.active);

    setCabinList(
      initialData.cabins.map((cabin) => ({
        key: cabin.key as CabinKey,
        label: cabins[cabin.key as CabinKey].label,
        code: cabins[cabin.key as CabinKey].code,
        maximumPoints: cabin.maximumPoints,
        bagsAmount: cabin.bagsAmount,
        passagePriceFromAirport1To2: cabin.passagePriceFromAirport1To2,
        passagePriceFromAirport2To1: cabin.passagePriceFromAirport2To1,
        passagePriceRoundTrip: cabin.passagePriceRoundTrip,
      }))
    );

    setCabinToShow(
      Object.values(cabins).filter(
        (cabin) => !initialData.cabins.some((added) => added.key === cabin.key)
      )
    );
  }, [initialData]);

  useEffect(() => {
    if (
      !lastModifiedField ||
      !["passagePriceFromAirport1To2", "passagePriceFromAirport2To1"].includes(
        lastModifiedField.field
      )
    ) {
      return;
    }

    const updatedCabinList = cabinList.map((cabin) => {
      if (cabin.key !== lastModifiedField.cabinKey) return cabin;

      const from1to2 = Number(cabin.passagePriceFromAirport1To2);
      const from2to1 = Number(cabin.passagePriceFromAirport2To1);

      return {
        ...cabin,
        passagePriceRoundTrip: new Decimal(from1to2 + from2to1).toDecimalPlaces(
          2
        ),
      };
    });

    setCabinList(updatedCabinList);
    setLastModifiedField(null);
  }, [cabinList, lastModifiedField]);

  function addNewCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];

    setCabinToShow((prev) => prev.filter((item) => item.key !== cabinKey));

    setCabinList((prev) => {
      const newList = [
        ...prev,
        {
          key: cabin.key,
          label: cabin.label,
          code: cabin.code,
          maximumPoints: 0,
          bagsAmount: 0,
          passagePriceFromAirport1To2: Decimal(0),
          passagePriceFromAirport2To1: Decimal(0),
          passagePriceRoundTrip: Decimal(0),
        },
      ];
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });

    setCabinKey("");
  }

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

    setLastModifiedField({ cabinKey, field });
  }

  if (!isOpen) return null;
  return (
    // Container principal do modal com fundo escuro cobrindo toda a tela
    <div className="fixed inset-0 text-white flex items-center justify-center z-50 w-full h-full bg-gray-900">
      {/* Caixa interna do modal com padding e aparência arredondada */}
      <div className="bg-gray-800 p-6 rounded shadow-lg max-w-96 sm:max-w-11/12 w-fit max-h-11/12 overflow-y-auto">
        {/* Título centralizado do modal */}
        <h1 className="text-center font-bold text-3xl mb-5 relative">
          Edit Route
        </h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const cabinsToSend = cabinList.map((cabin) => ({
              key: cabin.key,
              maximumPoints: cabin.maximumPoints,
              bagsAmount: cabin.bagsAmount,
              passagePriceFromAirport1To2: cabin.passagePriceFromAirport1To2,
              passagePriceFromAirport2To1: cabin.passagePriceFromAirport2To1,
              passagePriceRoundTrip: cabin.passagePriceRoundTrip,
            }));

            const data: EditRouteType = {
              id: initialData.id,
              cabins: cabinsToSend,
              mileageProgram: mileageProgram?.value as string,
              enableLayovers,
              active,
            };

            onSave(data);
          }}
        >
          <div className="flex flex-col gap-2">
            {initialData.airports.map((airport) => (
              <div
                key={airport.id}
                className="bg-gray-700 p-2 rounded text-sm text-white"
              >
                {airport.city} - {airport.airportCode}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
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

                      {/* Aeroporto 1 -> Aeroporto 2 Preço de Venda */}
                      <div>
                        <label className="block mb-1 text-white">
                          <div className="flex flex-row gap-1 items-center">
                            {initialData.airports[0].airportCode}
                            <MdFlight className="rotate-90" size={20} />
                            {initialData.airports[1].airportCode}
                            <div>Sale Price (USD)</div>
                          </div>
                        </label>
                        <input
                          id={`${initialData.airports[0].id}->${initialData.airports[1].id} Price`}
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          value={Number(
                            cabin.passagePriceFromAirport1To2
                          )}
                          onChange={(e) =>
                            updateCabinField(
                              cabin.key,
                              "passagePriceFromAirport1To2",
                              Number(e.target.value)
                            )
                          }
                          className={inputs}
                          required
                          min={0}
                        />
                      </div>

                      {/* Aeroporto 2 -> Aeroporto 1 Preço de Venda */}
                      <div>
                        <label className="block mb-1 text-white">
                          <div className="flex flex-row gap-1 items-center">
                            {initialData.airports[1].airportCode}
                            <MdFlight className="rotate-90" size={20} />
                            {initialData.airports[0].airportCode}
                            <div>Sale Price (USD)</div>
                          </div>
                        </label>
                        <input
                          id={`${initialData.airports[1].id}->${initialData.airports[0].id} Price`}
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          value={Number(
                            cabin.passagePriceFromAirport2To1
                          )}
                          onChange={(e) =>
                            updateCabinField(
                              cabin.key,
                              "passagePriceFromAirport2To1",
                              Number(e.target.value)
                            )
                          }
                          className={inputs}
                          required
                          min={0}
                        />
                      </div>

                      {/* Viajem Completa Preço de Venda */}
                      <div>
                        <label className="block mb-1 text-white">
                          Rounded Trip Sale Price (USD)
                        </label>
                        <input
                          id="Sale Price"
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          value={Number(cabin.passagePriceRoundTrip)}
                          onChange={(e) =>
                            updateCabinField(
                              cabin.key,
                              "passagePriceRoundTrip",
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

            <div>
              <label className="block mb-1 text-white">Mileage Program</label>
              <Select<MileageProgramOption>
                instanceId="edit-mileage-program-select"
                inputId="edit-mileage-program-select"
                options={options}
                components={{
                  Option: ProgramOption,
                  SingleValue: ProgramSingleValue,
                }}
                styles={customStyles}
                defaultValue={mileageProgram}
                value={mileageProgram}
                onChange={(e) => setMileageProgram(e)}
              />
            </div>

            {/* Checkbox para permitir conexões na rota */}
            <div className="cursor-pointer">
              <input
                id="EditEnableLayovers"
                type="checkbox"
                checked={enableLayovers}
                onChange={(e) => {
                  setEnableLayovers(e.target.checked);
                }}
                className="mr-2"
              />
              <label
                htmlFor="EditEnableLayovers"
                className="text-white cursor-pointer"
              >
                Enable Layovers
              </label>
            </div>

            {/* Checkbox para permitir conexões na rota */}
            <div className="cursor-pointer">
              <input
                id="EditSetActive"
                type="checkbox"
                checked={active}
                onChange={(e) => {
                  setActive(e.target.checked);
                }}
                className="mr-2"
              />
              <label
                htmlFor="EditSetActive"
                className="text-white cursor-pointer"
              >
                Active
              </label>
            </div>
          </div>
          {/* Botões de ação do formulário */}
          <div className="flex justify-end">
            {/* Botão de cancelar */}
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
            >
              Cancel
            </button>

            {/* Botão de salvar ou indicador de carregamento */}
            {isLoading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
