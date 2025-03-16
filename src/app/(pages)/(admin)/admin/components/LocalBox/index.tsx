// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useEffect, useState } from "react";

// Importação do Toastify para notificações
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";
import { AirportType } from "@/lib/airport/types";
import { FaSpinner } from "react-icons/fa";
import eventEmitter from "@/lib/event/eventEmmiter";
import LocalsInfo from "./LocalInfo";
import { LocalType } from "@/lib/local/types";

interface LocalBoxProps {
  airportsInitialData: AirportType[] | undefined;
  localsInitialData: LocalType[] | undefined;
}

// Componente principal que permite a criação de um local associado a um aeroporto
export default function LocalBox({
  airportsInitialData,
  localsInitialData,
}: LocalBoxProps) {
  // Classe CSS reutilizável para os inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Estados para armazenar dados dinâmicos do formulário
  const [airports, setAirports] = useState<AirportType[] | undefined>();
  const [airportsToShow, setAirportsToShow] = useState<AirportType[] | undefined>();
  const [locals, setLocals] = useState<LocalType[] | undefined>();
  const [airportId, setAirportId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLocalsInfoModal, setLoadingLocalsInfoModal] =
    useState<boolean>(false);
  const [showLocalsInfoModal, setShowLocalsInfoModal] =
    useState<boolean>(false);
  const [localToEdit, setLocalToEdit] = useState<LocalType>({
    id: 0,
    active: true,
    airport: { id: 0, city: "", airportCode: "" },
    city: "",
    image: "",
  });
  const [showLocalsEditModal, setShowLocalsEditModal] =
    useState<boolean>(false);

  useEffect(() => {
    // Inicializa os aeroportos com os dados recebidos via props
    setLocals(localsInitialData);
    setAirports(airportsInitialData);

    // Função para atualizar a lista de aeroportos ao receber um evento
    async function handleEvent() {
      const responseAirports = await api.get("api/admin/airport");
      setAirports(responseAirports.data);

      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
    }

    // Adiciona listeners para eventos de atualização de aeroportos
    eventEmitter.on("updateAirports", handleEvent);

    // Remove os listeners ao desmontar o componente
    return () => {
      eventEmitter.off("updateAirports", handleEvent);
    };
  }, []);

  useEffect(() => {
    if (!airports) {
      setAirportsToShow(undefined);
      return;
    }
  
    if (!locals) {
      setAirportsToShow(airports);
      return;
    }
  
    // Cria um Set com os IDs dos aeroportos que já possuem locais
    const localAirportIds = new Set(locals.map((local) => local.airport.id));
  
    // Filtra os aeroportos que não estão presentes no Set
    const filteredAirports = airports.filter(
      (airport) => !localAirportIds.has(airport.id)
    );
  
    setAirportsToShow(filteredAirports);
  }, [airports, locals]);

  // Atualiza estado quando o usuário seleciona um arquivo
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Cria um preview da imagem carregada
      setPreview(URL.createObjectURL(file));

      e.target.value = "";
    }
  }

  // Envio do formulário para criação de um novo local
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (airportId == 0) {
      toast.error("Please select an airport.", toastConfigs);
      setLoading(false);
      return;
    }

    // Verifica se um arquivo foi selecionado antes de prosseguir
    if (!selectedFile) {
      toast.error("Please select an image to upload.", toastConfigs);
      setLoading(false);
      return;
    }

    // Cria um FormData para envio dos dados ao backend
    const formData = new FormData();
    formData.append("airportId", airportId.toString()); // Converte ID para string
    formData.append("city", city);
    formData.append("image", selectedFile);

    try {
      const response = await api.post("api/admin/local", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Exibe mensagem de sucesso se a requisição for bem-sucedida
      if (response.status === 200) {
        toast.success("Local created successfully!", toastConfigs);
      }
    } catch {
      // Exibe mensagem de erro em caso de falha
      toast.error("Failed to create local!", toastConfigs);
    } finally {
      // Reseta os estados do formulário após o envio
      setLoading(false);
      setAirportId(0);
      setCity("");
      setSelectedFile(null);
      setPreview(null);

      const responseLocals = await api.get("api/admin/local");
      setLocals(responseLocals.data);
    }
  }

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

  function onCloseLocalsInfoModal() {
    setShowLocalsInfoModal(false);
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título do formulário */}
        <h1 className="text-center font-bold text-3xl">Create New Local</h1>
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          {/* Selecionar aeroporto */}
          <label className="block mb-1 text-white">Airport</label>
          <select
            name="airports"
            id="airports"
            className={`${inputs} invalid:text-gray-500`}
            onChange={(e) => {
              setAirportId(Number(e.target.value));
            }}
            value={airportId}
            required
          >
            <option value={0} key={0} disabled className="text-gray-400">
              Select an airport
            </option>
            {airportsToShow?.map((airport) => {
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

          {/* Input para nome da cidade */}
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

          {/* Botão de envio */}
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
        <button
          className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline"
          onClick={() => {
            setShowLocalsInfoModal(true);
          }}
        >
          See Locals
        </button>
      </div>

      <LocalsInfo
        isOpen={showLocalsInfoModal}
        onClose={onCloseLocalsInfoModal}
        isLoading={loadingLocalsInfoModal}
        locals={locals}
        localToEdit={localToEdit}
        setLocalToEdit={setLocalToEdit}
        isOpenEditModal={showLocalsEditModal}
        setIsOpenEditModal={setShowLocalsEditModal}
        // onCloseEditModal={onCloseLocalsEditModal}
        // isLoadingEditModal={loadingLocalsEditModal}
        // onEditLocal={handleEditLocal}
        onDeleteLocal={handleDeleteLocal}
      />
    </div>
  );
}
