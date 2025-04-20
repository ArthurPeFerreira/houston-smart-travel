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
          <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Join Our WhatsApp Lists
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-0 [text-align:justify]">
            Get weekly flight availability and exclusive deals sent directly to
            your WhatsApp for routes departing from Houston. Choose your
            preferred list from the link below and stay updated!
          </p>

          <div className="w-full flex justify-center my-5">
            <Link
              target="_blank"
              href={"https://go.wa.link/houstonsmartravel"}
              className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors flex flex-row items-center gap-2"
            >
              <FaWhatsapp />
              Join the WhatsApp List
            </Link>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next Adventure
          </h1>

          <p className="text-gray-700 text-base md:text-lg mb-5 [text-align:justify]">
            From historic cities to paradise beaches, we have the perfect flight
            for you. At Houston SmarTravel, we focus on direct flights issued
            with miles, offering comfort, convenience, and great prices on select
            travel dates.
          </p>
          <div className="w-full flex justify-center mt-5">
            <Link
              href={"/check-flights"}
              className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors flex flex-row items-center gap-2"
            >
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
