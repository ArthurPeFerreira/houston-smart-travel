"use client";

import React from "react";

interface SeeImageProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

export default function SeeImage({ image, isOpen, onClose }: SeeImageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center z-100 bg-gray-900">
      {/* Modal principal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-fit max-w-11/12 max-h-9/12">
        <h1 className="text-center font-bold text-3xl">Image</h1>
        <img alt="Local Image" src={image} className="w-auto my-5 h-auto" />
        <button
          onClick={onClose}
          className="w-full p-2 mt-3 rounded bg-red-500 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
