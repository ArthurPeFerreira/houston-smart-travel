/* eslint-disable @typescript-eslint/no-explicit-any */
// Indica que este componente é executado no lado do cliente no Next.js
"use client";

// Importa a instância da API configurada para requisições HTTP
import { api } from "@/lib/api/api";

// Hooks do React
import { useEffect, useState } from "react";

// Biblioteca de notificações e configurações personalizadas
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";

// Tipagem de dados para aeroportos
import { AirportType } from "@/lib/airport/types";

// Ícone de carregamento
import { FaSpinner } from "react-icons/fa";

// Sistema de eventos para comunicação global entre componentes
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente que lida com exibição, edição e ordenação dos Locais
import LocalsInfo from "./components/LocalInfo";

// Tipos utilizados para criação e edição de locais
import { LocalType } from "@/lib/local/types";
import Decimal from "decimal.js";

// Classe CSS reutilizável para inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

// Componente principal responsável por criar e gerenciar locais turísticos vinculados a aeroportos
export default function LocalBox() {
  // Estados para armazenar os dados de aeroportos e locais
  const [airports, setAirports] = useState<AirportType[]>();
  const [locals, setLocals] = useState<LocalType[]>([]);

  const [airportsToShow, setAirportsToShow] = useState<AirportType[]>();

  // Estados para o formulário de criação de local
  const [airportId, setAirportId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [passagePrice, setPassagePrice] = useState<Decimal>(Decimal(0.0));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showLocalsInfoModal, setShowLocalsInfoModal] =
    useState<boolean>(false);

  // Carrega dados de locais e aeroportos ao montar o componente
  useEffect(() => {
    async function fetchLocalsInitialData() {
      try {
        const responseLocals = await api.get("api/admin/local");
        setLocals(responseLocals.data);
      } catch {
        toast.error("Failed to get locals.", toastConfigs);
      }
    }

    async function fetchAirportsInitialData() {
      try {
        const response = await api.get("api/admin/airport");
        setAirports(response.data);
      } catch {
        toast.error("Failed to get airports.", toastConfigs);
      } finally {
        setLoading(false);
      }
    }

    fetchAirportsInitialData();
    fetchLocalsInitialData();

    // Registra escuta para atualizações externas
    eventEmitter.on("updateAirports", fetchAirportsInitialData);
    eventEmitter.on("updateLocals", fetchLocalsInitialData);
    return () => {
      eventEmitter.off("updateAirports", fetchAirportsInitialData);
      eventEmitter.off("updateLocals", fetchLocalsInitialData);
    };
  }, []);

  // Filtra aeroportos que ainda não têm local associado
  useEffect(() => {
    if (!airports) {
      setAirportsToShow(undefined);
      return;
    }

    if (!locals) {
      setAirportsToShow(airports);
      return;
    }

    // Cria um conjunto com os IDs dos aeroportos já utilizados
    const localAirportIds = new Set(locals.map((local) => local.airport.id));

    // Remove da lista os aeroportos que já têm locais
    const filteredAirports = airports.filter(
      (airport) => !localAirportIds.has(airport.id)
    );

    setAirportsToShow(filteredAirports);
  }, [airports, locals]);

  // Manipula imagem selecionada e gera preview
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      e.target.value = ""; // Permite reenviar a mesma imagem
    }
  }

  // Envia os dados do formulário para criação de novo local
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Validações básicas
    if (airportId === 0) {
      toast.info("Please select an airport.", toastConfigs);
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      toast.info("Please select an image to upload.", toastConfigs);
      setLoading(false);
      return;
    }

    if (city === "") {
      toast.info("Please type an city.", toastConfigs);
      setLoading(false);
      return;
    }

    if (country === "") {
      toast.info("Please type an country.", toastConfigs);
      setLoading(false);
      return;
    }

    // Prepara o corpo da requisição com multipart/form-data
    const formData = new FormData();
    formData.append("airportId", airportId.toString());
    formData.append("city", city);
    formData.append("country", country);
    formData.append("passagePrice", passagePrice.toString());
    formData.append("image", selectedFile);

    try {
      const response = await api.post("api/admin/local", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Local created successfully.", toastConfigs);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Failed to create local.";
      toast.error(errorMessage, toastConfigs);
    } finally {
      // Reseta os campos do formulário
      setLoading(false);
      setAirportId(0);
      setCity("");
      setCountry("");
      setPassagePrice(Decimal(0.0));
      setSelectedFile(null);
      setPreview(null);

      // Atualiza os dados locais
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
      eventEmitter.emit("updateLocalsModal");
    }
  }

  // JSX principal
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título do formulário */}
        <h1 className="text-center font-bold text-3xl">Create New Local</h1>

        {/* Formulário de criação de local */}
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          {/* Dropdown de seleção de aeroporto */}
          <label className="block mb-1 text-white">Airport</label>
          <select
            name="airports"
            id="airports"
            className={`${inputs} invalid:text-gray-500`}
            onChange={(e) => setAirportId(Number(e.target.value))}
            value={airportId}
            required
          >
            <option value={0} disabled className="text-gray-400">
              Select an airport
            </option>
            {airportsToShow?.map((airport) => (
              <option
                value={airport.id}
                key={airport.id}
                className="text-white"
              >
                {airport.city} - {airport.airportCode}
              </option>
            ))}
          </select>

          {/* Campo de cidade */}
          <label className="block mb-1 text-white mt-4">City</label>
          <input
            id="local city"
            type="text"
            value={city}
            placeholder="Type airport city"
            onChange={(e) => setCity(e.target.value)}
            className={inputs}
            required
          />

          {/* Campo de país */}
          <label className="block mb-1 text-white mt-4">Country</label>
          <input
            id="local country"
            type="text"
            value={country}
            placeholder="Type airport country"
            onChange={(e) => setCountry(e.target.value)}
            className={inputs}
            required
          />

          {/* Campo de preço da passagem */}
          <label className="block mb-1 text-white mt-4">
            Passage Price (USD)
          </label>
          <input
            id="passage price"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={Number(passagePrice.toFixed(2))}
            onChange={(e) => {
              try {
                setPassagePrice(Decimal(e.target.value));
              } catch {
                console.log("Invalid passage price format");
              }
            }}
            className={inputs}
            required
            min={0}
          />

          {/* Upload de imagem */}
          <div className="mt-4">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              Upload Image
            </label>

            {/* Preview da imagem */}
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="w-full h-30 mt-2 object-cover"
              />
            )}
          </div>

          {/* Botão de envio com loading */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 w-full flex items-center justify-center text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={24} />
            ) : (
              "Create"
            )}
          </button>
        </form>

        {/* Acesso ao modal de gerenciamento de locais */}
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowLocalsInfoModal(true);
          }}
        >
          See Locals
        </button>
      </div>

      {/* Modal para visualização, edição e ordenação dos locais */}
      <LocalsInfo
        isOpen={showLocalsInfoModal}
        setIsOpen={setShowLocalsInfoModal}
      />
    </div>
  );
}
