"use client";

import Image from "next/image";
import adventure from "@/../public/static/Imagem Aventura.jpg";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="w-full mx-auto px-4 flex items-center justify-center py-12 bg-[#E1E1E1]">
      <div className="max-w-7xl flex flex-col items-center gap-8 md:flex-row">
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next Adventure
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-0 [text-align:justify]">
            Whether you&apos;re exploring historic cities, unwinding on paradise
            beaches, or seeking adventure in breathtaking landscapes, we have
            the perfect flight for you.
          </p>

          <p className="text-gray-700 text-base md:text-lg mb-5 [text-align:justify]">
            At Houston SmarTravel, we specialize in flight tickets issued with
            miles. By focusing on direct flights, we ensure comfort and
            convenience, all at affordable prices on specific travel dates.
          </p>

          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            Interested in our weekly flight availability?
          </h1>

          <p className="text-gray-700 text-base md:text-lg mb-5 [text-align:justify]">
            Click the link below to join our WhatsApp distribution list and
            receive exclusive offers and updates on selected routes departing
            from Houston:
          </p>
          <div className="w-full flex justify-center">
            <Link
              target="_blank"
              href={"https://go.wa.link/houstonsmartravel"}
              className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors flex flex-row items-center gap-2"
            >
              <FaWhatsapp />
              Join the WhatsApp List
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
