"use client";

import { EditRouteType, RouteType } from "@/lib/route/types";

import Select from "react-select";
import {
  customStyles,
  MileageProgramOption,
  options,
  ProgramOption,
  ProgramSingleValue,
} from "../../../../functions/selectMileageProgram";
import { act, useEffect, useState } from "react";
import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { Cabin, CabinKey, cabinPriority, cabins } from "@/lib/route/cabins";
import Decimal from "decimal.js";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";

interface CabinData {
  key: CabinKey;
  label: string;
  code: "Y" | "J" | "F" | "W";
  maximumPoints: number;
  bagsAmount: number;
  passagePrice: Decimal;
  cancellationPrice: Decimal;
}

// Tipagem das propriedades esperadas pelo componente EditRoute
interface EditRouteModalProps {
  isOpen: boolean; // Define se o modal está visível
  isLoading: boolean;
  onClose: () => void; // Função para fechar o modal
  onSave: (data: EditRouteType) => void; // Função para fechar o modal
  initialData: RouteType; // Dados iniciais a serem exibidos no modal
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
  // Extrai o programa de milhagem baseado na chave fornecida
  const program = mileagePrograms[initialData.mileageProgram];

  const [mileageProgram, setMileageProgram] =
    useState<MileageProgramOption | null>(null);
  const [enableLayovers, setEnableLayovers] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [cabinList, setCabinList] = useState<CabinData[]>([]);
  const [cabinToShow, setCabinToShow] = useState<Cabin[]>([]);
  const [cabinKey, setCabinKey] = useState<string>("");

  useEffect(() => {
    if (!initialData) return;

    console.log(initialData);

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
        passagePrice: cabin.passagePrice,
        cancellationPrice: cabin.cancellationPrice,
      }))
    );

    setCabinToShow(
      Object.values(cabins).filter(
        (cabin) => !initialData.cabins.some((added) => added.key === cabin.key)
      )
    );
  }, [initialData]);

  // Adiciona uma nova cabine à lista de seleção
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

    // Reseta a seleção de cabine
    setCabinKey("");
  }

  // Remove uma cabine da lista adicionada
  function removeCabin(cabinKey: CabinKey) {
    const cabin = cabins[cabinKey];

    // Remove da lista de cabines selecionadas
    setCabinList((prev) => {
      const newList = prev.filter((item) => item.key !== cabinKey);
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });

    // Adiciona de volta à lista de cabines disponíveis
    setCabinToShow((prev) => {
      const newList = [...prev, cabin];
      return newList.sort(
        (a, b) => cabinPriority[a.key] - cabinPriority[b.key]
      );
    });
  }

  // Atualiza um campo numérico de uma cabine específica
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

  // Se o modal não estiver aberto, retorna null para não renderizar nada
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
              passagePrice: cabin.passagePrice,
              cancellationPrice: cabin.cancellationPrice,
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
