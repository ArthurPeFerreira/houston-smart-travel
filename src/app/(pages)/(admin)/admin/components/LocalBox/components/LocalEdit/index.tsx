/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { api } from "@/lib/api/api";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";
import Decimal from "decimal.js";

interface LocalEditProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  local: LocalType | undefined; // Objeto com os dados do local a ser editado
}

export default function LocalEdit({
  isOpen,
  setIsOpen,
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
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento do modal

  // useEffect para inicializar os campos do formulário com os dados recebidos via props
  useEffect(() => {
    async function setInitialData() {
      try {
        if (!local) return; // Se não houver local, não faz nada
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
      } catch {
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

  // Envia dados atualizados para edição de local existente
  async function handleEditLocal(data: EditLocalTypeFile) {
    setLoading(true);

    if (!data.image) {
      toast.error("Please select an image to upload.", toastConfigs);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("airportId", data.airportId.toString());
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("passagePrice", data.passagePrice.toString());
    formData.append("active", data.active.toString());
    formData.append("image", data.image);

    try {
      const response = await api.put(`api/admin/local/${local?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Local edited successfully!", toastConfigs);
      }
    } catch (error: any) {
      // Tenta extrair mensagem de erro do servidor
      const errorMessage =
        error?.response?.data?.error || "Failed to edit local.";

      // Exibe mensagem de erro
      toast.error(errorMessage, toastConfigs);
    } finally {
      setLoading(false);
      eventEmitter.emit("updateLocalsModal");
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 max-w-md border-none text-white h-auto "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Local
          </DialogTitle>
        </DialogHeader>

        {/* Formulário de edição */}
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            if (!selectedEditFile) {
              toast.error("Please select an image!", toastConfigs);
              return;
            }

            // Chama a função de edição passando os dados atualizados
            handleEditLocal({
              active: active,
              airportId: local?.airport.id || 0,
              city: city,
              image: selectedEditFile,
              country: country,
              passagePrice: passagePrice,
            });
          }}
        >
          <div>
            {/* Campo de texto para o nome da cidade */}
            <label className="block mb-1 text-white">City</label>
            <input
              id="city local edit"
              type="text"
              value={city}
              placeholder="Type airport city"
              onChange={(e) => setCity(e.target.value)}
              className={inputs}
              required
            />
          </div>
          {/* Input para nome da cidade */}
          <div>
            <label className="block mb-1 text-white">Country</label>
            <input
              id="local country edit"
              type="text"
              value={country}
              placeholder="Type airport country"
              onChange={(e) => setCountry(e.target.value)}
              className={inputs}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-white">Passage Price</label>
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
          </div>

          {/* Checkbox para indicar se o local está ativo */}
          <div className="cursor-pointer">
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
          <div>
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
              className="bg-blue-500 w-full mb-2 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              Upload Image
            </label>

            {/* Exibição da imagem selecionada como preview */}
            {previewEdit && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewEdit}
                alt="Preview"
                className="w-full h-30 object-cover"
              />
            )}
          </div>
          {/* Botões de ação */}
          <div className="flex w-full mt-2">
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
