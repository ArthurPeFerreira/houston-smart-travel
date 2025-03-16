// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use server";

import Image from "next/image";
import logo from "@/../public/static/Logo.png";
import Link from "next/link";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

export default async function Navbar() {
  return (
    <nav className="text-white w-full h-20 bg-[#141414]">
      <div className="mx-auto w-full max-w-7xl h-full flex items-center justify-between px-5">
        <Image src={logo} alt="Logo" height={55} />
        <div className="flex flex-row justify-center md:gap-5 text-xl whitespace-nowrap">
          <Link href="/" className="invisible md:visible">
            Home
          </Link>
          <Link href="/check-flights">Check Flights</Link>
          <Link href="/about-us" className="invisible md:visible">
            About Us
          </Link>
        </div>
        <div className="flex flex-row gap-2 md:gap-5 text-[35px]">
          <Link
            href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20podemos%20conversar%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href="https://m.me/HoustonSmartTravel?ref=OlaConversa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookMessenger />
          </Link>
        </div>
      </div>
    </nav>
  );
}
