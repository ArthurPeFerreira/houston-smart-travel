

"use client"; // Indica que este componente é do lado do cliente (Next.js App Router)

import React, { useEffect, useState } from "react";

// Componentes de diálogo (modal) personalizados
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Ícone de carregamento
import { FaSpinner } from "react-icons/fa";

// API para requisições HTTP
import { api } from "@/lib/api/api";

// Notificações visuais
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";

// Emissor de eventos globais
import eventEmitter from "@/lib/event/eventEmmiter";

// Tipagens dos dados
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";
import Decimal from "decimal.js";

// Tipagem das propriedades esperadas no componente
interface LocalEditProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  local: LocalType | undefined; // Objeto contendo os dados do local a ser editado
}

// Classe base reutilizável para campos de input
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

// Componente para edição de locais
export default function LocalEdit({
  isOpen,
  setIsOpen,
  local,
}: LocalEditProps) {
  // Estados locais para armazenar os valores do formulário
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [passagePrice, setPassagePrice] = useState<Decimal>(Decimal(0.0));
  const [active, setActive] = useState<boolean>(false);
  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null); // Imagem selecionada
  const [previewEdit, setPreviewEdit] = useState<string | null>(null); // Visualização da imagem
  const [loading, setLoading] = useState<boolean>(false);

  // Ao receber um `local`, inicializa os estados com os dados dele
  useEffect(() => {
    async function setInitialData() {
      try {
        if (!local) return;

        // Preenche campos de texto
        setCity(local.city);
        setCountry(local.country);
        setPassagePrice(local.passagePrice);
        setActive(local.active);

        // Monta URL da imagem e atualiza preview
        const cdnUrl = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/locals/${local.image}`;
        setPreviewEdit(cdnUrl);

        // Baixa a imagem como blob
        const { data: blob } = await api.get(cdnUrl, {
          responseType: "blob",
        });

        // Converte blob para arquivo File e armazena no estado
        const file = new File([blob], local.image, { type: blob.type });
        setSelectedEditFile(file);
      } catch {
        toast.error("Error loading image.", toastConfigs);
      }
    }

    setInitialData(); // Executa sempre que `local` mudar
  }, [local]);

  // Manipula a troca da imagem (arquivo)
  function handleEditFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Remove preview anterior se existir
      if (previewEdit) {
        URL.revokeObjectURL(previewEdit);
      }

      const newPreview = URL.createObjectURL(file);
      setSelectedEditFile(file);
      setPreviewEdit(newPreview);
      e.target.value = ""; // Limpa o input após seleção
    }
  }

  // Função que envia os dados atualizados para a API
  async function handleEditLocal(data: EditLocalTypeFile) {
    setLoading(true);

    if (!data.image) {
      toast.error("Please select an image to upload.", toastConfigs);
      setLoading(false);
      return;
    }

    // Monta payload com multipart/form-data
    const formData = new FormData();
    formData.append("airportId", data.airportId.toString());
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("passagePrice", data.passagePrice.toString());
    formData.append("active", data.active.toString());
    formData.append("image", data.image);

    try {
      // Envia os dados via PUT para a API
      const response = await api.put(`api/admin/local/${local?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Local edited successfully.", toastConfigs);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to edit local.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      setLoading(false);
      eventEmitter.emit("updateLocalsModal");

      // Fecha o modal com leve atraso
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 max-w-md border-none text-white h-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Local
          </DialogTitle>
        </DialogHeader>

        {/* Formulário de edição de local */}
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            if (!selectedEditFile) {
              toast.error("Please select an image.", toastConfigs);
              return;
            }

            // Chama função de envio com os dados do formulário
            handleEditLocal({
              active,
              airportId: local?.airport.id || 0,
              city,
              image: selectedEditFile,
              country,
              passagePrice,
            });
          }}
        >
          {/* Campo: Cidade */}
          <div>
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

          {/* Campo: País */}
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

          {/* Campo: Preço da passagem */}
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

          {/* Campo: Ativo (checkbox) */}
          <div className="cursor-pointer">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="active" className="text-white cursor-pointer">
              Active
            </label>
          </div>

          {/* Upload de imagem */}
          <div>
            <input
              type="file"
              id="fileEdit"
              accept="image/*"
              onChange={handleEditFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileEdit"
              className="bg-blue-500 w-full mb-2 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              Upload Image
            </label>

            {/* Exibe imagem preview se houver */}
            {previewEdit && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewEdit}
                alt="Preview"
                className="w-full h-30 object-cover"
              />
            )}
          </div>

          {/* Botão de salvar ou spinner de carregamento */}
          <div className="flex w-full mt-2">
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

        {/* Botão para fechar o modal manualmente */}
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
