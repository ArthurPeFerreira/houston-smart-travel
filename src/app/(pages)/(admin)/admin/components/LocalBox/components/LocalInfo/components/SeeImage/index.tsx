/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SeeImageProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  image: string; // URL ou caminho da imagem a ser exibida
}

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
