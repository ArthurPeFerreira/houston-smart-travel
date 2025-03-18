"use client";

import { EditLocalType, LocalType } from "@/lib/local/types";
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface SeeImageProps {
  isOpen: boolean;
  onClose: () => void;
  handleCancel: () => void;
  handleEditLocal: (data:EditLocalType) => void;
  isLoading: boolean;
  local: LocalType;
}

export default function LocalEdit({
  isOpen,
  onClose,
  handleCancel,
  handleEditLocal,
  isLoading,
}: SeeImageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-100 bg-gray-900">
      {/* Botões de ação */}
      <div className="flex justify-end">
        {/* Botão de cancelar edição */}
        <button
          type="button"
          onClick={() => {
            handleCancel();
            onClose();
          }}
          className="mr-2 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
        >
          Cancel
        </button>

        {/* Botão de salvar com loading spinner quando a ação está em andamento */}
        {isLoading ? (
          <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
            <FaSpinner className="animate-spin" size={24} />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
