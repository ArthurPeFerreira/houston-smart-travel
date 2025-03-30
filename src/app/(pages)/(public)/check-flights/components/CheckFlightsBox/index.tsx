"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function CheckFlightsBox() {
  const [loading, setLoading] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(1);
  const [childs, setChilds] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const selects = "w-full bg-gray-300 p-2 rounded";
  const inputs = "w-20 bg-gray-300 p-2 rounded";

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
              onChange={(e) => {console.log(e.target.value)}}
              value={0}
              required
            >
              <option value={0} key={0} disabled className="text-black">
                Select Airport
              </option>
            </select>
          </div>

          <div>
            {/* Input para o destino */}
            <label className="block mb-1 text-white">Select Destination:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500`}
              onChange={(e) => {console.log(e.target.value)}}
              value={0}
              required
            >
              <option value={0} key={0} disabled className="text-gray-400">
                Select Airport
              </option>
            </select>
          </div>

          <div>
            {/* Input para o destino */}
            <label className="block mb-1 text-white">Select Class:</label>
            <select
              name="airports"
              id="airports"
              className={`${selects} invalid:text-gray-500`}
              onChange={(e) => {console.log(e.target.value)}}
              value={0}
              required
            >
              <option value={0} key={0} disabled className="text-gray-400">
                Select Class
              </option>
            </select>
          </div>

          <div className="flex flex-row gap-10">
            <div>
              {/* Input para a quantidade de adultos */}
              <label className="block mb-1 text-white">Adults:</label>
              <input
                id="city"
                type="number"
                value={adults}
                onChange={(e) => {setAdults(Number(e.target.value))}}
                className={inputs}
                required
                min={1}
              />
            </div>
            <div>
              {/* Input para a quantidade de crianças */}
              <label className="block mb-1 text-white">Child:</label>
              <input
                id="city"
                type="number"
                value={childs}
                onChange={(e) => {setChilds(Number(e.target.value))}}
                className={inputs}
                required
                min={0}
              />
            </div>
            <div>
              {/* Input para a quantidade de bebes */}
              <label className="block mb-1 text-white">Infant:</label>
              <input
                id="city"
                type="number"
                value={infants}
                onChange={(e) => {setInfants(Number(e.target.value))}}
                className={inputs}
                required
                min={0}
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
