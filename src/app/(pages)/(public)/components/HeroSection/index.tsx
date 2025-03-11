"use client";

import Image from "next/image";
import background from "@/public/static/Imagem Fundo.png"

export default function HeroSection() {
  return (
    <section className="w-full">
        <div className="max-w-7xl relative min-h-[400px] h-auto">
            <Image
            src={background}
            fill
            alt="Beach Background"
            className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                <h1 className="text-6xl font-light text-white text-center">
                    Find Your Next Flight
                </h1>
            </div>
        </div>
      </section>
  );
}
