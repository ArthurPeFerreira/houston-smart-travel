// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da instância da API para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação dos hooks do React
import { useEffect, useState } from "react";

// Importações relacionadas ao sistema de notificações (Toastify)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";

// Tipagem dos dados de aeroporto
import { AirportType } from "@/lib/airport/types";

// Ícone de carregamento
import { FaSpinner } from "react-icons/fa";

// Event emitter para comunicação global
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente que exibe lista e modais relacionados aos locais
import LocalsInfo from "./components/LocalInfo";

// Tipos relacionados aos locais
import { EditLocalTypeFile, LocalType } from "@/lib/local/types";

// Interface que define as props iniciais do componente
interface LocalBoxProps {
  airportsInitialData: AirportType[] | undefined;
  localsInitialData: LocalType[] | undefined;
}

// Componente principal para criação e gerenciamento de locais
export default function LocalBox({
  airportsInitialData,
  localsInitialData,
}: LocalBoxProps) {
  // Classe base reaproveitável para inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados para armazenar os dados de aeroportos e locais
  const [airports, setAirports] = useState<AirportType[] | undefined>();
  const [airportsToShow, setAirportsToShow] = useState<
    AirportType[] | undefined
  >();
  const [locals, setLocals] = useState<LocalType[] | undefined>();

  // Estados do formulário de criação
  const [airportId, setAirportId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Estados relacionados aos modais
  const [loadingLocalsInfoModal, setLoadingLocalsInfoModal] =
    useState<boolean>(false);
  const [loadingLocalsEditModal, setLoadingLocalsEditModal] =
    useState<boolean>(false);
  const [loadingEditLocalsOrder, setLoadingEditLocalsOrder] =
    useState<boolean>(false);
  const [showLocalsInfoModal, setShowLocalsInfoModal] =
    useState<boolean>(false);
  const [showLocalsEditModal, setShowLocalsEditModal] =
    useState<boolean>(false);

  // Estado que guarda o local atualmente selecionado para edição
  const [localToEdit, setLocalToEdit] = useState<LocalType>({
    id: 0,
    active: true,
    airport: { id: 0, city: "", airportCode: "" },
    city: "",
    image: "",
  });

  // Efeito para inicializar dados e registrar listener de atualização
  useEffect(() => {
    setLocals(localsInitialData);
    setAirports(airportsInitialData);

    // Função chamada ao disparar evento global para atualizar os dados
    async function handleEvent() {
      const responseAirports = await api.get("api/admin/airport");
      setAirports(responseAirports.data);

      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
    }

    // Registra e limpa o listener
    eventEmitter.on("updateAirports", handleEvent);
    return () => {
      eventEmitter.off("updateAirports", handleEvent);
    };
  }, []);

  // Efeito para filtrar aeroportos que ainda não possuem locais
  useEffect(() => {
    if (!airports) {
      setAirportsToShow(undefined);
      return;
    }

    if (!locals) {
      setAirportsToShow(airports);
      return;
    }

    // Cria um conjunto com IDs de aeroportos que já têm locais
    const localAirportIds = new Set(locals.map((local) => local.airport.id));

    // Filtra apenas os aeroportos disponíveis para novos locais
    const filteredAirports = airports.filter(
      (airport) => !localAirportIds.has(airport.id)
    );

    setAirportsToShow(filteredAirports);
  }, [airports, locals]);

  // Manipulador de mudança de arquivo (imagem)
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Gera preview da imagem
      e.target.value = ""; // Reseta input para permitir novo envio
    }
  }

  // Submissão do formulário de criação de local
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

    // Monta objeto FormData para envio multipart
    const formData = new FormData();
    formData.append("airportId", airportId.toString());
    formData.append("city", city);
    formData.append("image", selectedFile);

    try {
      const response = await api.post("api/admin/local", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Local created successfully!", toastConfigs);
      }
    } catch {
      toast.error("Failed to create local!", toastConfigs);
    } finally {
      // Limpa e reseta o formulário
      setLoading(false);
      setAirportId(0);
      setCity("");
      setSelectedFile(null);
      setPreview(null);

      // Recarrega os dados atualizados
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
    }
  }

  // Função para deletar local específico
  async function handleDeleteLocal(localId: number) {
    try {
      if (confirm("Are you sure you want to delete this local?")) {
        await api.delete(`api/admin/local/${localId}`);
        const response = await api.get("api/admin/local");
        setLocals(response.data);
        toast.success("Local deleted successfully!", toastConfigs);
      }
    } catch {
      toast.error("Failed to delete Local!", toastConfigs);
    }
  }

  // Fecha o modal de informações
  function onCloseLocalsInfoModal() {
    setShowLocalsInfoModal(false);
  }

  // Manipulador para edição de um local
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
    } catch {
      toast.error("Failed to edit local!", toastConfigs);
    } finally {
      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
      setLoadingLocalsEditModal(false);
      setShowLocalsEditModal(false);
    }
  }

  async function handleEditLocalsOrder(
    data: LocalType[]
  ) {
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

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título do formulário */}
        <h1 className="text-center font-bold text-3xl">Create New Local</h1>

        {/* Formulário de criação */}
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          {/* Dropdown de aeroportos disponíveis */}
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

          {/* Campo para nome da cidade */}
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
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-30 mt-2 object-cover"
              />
            )}
          </div>

          {/* Botão de submissão com spinner de carregamento */}
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

        {/* Ação para abrir modal de locais cadastrados */}
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowLocalsInfoModal(true);
          }}
        >
          See Locals
        </button>
      </div>

      {/* Modal de visualização e gerenciamento de locais */}
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
