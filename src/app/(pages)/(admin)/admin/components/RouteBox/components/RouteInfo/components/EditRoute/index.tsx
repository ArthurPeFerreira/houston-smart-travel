"use client"; // Indica que este é um componente do lado do cliente no Next.js (App Router)

// Importa o componente customizado Select e suas configurações específicas
import Select from "react-select";
import {
  customStyles,
  MileageProgramOption,
  options,
  ProgramOption,
  ProgramSingleValue,
} from "../../../../functions/selectMileageProgram";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Importa dados e tipagens relacionadas às cabines e rotas
import { Cabin, CabinKey, cabinPriority, cabins } from "@/lib/route/cabins";
import { MdFlight } from "react-icons/md";
import { EditRouteType, RouteType } from "@/lib/route/types";
import Decimal from "decimal.js";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { CustomSelect } from "@/app/(pages)/(public)/components/CustomSelect";

// Tipagem dos dados da cabine usados no formulário
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

// Propriedades esperadas pelo componente EditRoute
interface EditRouteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData: RouteType;
  onEdit: (data: EditRouteType) => void;
  loading: boolean;
}

// Componente principal para edição de rotas de voo com programas de milhagem e diferentes cabines
export default function EditRoute({
  isOpen,
  setIsOpen,
  initialData,
  onEdit,
  loading,
}: EditRouteProps) {
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

  // Preenche o formulário com os dados da rota que está sendo editada
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

    // Define quais cabines ainda podem ser adicionadas à rota
    setCabinToShow(
      Object.values(cabins).filter(
        (cabin) => !initialData.cabins.some((added) => added.key === cabin.key)
      )
    );
  }, [initialData]);

  // Recalcula automaticamente o valor da viagem de ida e volta quando algum dos dois trechos é alterado
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

  // Adiciona uma nova cabine à rota com valores iniciais zerados
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

  // Remove uma cabine da rota e a torna novamente disponível para adição
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

  // Atualiza um campo específico de uma cabine
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

  // Renderização principal
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 sm:w-full max-w-fit border-none text-white max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Route
          </DialogTitle>
        </DialogHeader>

        {/* Formulário principal */}
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

            onEdit(data);
          }}
        >
          {/* Lista de aeroportos envolvidos na rota */}
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

          {/* Seletor de programa de milhagem */}
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

          <div className="flex flex-col gap-2">
            {/* Seção de seleção e adição de cabines à rota */}

            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-end">
                {/* Dropdown de cabines disponíveis */}
                <CustomSelect
                  options={cabinToShow.map((cabin) => ({
                    label: `${cabin.label} - ${cabin.code}`,
                    value: cabin.key,
                  }))}
                  value={cabinKey}
                  setValue={setCabinKey}
                  key="cabins"
                  placeholder="Select a cabin"
                  label="Cabins"
                  disabled={false}
                  required={false}
                />
                {/* Botão para adicionar nova cabine à lista */}
                <button
                  disabled={!cabinKey}
                  onClick={() => addNewCabin(cabinKey as CabinKey)}
                  className="p-2 h-fit bg-green-500 cursor-pointer rounded-full hover:bg-green-600 disabled:cursor-no-drop mb-[6px]"
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
                          value={Number(cabin.passagePriceFromAirport1To2)}
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
                          value={Number(cabin.passagePriceFromAirport2To1)}
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
          {/* Botões de ação */}
          <div className="flex w-full ">
            {/* Botão de salvar com loading spinner quando a ação está em andamento */}
            {loading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center"
              >
                Save
              </button>
            )}
          </div>
        </form>

        {/* Botão para fechar o modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
