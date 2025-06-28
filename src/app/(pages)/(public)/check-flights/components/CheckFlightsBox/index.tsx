

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

interface CheckFlightsBoxProps {
  initialDestinationAirportId: number | undefined;
}

export default function CheckFlightsBox({
  initialDestinationAirportId,
}: CheckFlightsBoxProps) {
  const selects = "w-full bg-gray-300 p-2 rounded";
  const inputs = "w-20 bg-gray-300 p-2 rounded";
  const router = useRouter();

  // ---------- state ----------
  const [originAirports, setOriginAirports] = useState<AirportType[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportType[]>(
    []
  );
  const [cabinsRoute, setCabinsRoute] = useState<Cabin[]>([]);
  const [routeId, setRouteId] = useState(0);

  const [loading, setLoading] = useState(false);
  const [originAirportId, setOriginAirportId] = useState(0);
  const [destinationAirportId, setDestinationAirportId] = useState<number>(0);
  const [initialDestination, setInitialDestination] = useState<AirportType>();
  const [seats, setSeats] = useState(1);
  const [cabin, setCabin] = useState("");

  // ---------- handlers ----------
  function handleOriginChange(id: number) {
    setOriginAirportId(id);
    if (!initialDestinationAirportId) {
      setDestinationAirportId(0);
      setDestinationAirports([]);
    }
    setCabinsRoute([]);
    setCabin("");
    setRouteId(0);
  }

  function handleDestinationChange(id: number) {
    setDestinationAirportId(id);
    setCabinsRoute([]);
    setCabin("");
    setRouteId(0);
  }

  // ---------- fetch origin list ----------
  useEffect(() => {
    (async () => {
      try {
        const endpoint = initialDestinationAirportId
          ? `api/check-flights/airport/${initialDestinationAirportId}`
          : "api/check-flights/airport";

        const { data } = await api.get(endpoint);
        setOriginAirports(data);

        if (initialDestinationAirportId) {
          const { data: dest } = await api.get(
            `api/airport/${initialDestinationAirportId}`
          );

          setInitialDestination(dest);
          setDestinationAirportId(initialDestinationAirportId);
        }
      } catch {
        toast.error("Failed to fetch origin airports.", toastConfigs);
      }
    })();
  }, []);

  // ---------- fetch destinations ----------
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
      abort = true;
    };
  }, [originAirportId]);

  // ---------- fetch route + cabins ----------
  useEffect(() => {
    if (originAirportId === 0 || destinationAirportId === 0) return;

    // Se já temos lista de destinos, valide; caso contrário (fallback), continue
    if (
      destinationAirports.length > 0 &&
      !destinationAirports.some((a) => a.id === destinationAirportId)
    ) {
      return; // destino realmente inválido
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

  // ---------- submit ----------
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

  // ---------- ui ----------
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
          {/* origin */}
          <div>
            <label className="block mb-1 text-white">Select Origin:</label>
            <select
              className={`${selects} invalid:text-gray-500`}
              value={originAirportId}
              onChange={(e) => handleOriginChange(Number(e.target.value))}
            >
              <option value={0} disabled className="text-black">
                Select Airport
              </option>
              {originAirports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.city} - {airport.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* destination */}
          <div>
            <label className="block mb-1 text-white">Select Destination:</label>
            <select
              className={`${selects} invalid:text-gray-500 cursor-default disabled:text-gray-500 disabled:cursor-not-allowed`}
              disabled={
                (originAirportId === 0 || destinationAirports.length === 0) &&
                !initialDestinationAirportId
              }
              value={destinationAirportId}
              onChange={(e) => handleDestinationChange(Number(e.target.value))}
            >
              <option value={0} disabled className="text-gray-400">
                Select Airport
              </option>
              {!initialDestinationAirportId
                ? destinationAirports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.city} – {airport.airportCode}
                    </option>
                  ))
                : initialDestination && ( // ← fallback
                    <option value={initialDestination.id}>
                      {initialDestination.city} –{" "}
                      {initialDestination.airportCode}
                    </option>
                  )}{" "}
            </select>
          </div>

          {/* cabin */}
          <div>
            <label className="block mb-1 text-white">Select Class:</label>
            <select
              className={`${selects} cursor-default disabled:text-gray-500 disabled:cursor-not-allowed`}
              disabled={
                originAirportId === 0 ||
                destinationAirportId === 0 ||
                cabinsRoute.length === 0
              }
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">
                Select Class
              </option>
              {cabinsRoute.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* seats */}
          <div className="flex flex-row gap-10">
            <div>
              <label className="block mb-1 text-white">Seats:</label>
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

          {/* submit */}
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
