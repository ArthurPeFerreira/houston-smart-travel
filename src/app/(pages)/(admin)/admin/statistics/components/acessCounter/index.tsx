"use client";

import { api } from "@/lib/api/api";
import { convertToHoustonTime } from "@/lib/date/convertToHoustonTime";
import {
  AccessCounterType,
  AccessCounterTypes,
} from "@/lib/statistics/acessCounter/types";
import { toastConfigs } from "@/lib/toastify/toastify";
import { useEffect, useState } from "react";
import { FaRedo, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

interface AcessCounterBoxProps {
  type: AccessCounterTypes;
}

export default function AcessCounterBox({ type }: AcessCounterBoxProps) {
  const [acessCounter, setAcessCounter] = useState<AccessCounterType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [resetting, setResetting] = useState<boolean>(false);

  async function fetchCounter() {
    setLoading(true);
    try {
      const { data } = await api.get<AccessCounterType>(
        "/api/admin/statistic/acess-counter",
        { params: { type } }
      );
      setAcessCounter(data);
    } catch {
      toast.error(`Failed to get access counter for ${type}.`, toastConfigs);
    } finally {
      setLoading(false);
    }
  }

  // useEffect para carregar os aeroportos ao montar o componente
  useEffect(() => {
    fetchCounter();
  }, []);

  async function handleReset() {
    setResetting(true);
    try {
      await api.put("/api/admin/statistic/acess-counter", { type });
      toast.success(`${type} counter has been reset.`, toastConfigs);
      await fetchCounter();
    } catch {
      toast.error(`Failed to reset counter for ${type}.`, toastConfigs);
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white w-full  flex flex-col items-center gap-2 text-lg">
      <span className="uppercase text-gray-400">{type}</span>
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <FaSpinner className="animate-spin" size={40} />
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <span className="text-7xl font-extrabold">
            {acessCounter?.count ?? 0}
          </span>
          <span className="text-gray-500">
            {acessCounter
              ? convertToHoustonTime(String(acessCounter.lastAccessAt))
              : "--"}
          </span>
        </div>
      )}
      <button
        onClick={handleReset}
        disabled={resetting}
        className={`
          mt-2 flex items-center gap-2
          bg-red-600 hover:bg-red-700
          disabled:bg-gray-600 disabled:cursor-not-allowed
          text-white font-medium py-2 px-4 rounded
          transition
        `}
      >
        {resetting ? (
          <FaSpinner className="animate-spin" size={20} />
        ) : (
          <FaRedo size={20} />
        )}
        Reset Counter
      </button>
    </div>
  );
}
