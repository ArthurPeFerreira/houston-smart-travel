// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação de ícones do React Icons para exibição de status ativo/inativo
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { GoXCircle } from "react-icons/go";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useEffect, useState } from "react";

// Importação do Toastify para notificações
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";
import { AirportType } from "@/lib/airport/types";

interface LocalBoxProps {
  airportsInitialData: AirportType[] | undefined;
}

// Componente principal que exibe a tabela de usuários
export default function LocalBox(data: LocalBoxProps) {
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  const [airportId, setAirportId] = useState<number | null>(null);
  const [city, setCity] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Atualiza estado quando o usuário seleciona um arquivo
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Cria um preview local (URL temporária)
      setPreview(URL.createObjectURL(file));
    }
  }

  // Envia o arquivo para a rota /api/upload
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }

    // Cria um formData e anexa o arquivo
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro no upload");
      }

      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título e botão para criar usuário */}
        <h1 className="text-center font-bold text-3xl">Create New Local</h1>
        <form className="w-full mt-4">
          <label className="block mb-1 text-white">Airport</label>
          <select
            name="airports"
            id="airports"
            className={`${inputs} invalid:text-gray-500`}
            onChange={(e) => {
              setAirportId(Number(e.target.value));
            }}
            required
            defaultValue=""
          >
            <option value="" key={0} disabled className="text-gray-400">
              Select an airport
            </option>
            {data.airportsInitialData?.map((airport) => {
              return (
                <option
                  value={airport.id}
                  key={airport.id}
                  className="text-white"
                >
                  {airport.city} - {airport.airportCode}
                </option>
              );
            })}
          </select>
          <label className="block mb-1 text-white mt-4">City</label>
          <input
            id="city"
            type="text"
            value={city}
            placeholder="Type airport city"
            onChange={(e) => setCity(e.target.value)}
            className={inputs}
            required
          />
          <div className="mt-4">
          <label className="block mb-1 text-white">Send an Image</label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // Esconde o input
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              Upload Image
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-auto mt-2 object-cover"
            />
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Create
          </button>
        </form>

        <label className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline">
          See Locals
        </label>
      </div>
    </div>
  );
}
