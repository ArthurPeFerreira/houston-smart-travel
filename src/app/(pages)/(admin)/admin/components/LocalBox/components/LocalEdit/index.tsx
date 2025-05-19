"use client";

import { api } from "@/lib/api/api";
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";
import { toastConfigs } from "@/lib/toastify/toastify";
import Decimal from "decimal.js";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

// Interface que define as props esperadas pelo componente LocalEdit
interface LocalEditProps {
  isOpen: boolean; // Controla a exibição do modal
  onClose: () => void; // Função chamada para fechar o modal
  handleEditLocal: (data: EditLocalTypeFile) => void; // Função que executa a lógica de edição do local
  isLoading: boolean; // Indica se a operação de salvamento está em andamento
  local: LocalType; // Objeto com os dados do local a ser editado
}

// Componente que renderiza o modal de edição de um local
export default function LocalEdit({
  isOpen,
  onClose,
  handleEditLocal,
  isLoading,
  local,
}: LocalEditProps) {
  // Classe base reutilizável para os inputs de texto
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados locais para armazenar os dados do formulário
  const [city, setCity] = useState<string>(""); // Nome da cidade
  const [country, setCountry] = useState<string>("");
  const [passagePrice, setPassagePrice] = useState<Decimal>(Decimal(0.0));
  const [active, setActive] = useState<boolean>(false); // Status de atividade do local
  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null); // Arquivo de imagem selecionado
  const [previewEdit, setPreviewEdit] = useState<string | null>(null); // Preview da imagem selecionada

  // useEffect para inicializar os campos do formulário com os dados recebidos via props
  useEffect(() => {
    async function setInitialData() {
      try {
        // preenche campos de texto
        setCity(local.city);
        setCountry(local.country);
        setPassagePrice(local.passagePrice);
        setActive(local.active);

        // preview imediato da imagem atual
        const cdnUrl = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/locals/${local.image}`;
        setPreviewEdit(cdnUrl);

        // baixa como BLOB (axios já devolve o blob)
        const { data: blob } = await api.get(cdnUrl, {
          responseType: "blob",
        });

        // Converte em File e guarda no state
        const file = new File([blob], local.image, { type: blob.type });
        setSelectedEditFile(file);
      } catch{
        toast.error("Error loading image!", toastConfigs);
      }
    }

    setInitialData(); // roda sempre que 'local' mudar
  }, [local]);

  // Manipulador de mudança no input de arquivo (imagem)
  function handleEditFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Remove preview anterior se existir
      if (previewEdit) {
        URL.revokeObjectURL(previewEdit);
      }

      const newPreview = URL.createObjectURL(file); // Cria novo preview
      setSelectedEditFile(file); // Atualiza o arquivo selecionado
      setPreviewEdit(newPreview); // Atualiza o preview
      e.target.value = ""; // Limpa o valor do input
    }
  }

  // Se o modal não estiver aberto, retorna null
  if (!isOpen) return null;

  return (
    // Container do modal, centralizado e com fundo escuro
    <div className="fixed inset-0 flex items-center justify-center z-100 bg-gray-900">
      {/* Conteúdo do modal com limite de largura */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
        {/* Título do modal */}
        <h1 className="text-center font-bold text-3xl">Edit Local</h1>

        {/* Formulário de edição */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!selectedEditFile) {
              toast.error("Please select an image!", toastConfigs);
              return;
            }

            // Chama a função de edição passando os dados atualizados
            handleEditLocal({
              active: active,
              airportId: local.airport.id,
              city: city,
              image: selectedEditFile,
              country: country,
              passagePrice: passagePrice,
            });
          }}
        >
          {/* Campo de texto para o nome da cidade */}
          <label className="block mb-1 text-white mt-4">City</label>
          <input
            id="city local edit"
            type="text"
            value={city}
            placeholder="Type airport city"
            onChange={(e) => setCity(e.target.value)}
            className={inputs}
            required
          />

          {/* Input para nome da cidade */}
          <label className="block mb-1 text-white mt-4">Country</label>
          <input
            id="local country edit"
            type="text"
            value={country}
            placeholder="Type airport country"
            onChange={(e) => setCountry(e.target.value)}
            className={inputs}
            required
          />

          <label className="block mb-1 text-white mt-4">Passage Price</label>
          <input
            id="passage price edit"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={Number(passagePrice)}
            onChange={(e) => setPassagePrice(Decimal(e.target.value))}
            className={inputs}
            required
            min={0}
          />

          {/* Checkbox para indicar se o local está ativo */}
          <div className="mt-2 cursor-pointer">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => {
                setActive(e.target.checked);
              }}
              className="mr-2"
            />
            <label htmlFor="active" className="text-white cursor-pointer">
              Active
            </label>
          </div>

          {/* Seção de upload de imagem */}
          <div className="mt-2">
            {/* Input de arquivo oculto */}
            <input
              type="file"
              id="fileEdit"
              accept="image/*"
              onChange={handleEditFileChange}
              className="hidden"
            />
            {/* Label que aciona o input de imagem */}
            <label
              htmlFor="fileEdit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              Upload Image
            </label>

            {/* Exibição da imagem selecionada como preview */}
            {previewEdit && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewEdit}
                alt="Preview"
                className="w-full h-30 mt-2 object-cover"
              />
            )}
          </div>

          {/* Botões de ação do formulário */}
          <div className="flex justify-end mt-4">
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
