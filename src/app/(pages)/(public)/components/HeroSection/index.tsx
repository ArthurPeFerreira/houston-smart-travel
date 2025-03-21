"use client";

import Image from "next/image";
import background from "@/../public/static/Imagem Fundo.png"

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col justify-center ">
        <div className="relative min-h-[400px] h-auto">
            <Image
            src={background}
            quality={100}
            fill
            alt="Beach Background"
            className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center w-full h-full ">
                <h1 className="text-5xl sm:text-6xl font-light text-white text-center">
                    Find Your Next Flight
                </h1>
            </div>
        </div>
      </section>
  );
}
