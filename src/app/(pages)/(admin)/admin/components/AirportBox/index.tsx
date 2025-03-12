// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useEffect, useState } from "react";

// Importação do Toastify para notificações
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfigs } from "@/lib/toastify/toastify";
import { AirportType, CreateAndEditAirportType } from "@/lib/airport/types";
import { FaSpinner } from "react-icons/fa";
import AirportsInfo from "./components/AirportsInfo";

interface AirportBoxProps {
  airportsInitialData: AirportType[] | undefined;
}

// Componente principal que gerencia aeroportos
export default function AirportBox(data: AirportBoxProps) {

    // Classe para estilização de inputs
    const inputs = "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white"; 

    // Estados do componente
    const [city, setCity] = useState<string>("") // Armazena a cidade do aeroporto
    const [airportCode, setAirportCode] = useState<string>("")  // Armazena o código do aeroporto
    const [loading, setLoading] = useState<boolean>(false)  // Estado de carregamento para criação
    const [loadingAirportsInfoModal, setLoadingAirportsInfoModal] = useState<boolean>(false); // Estado de carregamento do modal de informações
    const [showAirportsInfoModal, setShowAirportsInfoModal] = useState<boolean>(false); // Controla a visibilidade do modal de informações
    const [airports, setAirports] = useState<AirportType[] | undefined>(); // Armazena a lista de aeroportos
    const [loadingAirportsEditModal, setLoadingAirportsEditModal] = useState<boolean>(false); // Estado de carregamento do modal de edição
    const [showAirportsEditModal, setShowAirportsEditModal] = useState<boolean>(false); // Controla a visibilidade do modal de edição
    const [airportToEdit, setAirportToEdit] = useState<AirportType>({id:0, airportCode:"", city:""}); // Armazena o aeroporto em edição

    // Função para fechar o modal de informações
    function onCloseAirportsInfoModal(){
      setShowAirportsInfoModal(false);
    }

    // Função para fechar o modal de edição
    function onCloseAirportsEditModal(){
      setShowAirportsEditModal(false);
    }

    // useEffect para carregar os aeroportos ao montar o componente
    useEffect(() => {
      async function fetchInitialData() {
        setLoadingAirportsInfoModal(true);
        try {
          if(data.airportsInitialData){  
            setAirports(data.airportsInitialData);
          }
        } catch (error) {
          console.error("Failed to Find Initial Data!");
        } finally {
          setLoadingAirportsInfoModal(false)
        }
      }
      fetchInitialData();
    }, []); 

    // Função para criar um novo aeroporto
    async function handleCreateAirport(){
        try {
            setLoading(true)
    
            const data : CreateAndEditAirportType = {city, airportCode};

            await api.post("api/admin/airport", data);

            const response = await api.get("api/admin/airport");
            setAirports(response.data);

            toast.success("Airport created successfully!", toastConfigs);
        } catch {
            toast.error("Failed to create airport!", toastConfigs);
        } finally {
          setCity("");
          setAirportCode("");
          setLoading(false); 
        }
    }

    // Função para editar um aeroporto existente
    async function handleEditAirport(data: AirportType){
      try {
          setLoadingAirportsEditModal(true);
          await api.put(`api/admin/airport/${data.id}`, {city: data.city, airportCode: data.airportCode});

          const response = await api.get("api/admin/airport");
          setAirports(response.data);

          toast.success("Airport edited successfully!", toastConfigs);
      } catch {
          toast.error("Failed to edit airport!", toastConfigs);
      } finally {
        setLoadingAirportsEditModal(false);
        setShowAirportsEditModal(false);
      }
  }

  // Função para deletar um aeroporto
  async function handleDeleteAirport(airportId: number){
    try {
         if (confirm("Are you sure you want to delete this airport?")) {
                await api.delete(`api/admin/airport/${airportId}`);
  
                const response = await api.get("api/admin/airport");
                setAirports(response.data);
          
                toast.success("Airport deleted successfully!", toastConfigs);
              }
    } catch {
        toast.error("Failed to edit airport!", toastConfigs);
    } 
  }

  // Manipula o envio do formulário para criar um novo aeroporto
  async function handleSubmitForm(e: React.FormEvent){
    e.preventDefault();
    await handleCreateAirport()
}

    return (
      <div className="mt-10 flex items-center justify-center">
          <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
              <h1 className="text-center font-bold text-3xl">Create New Airport</h1>
              <form className="w-full mt-4" onSubmit={handleSubmitForm}>
                  <label className="block mb-1 text-white">City</label>
                  <input id="city" type="text" value={city} placeholder="Type airport city" onChange={(e) => setCity(e.target.value)} className={inputs} required />
                  <label className="block mb-1 text-white mt-4">Airport Code</label>
                  <input id="code" type="text" value={airportCode} placeholder="Type airport code" onChange={(e) => setAirportCode(e.target.value)} className={inputs} required />
                  <button type="submit" className="mt-4 bg-blue-500 w-full flex items-center justify-center text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                      {loading ? (<FaSpinner className="animate-spin" size={24} />) : ("Create")}
                  </button>
              </form>
              <button className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline" onClick={() => setShowAirportsInfoModal(true)}>See Airports</button>
          </div>
          <AirportsInfo isOpen={showAirportsInfoModal} onClose={onCloseAirportsInfoModal} isLoading={loadingAirportsInfoModal} airports={airports} airportToEdit={airportToEdit} setAirportToEdit={setAirportToEdit} isOpenEditModal={showAirportsEditModal} setIsOpenEditModal={setShowAirportsEditModal} onCloseEditModal={onCloseAirportsEditModal} isLoadingEditModal={loadingAirportsEditModal} onEditAirport={handleEditAirport} onDeleteAirport={handleDeleteAirport} />
      </div>
    );
}
