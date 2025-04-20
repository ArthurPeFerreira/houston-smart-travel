"use client";

import { AirportType } from "@/lib/airport/types";
import { api } from "@/lib/api/api";
import { cabins } from "@/lib/route/cabins";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface CheckFlightsBoxProps {
  initialDestinationAirportId: number;
}

export default function CheckFlightsBox({
  initialDestinationAirportId,
}: CheckFlightsBoxProps) {
  const selects = "w-full bg-gray-300 p-2 rounded";
  const inputs = "w-20 bg-gray-300 p-2 rounded";

  const [originAirports, setOriginAirports] = useState<AirportType[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportType[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [originAirportId, setOriginAirportId] = useState<number>(0);
  const [destinationAirportId, setDestinationAirportId] = useState<number>(
    initialDestinationAirportId
  );
  const [adults, setAdults] = useState<number>(1);
  const [cabin, setCabin] = useState<string>("");

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await api.get("api/airport");
        setOriginAirports(response.data);
      } catch {
        console.error("Failed to Find Initial Data!");
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`api/airport/${originAirportId}`);
        if (response.data.length > 0) {
          setDestinationAirports(response.data);
        } else {
          setDestinationAirports([]);
        }
      } catch {
        console.error("Failed to Find Initial Data!");
      }
    }
    fetchData();
  }, [originAirportId]);

  function handleSubmit() {
    setLoading(true);
    setLoading(false);
  }

  return (
    <div
      className="w-full min-h-full flex items-center justify-center bg-no-repeat bg-cover bg-center p-5"
      style={{
        backgroundImage: 'url("static/Montanha Fundo Check Flights.jpg")',
      }}
    >
      <div className="p-5 bg-[#141414] max-w-[600px] w-full rounded-4xl shadow-2xl">
        <h1 className="text-center text-5xl text-white">Houston SmarTravel</h1>
        <form
          className="w-full mt-4 flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div>
            {/* Input para a origem */}

            <label className="block mb-1 text-white">Select Origin:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500`}
              onChange={(e) => {
                setOriginAirportId(Number(e.target.value));
              }}
              value={originAirportId}
              required
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

          <div>
            {/* Input para o destino */}
            <label className="block mb-1 text-white">Select Destination:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500`}
              onChange={(e) => {
                setDestinationAirportId(Number(e.target.value));
              }}
              value={destinationAirportId}
              required
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

          <div>
            {/* Input para o destino */}
            <label className="block mb-1 text-white">Select Class:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} `}
              onChange={(e) => {
                setCabin(e.target.value);
              }}
              value={cabin}
              required
            >
              <option value={""} key={0} disabled className="text-gray-400">
                Select Class
              </option>
              {Object.values(cabins).map((cabin) => (
                <option value={cabin.key} key={cabin.key}>
                  {cabin.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row gap-10">
            <div>
              {/* Input para a quantidade de adultos */}
              <label className="block mb-1 text-white">Seats:</label>
              <input
                id="city"
                type="number"
                value={adults}
                onChange={(e) => {
                  setAdults(Number(e.target.value));
                }}
                className={inputs}
                required
                min={1}
              />
            </div>
          </div>

          {/* Botão de envio */}
          <div className="flex justify-center">
            <Link href={"/search-flights"}>
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
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
