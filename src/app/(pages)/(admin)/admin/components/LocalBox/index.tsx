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
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";
import Decimal from "decimal.js";

// Define a estrutura das props recebidas pelo componente
interface LocalBoxProps {
  airportsInitialData: AirportType[] | undefined;
  localsInitialData: LocalType[] | undefined;
}

// Componente principal responsável por criar e gerenciar locais turísticos vinculados a aeroportos
export default function LocalBox({
  airportsInitialData,
  localsInitialData,
}: LocalBoxProps) {
  // Classe CSS reutilizável para inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados para armazenar os dados de aeroportos e locais
  const [airports, setAirports] = useState<AirportType[] | undefined>(airportsInitialData);
  const [airportsToShow, setAirportsToShow] = useState<
    AirportType[] | undefined
  >();
  const [locals, setLocals] = useState<LocalType[] | undefined>(localsInitialData);

  // Estados para o formulário de criação de local
  const [airportId, setAirportId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [passagePrice, setPassagePrice] = useState<Decimal>(Decimal(0.0));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Estados para controlar modais e carregamentos relacionados
  const [loadingLocalsInfoModal, setLoadingLocalsInfoModal] =
    useState<boolean>(true);
  const [loadingLocalsEditModal, setLoadingLocalsEditModal] =
    useState<boolean>(false);
  const [loadingEditLocalsOrder, setLoadingEditLocalsOrder] =
    useState<boolean>(false);
  const [showLocalsInfoModal, setShowLocalsInfoModal] =
    useState<boolean>(false);
  const [showLocalsEditModal, setShowLocalsEditModal] =
    useState<boolean>(false);

  // Estado que armazena o local que está sendo editado
  const [localToEdit, setLocalToEdit] = useState<LocalType>({
    id: 0,
    active: true,
    airport: { id: 0, city: "", airportCode: "" },
    city: "",
    country: "",
    passagePrice: Decimal(0.0),
    image: "",
  });

  // useEffect inicial: popula dados iniciais e escuta eventos globais
  useEffect(() => {
    setLoadingLocalsInfoModal(false);

    // Função executada ao disparar evento global "updateAirports"
    async function handleEvent() {
      const responseAirports = await api.get("api/admin/airport");
      setAirports(responseAirports.data);

      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
    }

    // Registra o evento e faz cleanup ao desmontar o componente
    eventEmitter.on("updateAirports", handleEvent);
    return () => {
      eventEmitter.off("updateAirports", handleEvent);
    };
  }, []);

  // useEffect que filtra os aeroportos que ainda não têm locais associados
  useEffect(() => {
    if (!airports) {
      setAirportsToShow(undefined);
      return;
    }

    if (!locals) {
      setAirportsToShow(airports);
      return;
    }

    // Cria um Set com IDs dos aeroportos que já têm locais registrados
    const localAirportIds = new Set(locals.map((local) => local.airport.id));

    // Filtra apenas aeroportos que ainda podem ser associados a um novo local
    const filteredAirports = airports.filter(
      (airport) => !localAirportIds.has(airport.id)
    );

    setAirportsToShow(filteredAirports);
  }, [airports, locals]);

  // Manipula a escolha de imagem e gera preview local
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      e.target.value = ""; // Permite reenviar a mesma imagem
    }
  }

  // Submissão do formulário para criação de novo local
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (airportId === 0) {
      toast.error("Please select an airport.", toastConfigs);
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      toast.error("Please select an image to upload.", toastConfigs);
      setLoading(false);
      return;
    }

    if (city === "") {
      toast.error("Please type an city.", toastConfigs);
      setLoading(false);
      return;
    }

    if (country === "") {
      toast.error("Please type an country.", toastConfigs);
      setLoading(false);
      return;
    }

    // Prepara dados para envio multipart (com imagem)
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
        toast.success("Local created successfully!", toastConfigs);
      }
    } catch (error: any) {
      // Tenta extrair mensagem de erro do servidor
      const errorMessage =
        error?.response?.data?.error || "Failed to create local.";

      // Exibe mensagem de erro
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
    }
  }

  // Função para excluir local específico
  async function handleDeleteLocal(localId: number) {
    try {
      if (confirm("Are you sure you want to delete this local?")) {
        await api.delete(`api/admin/local/${localId}`);
        const response = await api.get("api/admin/local");
        setLocals(response.data);
        toast.success("Local deleted successfully!", toastConfigs);
      }
    } catch (error: any) {
      // Tenta extrair mensagem de erro do servidor
      const errorMessage =
        error?.response?.data?.error || "Failed to delete local.";

      // Exibe mensagem de erro
      toast.error(errorMessage, toastConfigs);
    }
  }

  // Fecha o modal de informações de locais
  function onCloseLocalsInfoModal() {
    setShowLocalsInfoModal(false);
  }

  // Envia dados atualizados para edição de local existente
  async function handleEditLocal(
    e: React.FormEvent<HTMLFormElement>,
    data: EditLocalTypeFile
  ) {
    e.preventDefault();
    setLoadingLocalsEditModal(true);

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
      const response = await api.put(
        `api/admin/local/${localToEdit.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
      setLoadingLocalsEditModal(false);
      setShowLocalsEditModal(false);
    }
  }

  // Atualiza a ordem dos locais no backend
  async function handleEditLocalsOrder(data: LocalType[]) {
    setLoadingEditLocalsOrder(true);

    try {
      const response = await api.put(`api/admin/local`, data);

      if (response.status === 200) {
        toast.success("Locals order edited successfully!", toastConfigs);
      }
    } catch {
      toast.error("Failed to edit locals order!", toastConfigs);
    } finally {
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
      setLoadingEditLocalsOrder(false);
    }
  }

  // JSX do componente (formulário e modais)
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título principal */}
        <h1 className="text-center font-bold text-3xl">Create New Local</h1>

        {/* Formulário de criação de local */}
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          {/* Dropdown para seleção de aeroporto */}
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

          {/* Input para nome da cidade */}
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

          {/* Input para nome da cidade */}
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

          <label className="block mb-1 text-white mt-4">Passage Price</label>
          <input
            id="passage price"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={Number(passagePrice)}
            onChange={(e) => setPassagePrice(Decimal(e.target.value))}
            className={inputs}
            required
            min={0}
          />

          {/* Upload de imagem com botão e preview */}
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
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="w-full h-30 mt-2 object-cover"
              />
            )}
          </div>

          {/* Botão de envio com ícone de carregamento */}
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

        {/* Link para visualizar locais cadastrados */}
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowLocalsInfoModal(true);
          }}
        >
          See Locals
        </button>
      </div>

      {/* Componente de modal para visualização, edição e ordenação dos locais */}
      <LocalsInfo
        isOpen={showLocalsInfoModal}
        onClose={onCloseLocalsInfoModal}
        isLoading={loadingLocalsInfoModal}
        locals={locals}
        localToEdit={localToEdit}
        setLocalToEdit={setLocalToEdit}
        isOpenEditModal={showLocalsEditModal}
        setIsOpenEditModal={setShowLocalsEditModal}
        isLoadingEditModal={loadingLocalsEditModal}
        onEditLocal={handleEditLocal}
        onDeleteLocal={handleDeleteLocal}
        onEditLocalsOrder={handleEditLocalsOrder}
        isLoadingEditLocalsOrder={loadingEditLocalsOrder}
      />
    </div>
  );
}
