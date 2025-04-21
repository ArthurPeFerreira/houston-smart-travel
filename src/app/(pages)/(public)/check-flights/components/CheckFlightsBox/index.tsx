"use client"; // Indica que o componente será executado no cliente (necessário para hooks como useState e useEffect)

import { AirportType } from "@/lib/airport/types"; // Tipo que representa um aeroporto
import { api } from "@/lib/api/api"; // Instância Axios configurada para requisições
import { Cabin, CabinKey, cabins } from "@/lib/route/cabins"; // Tipos e objeto de cabines disponíveis
import { RouteType } from "@/lib/route/types"; // Tipo que representa uma rota
import { toastConfigs } from "@/lib/toastify/toastify"; // Configuração para exibição de toasts
import { useRouter } from "next/navigation"; // Hook de navegação do Next.js
import { useEffect, useState } from "react"; // Hooks de estado e efeito
import { FaSpinner } from "react-icons/fa"; // Ícone de carregamento
import { toast } from "react-toastify"; // Biblioteca de notificação (toast)

interface CheckFlightsBoxProps {
  initialDestinationAirportId: number; // Propriedade recebida com o ID do aeroporto de destino inicial
}

// Componente principal que renderiza o formulário para consulta de voos
export default function CheckFlightsBox({
  initialDestinationAirportId,
}: CheckFlightsBoxProps) {
  // Estilos utilitários para inputs/selects
  const selects = "w-full bg-gray-300 p-2 rounded";
  const inputs = "w-20 bg-gray-300 p-2 rounded";

  const router = useRouter(); // Hook de navegação

  // Estados para armazenar aeroportos e configuração da rota
  const [originAirports, setOriginAirports] = useState<AirportType[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportType[]>([]);
  const [cabinsRoute, setCabinsRoute] = useState<Cabin[]>([]);
  const [routeId, setRouteId] = useState<number>(0);

  // Estados de controle do formulário
  const [loading, setLoading] = useState<boolean>(false);
  const [originAirportId, setOriginAirportId] = useState<number>(0);
  const [destinationAirportId, setDestinationAirportId] = useState<number>(initialDestinationAirportId);
  const [seats, setSeats] = useState<number>(1);
  const [cabin, setCabin] = useState<string>("");

  // Efeito para carregar os aeroportos de origem disponíveis ao montar o componente
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await api.get("api/check-flights/airport");
        setOriginAirports(response.data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "Failed to get origin airport.";
        toast.error(errorMessage, toastConfigs);
      }
    }
    fetchInitialData();
  }, []);

  // Efeito para buscar aeroportos de destino com base na origem selecionada
  useEffect(() => {
    async function fetchData() {
      if (originAirportId === 0) return;

      try {
        const response = await api.get(`api/check-flights/airport/${originAirportId}`);
        if (response.data.length > 0) {
          setDestinationAirports(response.data);
        } else {
          setDestinationAirports([]);
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "Failed to get destination airport.";
        toast.error(errorMessage, toastConfigs);
      }
    }
    fetchData();
  }, [originAirportId]);

  // Efeito para buscar os dados da rota e as cabines disponíveis com base na origem e destino selecionados
  useEffect(() => {
    async function fetchData() {
      if (originAirportId === 0) return;

      try {
        const response = await api.get(
          `api/check-flights/route?origin=${originAirportId}&destination=${destinationAirportId}`
        );
        if (response.data) {
          const route = response.data as RouteType;
          setRouteId(route.id);
          setCabinsRoute(
            route.cabins.map((cabin) => {
              return cabins[cabin.key as CabinKey];
            })
          );
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "Failed to get cabins.";
        toast.error(errorMessage, toastConfigs);
      }
    }

    if (originAirportId !== 0 && destinationAirportId !== 0) {
      fetchData();
    }
  }, [originAirportId, destinationAirportId]);

  // Função executada ao enviar o formulário
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validações do formulário
    if (originAirportId === 0) {
      toast.info("Please select an origin airport.", toastConfigs);
      return;
    }

    if (destinationAirportId === 0) {
      toast.info("Please select an destination airport.", toastConfigs);
      return;
    }

    if (cabin === "") {
      toast.info("Please select a cabin.", toastConfigs);
      return;
    }

    setLoading(true); // Ativa estado de carregamento

    // Cria os parâmetros da URL com os dados do formulário
    const params = new URLSearchParams({
      route: routeId.toString(),
      origin: originAirportId.toString(),
      destination: destinationAirportId.toString(),
      cabin,
      seats: seats.toString(),
    });

    // Redireciona para a página de resultados de busca
    router.push(`/search-flights?${params.toString()}`);
  }

  // Renderização do componente
  return (
    <div
      className="w-full min-h-full flex items-center justify-center bg-no-repeat bg-cover bg-center p-5"
      style={{
        backgroundImage: 'url("static/Montanha Fundo Check Flights.jpg")',
      }}
    >
      <div className="p-5 bg-[#141414] max-w-[600px] w-full rounded-4xl shadow-2xl">
        <h1 className="text-center text-5xl text-white">Check Flights Availability</h1>
        <form className="w-full mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Seletor de aeroporto de origem */}
          <div>
            <label className="block mb-1 text-white">Select Origin:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500`}
              onChange={(e) => setOriginAirportId(Number(e.target.value))}
              value={originAirportId}
            >
              <option value={0} key={0} disabled className="text-black">
                Select Airport
              </option>
              {originAirports.map((airport) => (
                <option value={airport.id} key={airport.id}>
                  {airport.city} - {airport.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* Seletor de aeroporto de destino */}
          <div>
            <label className="block mb-1 text-white">Select Destination:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500 cursor-default disabled:text-gray-500 disabled:cursor-not-allowed`}
              onChange={(e) => setDestinationAirportId(Number(e.target.value))}
              value={destinationAirportId}
              disabled={originAirportId === 0 && destinationAirports.length === 0}
            >
              <option value={0} key={0} disabled className="text-gray-400">
                Select Airport
              </option>
              {destinationAirports.map((airport) => (
                <option value={airport.id} key={airport.id}>
                  {airport.city} - {airport.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* Seletor de cabine/classe */}
          <div>
            <label className="block mb-1 text-white">Select Class:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} cursor-default disabled:text-gray-500 disabled:cursor-not-allowed`}
              onChange={(e) => setCabin(e.target.value)}
              value={cabin}
              disabled={
                originAirportId === 0 || destinationAirportId === 0 || cabinsRoute.length === 0
              }
            >
              <option value={""} key={0} disabled className="text-gray-400">
                Select Class
              </option>
              {cabinsRoute.map((cabin) => (
                <option value={cabin.key} key={cabin.key}>
                  {cabin.label}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para número de assentos */}
          <div className="flex flex-row gap-10">
            <div>
              <label className="block mb-1 text-white">Seats:</label>
              <input
                id="city"
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className={inputs}
                min={1}
              />
            </div>
          </div>

          {/* Botão de envio do formulário */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 w-fit bg-gray-300 flex items-center justify-center px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
            >
              {loading ? (
                <FaSpinner className="animate-spin" size={24} />
              ) : (
                "Check Availability"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
