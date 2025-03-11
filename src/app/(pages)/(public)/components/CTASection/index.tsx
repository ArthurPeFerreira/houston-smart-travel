"use client";

import Image from "next/image";
// Importe a imagem desejada (ou use um path /public/...)
import viagem from "@/public/locals/images/imagem.jpg";

export default function CTASection() {
  return (
    <section className="w-full mx-auto px-4 flex items-center justify-center py-12 bg-[#E1E1E1]">
      <div className="max-w-7xl flex flex-col-reverse items-center gap-8 md:flex-row">
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next Adventure
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-5">
            Discover the best destinations at the best prices! Whether you're exploring
            historic cities, relaxing on paradise beaches, or seeking adventure in
            breathtaking landscapes, we have the perfect flight for you.
          </p>

          <ul className="text-gray-700 mb-6 space-y-2">
            <li>🌎 Unmissable destinations around the world</li>
            <li>💰 The best prices for your next trip</li>
            <li>⏱ Real-time availability to secure your booking</li>
          </ul>

          <button className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors">
            Check Flights
          </button>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] relative">
            <Image
              src={viagem}
              alt="Pessoa viajando"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
