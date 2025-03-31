// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use client";

import Image from "next/image";
import logo from "@/../public/static/Logo.png";
import Link from "next/link";
import { FaBars, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpenSideBar() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <nav className="text-white w-full h-20 bg-[#141414]">
      <div className="mx-auto w-full max-w-7xl h-full flex items-center justify-between px-2 sm:px-5">
        <div className="flex flex-row gap-2 items-center">
          <button className="cursor-pointer" onClick={() => toggleOpenSideBar()}>
            <FaBars className="flex md:hidden" size={30} />
          </button>

          <Sidebar isOpen={isOpen} onClose={toggleOpenSideBar} />
          <Image src={logo} alt="Logo" height={55} />
        </div>
        <div className="flex flex-row justify-center md:gap-5 text-xl whitespace-nowrap">
          <Link href="/" className="hidden md:flex">
            Home
          </Link>
          <Link href="/check-flights" className="hidden md:flex">
            Check Flights
          </Link>
          <Link href="/about-us" className="hidden md:flex">
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
