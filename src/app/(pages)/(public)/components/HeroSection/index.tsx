"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col justify-center ">
      <div className="relative min-h-[400px] h-auto">
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/beach.png`}
          quality={100}
          fill
          alt="Beach Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0">
          <div className="flex flex-col items-center justify-center gap-6 w-full h-full pb-[80px]">
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-light text-white text-center">
              Find Your Next Destination
            </h1>
            <Link
              href={"/check-flights"}
              className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
            >
              Check Flights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
