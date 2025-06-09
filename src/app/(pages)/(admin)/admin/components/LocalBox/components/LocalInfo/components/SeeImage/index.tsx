// "use client";

// import React from "react";

// // Interface que define os tipos das props recebidas pelo componente SeeImage
// interface SeeImageProps {
//   isOpen: boolean; // Indica se o modal deve estar visível
//   onClose: () => void; // Função chamada para fechar o modal
//   image: string; // URL ou caminho da imagem a ser exibida
// }

// // Componente funcional que renderiza um modal para visualização de imagem
// export default function SeeImage({ image, isOpen, onClose }: SeeImageProps) {
//   // Se o modal não estiver aberto, não renderiza nada (retorna null)
//   if (!isOpen) return null;

//   return (
//     // Container principal do modal, cobre toda a tela e centraliza o conteúdo
//     <div className="fixed inset-0 text-white flex items-center justify-center z-100 bg-gray-900">
//       {/* Estrutura do modal em si, com estilos de fundo, padding e rolagem controlada */}
//       <div className="bg-gray-800 p-6 rounded shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto">
//         {/* Título centralizado do modal */}
//         <h1 className="text-center font-bold text-3xl mb-4">Image</h1>
//         {/* Imagem exibida no modal, com ajuste para caber proporcionalmente no espaço */}
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           alt="Local Image"
//           src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/locals/${image}`}
//           className="w-full h-auto object-contain max-h-[70vh]"
//         />
//         {/* Botão de fechar o modal, estilizado com cores e transição */}
//         <button
//           onClick={onClose}
//           className="w-full p-2 mt-4 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { api } from "@/lib/api/api";
import { AirportType } from "@/lib/airport/types";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";

interface SeeImageProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  image: string; // URL ou caminho da imagem a ser exibida
}

// Classe de estilo para os inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

export default function SeeImage({ isOpen, setIsOpen, image }: SeeImageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 max-w-md border-none text-white h-auto "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Image
          </DialogTitle>
        </DialogHeader>

        {/* Imagem exibida no modal, com ajuste para caber proporcionalmente no espaço */}
        <div className="bg-gray-800 rounded shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Local Image"
            src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/locals/${image}`}
            className="w-full h-auto object-contain max-h-[70vh]"
          />
        </div>

        {/* Botão para fechar o modal */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
