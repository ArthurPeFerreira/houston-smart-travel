"use client";

import React from "react";

// Interface que define os tipos das props recebidas pelo componente SeeImage
interface SeeImageProps {
  isOpen: boolean; // Indica se o modal deve estar visível
  onClose: () => void; // Função chamada para fechar o modal
  image: string; // URL ou caminho da imagem a ser exibida
}

// Componente funcional que renderiza um modal para visualização de imagem
export default function SeeImage({ image, isOpen, onClose }: SeeImageProps) {
  // Se o modal não estiver aberto, não renderiza nada (retorna null)
  if (!isOpen) return null;

  return (
    // Container principal do modal, cobre toda a tela e centraliza o conteúdo
    <div className="fixed inset-0 text-white flex items-center justify-center z-100 bg-gray-900">
      {/* Estrutura do modal em si, com estilos de fundo, padding e rolagem controlada */}
      <div className="bg-gray-800 p-6 rounded shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto">
        {/* Título centralizado do modal */}
        <h1 className="text-center font-bold text-3xl mb-4">Image</h1>
        {/* Imagem exibida no modal, com ajuste para caber proporcionalmente no espaço */}
        <img
          alt="Local Image"
          src={image}
          className="w-full h-auto object-contain max-h-[70vh]"
        />
        {/* Botão de fechar o modal, estilizado com cores e transição */}
        <button
          onClick={onClose}
          className="w-full p-2 mt-4 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
