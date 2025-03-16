"use client";

import Image from "next/image";
import adventure from "@/../public/static/Imagem Aventura.jpg";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full mx-auto px-4 flex items-center justify-center py-12 bg-[#E1E1E1]">
      <div className="max-w-7xl flex flex-col items-center gap-8 md:flex-row">
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next Adventure
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-5 [text-align:justify]">
            Discover the best destinations at the best prices! Whether you're exploring
            historic cities, relaxing on paradise beaches, or seeking adventure in
            breathtaking landscapes, we have the perfect flight for you.
          </p>

          <ul className="text-gray-700 mb-6 space-y-2">
            <li>🌎 Unmissable destinations around the world</li>
            <li>💰 The best prices for your next trip</li>
            <li>⏱ Real-time availability to secure your booking</li>
          </ul>
          <div className="w-full flex justify-center">
            <Link href={"/check-flights"} className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors">
              Check Flights
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] relative">
            <Image
              src={adventure}
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
