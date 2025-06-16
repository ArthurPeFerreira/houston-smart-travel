"use client"; // Indica que este componente será renderizado no cliente (App Router do Next.js)

import React from "react";

// Importa os componentes do modal reutilizável
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Tipagem das propriedades recebidas pelo componente
interface SeeImageProps {
  isOpen: boolean; // Define se o modal está aberto
  setIsOpen: (open: boolean) => void; // Função para abrir/fechar o modal
  image: string; // Nome ou caminho da imagem a ser exibida
}

// Componente responsável por exibir uma imagem em um modal
export default function SeeImage({ isOpen, setIsOpen, image }: SeeImageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 rounded-md shadow-lg w-11/12 max-w-md border-none text-white h-auto"
      >
        {/* Cabeçalho do modal */}
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Image
          </DialogTitle>
        </DialogHeader>

        {/* Corpo do modal com a imagem exibida */}
        <div className="bg-gray-800 rounded shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto">
          {/* Imagem carregada a partir do CloudFront da AWS */}
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
