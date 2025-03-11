// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação de ícones do React Icons para exibição de status ativo/inativo
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { GoXCircle } from "react-icons/go";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useEffect, useState } from "react";


// Importação do Toastify para notificações
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfigs } from "@/lib/toastify/toastify";
import { CreateAirportType } from "@/lib/airport/types";


// Componente principal que exibe a tabela de usuários
export default function LocalBox() {

    const inputs = "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white"; 

    const [city, setCity] = useState<string>("")
    const [airportCode, setAirportCode] = useState<string>("")  

    // useEffect para 
    useEffect(() => {
      async function fetchInitialData() {
        try {
        
        } catch (error) {
          console.error("Failed to Find Initial Data!");
        }
      }
      fetchInitialData();
    }, []); 

    function handleCreateAirport(){
        setCity("");
        setAirportCode("");
    }

    function handleSubmitForm(e: React.FormEvent){
        e.preventDefault();
        handleCreateAirport()
    }

    
    return (
      <div className="mt-10 flex items-center justify-center">
          <div className="bg-gray-800 w-fit p-5 rounded-2xl flex flex-col items-center justify-center text-white">
              {/* Título e botão para criar usuário */}
              <h1 className="text-center font-bold text-3xl">Create New Local</h1>
              <form className="w-full mt-4" onSubmit={handleSubmitForm}>
                  <label className="block mb-1 text-white">
                      City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    placeholder="Type airport city"
                    onChange={(e) => setCity(e.target.value)}
                    className={inputs}
                    required
                  />
                  <label className="block mb-1 text-white mt-4">
                      Airport Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={airportCode}
                    placeholder="Type airport code"
                    onChange={(e) => setAirportCode(e.target.value)}
                    className={inputs}
                    required
                  />
                  <button type="submit" className="mt-4 bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                      Create
                  </button>
              </form>
                <label className="mt-2 w-full text-start text-blue-500 cursor-pointer hover:underline">
                  See Locals
                </label>
          </div>
      </div>
    );
}
