"use client";

import { AirportType } from "@/lib/airport/types";
import { api } from "@/lib/api/api";
import { Cabin, CabinKey, cabins, cabinPriority } from "@/lib/route/cabins";
import { RouteType } from "@/lib/route/types";
import { toastConfigs } from "@/lib/toastify/toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { CustomSelect } from "../../../components/CustomSelect";

interface CheckFlightsBoxProps {
  initialDestinationAirportId: number | undefined; // ID pré-selecionado de destino (pode vir undefined)
}

// Componente principal para verificar disponibilidade de voos
export default function CheckFlightsBox({
  initialDestinationAirportId,
}: CheckFlightsBoxProps) {
  // Classe base para inputs numéricos de assentos
  const inputs = "w-20 bg-gray-300 p-2 rounded";
  const router = useRouter(); // Hook do Next.js para navegação programática

  // Estado: lista de aeroportos de origem carregados da API
  const [originAirports, setOriginAirports] = useState<AirportType[]>([]);
  // Estado: lista de aeroportos de destino, filtrados após escolha da origem
  const [destinationAirports, setDestinationAirports] = useState<AirportType[]>(
    []
  );
  // Estado: lista de cabines disponíveis para a rota selecionada
  const [cabinsRoute, setCabinsRoute] = useState<Cabin[]>([]);
  // Estado: ID da rota selecionada (obtido após consultar a API de rotas)
  const [routeId, setRouteId] = useState(0);

  // Estado de loading para desabilitar o botão e mostrar spinner
  const [loading, setLoading] = useState(false);
  // ID do aeroporto de origem selecionado
  const [originAirportId, setOriginAirportId] = useState(0);
  // ID do aeroporto de destino selecionado
  const [destinationAirportId, setDestinationAirportId] = useState<number>(0);
  // Estado que mantém dados completos do destino inicial (se houver)
  const [initialDestination, setInitialDestination] = useState<AirportType>();
  // Número de assentos a reservar
  const [seats, setSeats] = useState(1);
  // Chave da cabine (economy, business, etc.) selecionada
  const [cabin, setCabin] = useState("");

  // Função chamada ao mudar aeroporto de origem
  function handleOriginChange(id: number) {
    setOriginAirportId(id);
    // Se destino inicial não foi definido externamente, limpa destinos
    if (!initialDestinationAirportId) {
      setDestinationAirportId(0);
      setDestinationAirports([]);
    }
    // Limpa seleção de cabine e rota anterior
    setCabinsRoute([]);
    setCabin("");
    setRouteId(0);
  }

  // Função chamada ao mudar aeroporto de destino
  function handleDestinationChange(id: number) {
    setDestinationAirportId(id);
    // Limpa seleção de cabine e rota anterior
    setCabinsRoute([]);
    setCabin("");
    setRouteId(0);
  }

  // Carrega lista de aeroportos de origem ao montar o componente
  useEffect(() => {
    (async () => {
      try {
        // Define endpoint com ou sem parâmetro inicial de destino
        const endpoint = initialDestinationAirportId
          ? `api/check-flights/airport/${initialDestinationAirportId}`
          : "api/check-flights/airport";

        // Busca dados da API
        const { data }: { data: AirportType[] } = await api.get(endpoint);
        setOriginAirports(data);

        if (initialDestinationAirportId) {
          // Se houve destino inicial, busca dados completos desse aeroporto
          const { data: dest } = await api.get(
            `api/airport/${initialDestinationAirportId}`
          );
          setInitialDestination(dest);
          setDestinationAirportId(initialDestinationAirportId);

          // Se Houston estiver na lista, pré-seleciona como origem, senão pega o primeiro
          const houston = data.find((airport) => airport.airportCode === "IAH");
          setOriginAirportId(houston ? houston.id : data[0].id);
        }
      } catch {
        // Mostra toast em caso de falha
        toast.error("Failed to fetch origin airports.", toastConfigs);
      }
    })();
  }, []);

  // Sempre que origem mudar (e não for destino inicial), carrega destinos válidos
  useEffect(() => {
    if (originAirportId === 0 || initialDestinationAirportId) return;

    let abort = false;
    (async () => {
      try {
        const { data } = await api.get(
          `api/check-flights/airport/${originAirportId}`
        );
        if (abort) return;

        if (data.length === 0) {
          toast.info(
            "No destinations available for this origin.",
            toastConfigs
          );
          setDestinationAirports([]);
        } else {
          setDestinationAirports(data);
        }
      } catch {
        if (!abort)
          toast.error("Failed to fetch destination airports.", toastConfigs);
      }
    })();

    return () => {
      abort = true; // Marca para não atualizar estado se componente desmontar
    };
  }, [originAirportId]);

  // Quando origem e destino estiverem definidos, busca rota/cabines
  useEffect(() => {
    if (originAirportId === 0 || destinationAirportId === 0) return;

    // Garante destino válido dentro da lista
    if (
      destinationAirports.length > 0 &&
      !destinationAirports.some((a) => a.id === destinationAirportId)
    ) {
      return;
    }

    let abort = false;
    (async () => {
      try {
        const { data } = await api.get(
          `api/check-flights/route?origin=${originAirportId}&destination=${destinationAirportId}`
        );
        if (abort) return;

        const route = data as RouteType;
        setRouteId(route.id);

        // Ordena cabines de acordo com prioridade definida
        const list = route.cabins
          .map((c) => cabins[c.key as CabinKey])
          .sort((a, b) => cabinPriority[a.key] - cabinPriority[b.key]);

        if (list.length === 0) {
          toast.info("No cabins available for this route.", toastConfigs);
          return;
        }

        setCabinsRoute(list);
        setCabin(list[0].key);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          toast.info("No route found between these airports.", toastConfigs);
        } else if (!abort) {
          toast.error("Failed to fetch cabins.", toastConfigs);
        }
      }
    })();

    return () => {
      abort = true;
    };
  }, [originAirportId, destinationAirportId, destinationAirports]);

  // Ao submeter o form, valida e redireciona para a busca de voos
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (originAirportId === 0) {
      toast.info("Please select an origin airport.", toastConfigs);
      return;
    }
    if (destinationAirportId === 0) {
      toast.info("Please select a destination airport.", toastConfigs);
      return;
    }
    if (cabin === "") {
      toast.info("Please select a cabin.", toastConfigs);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({
      route: routeId.toString(),
      origin: originAirportId.toString(),
      destination: (destinationAirportId ?? 0).toString(),
      cabin,
      seats: seats.toString(),
    });
    router.push(`/search-flights?${params.toString()}`);
  }

  return (
    <div className="w-full min-h-full flex items-center justify-center p-5">
      <div className="p-5 bg-[#141414] max-w-[600px] w-full rounded-4xl shadow-2xl">
        <h1 className="text-center text-5xl text-white">
          Check Flights Availability
        </h1>

        <form
          className="w-full mt-4 flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {/* Select de Origem */}
          <CustomSelect<number>
            options={originAirports.map((airport) => ({
              label: `${airport.city} - ${airport.airportCode}`,
              value: airport.id,
            }))}
            value={originAirportId}
            setValue={handleOriginChange}
            key="originAirport"
            placeholder="Select origin airport"
            label="Select Origin:"
            disabled={false}
            required
            colorMode="light"
          />

          {/* Select de Destino */}
          <CustomSelect<number>
            options={
              !initialDestinationAirportId
                ? destinationAirports.map((airport) => ({
                    label: `${airport.city} – ${airport.airportCode}`,
                    value: airport.id,
                  }))
                : initialDestination
                ? [
                    {
                      label: `${initialDestination.city} – ${initialDestination.airportCode}`,
                      value: initialDestination.id,
                    },
                  ]
                : []
            }
            value={destinationAirportId}
            setValue={handleDestinationChange}
            key="destinationAirport"
            placeholder="Select destination airport"
            label="Select Destination:"
            disabled={
              (originAirportId === 0 || destinationAirports.length === 0) &&
              !initialDestinationAirportId
            }
            required
            colorMode="light"
          />

          {/* Select de Cabine */}
          <CustomSelect<string>
            options={cabinsRoute.map((c) => ({
              label: c.label,
              value: c.key,
            }))}
            value={cabin}
            setValue={setCabin}
            key="cabin"
            placeholder="Select class"
            label="Select Class:"
            disabled={
              originAirportId === 0 ||
              destinationAirportId === 0 ||
              cabinsRoute.length === 0
            }
            required
            colorMode="light"
          />

          {/* Input de Assentos */}
          <div className="flex flex-row gap-10">
            <div>
              <label htmlFor="seats" className="block mb-1 text-white">
                Seats:
              </label>
              <input
                id="seats"
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className={inputs}
                min={1}
                max={9}
              />
            </div>
          </div>

          {/* Botão de Submit */}
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
