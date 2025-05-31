// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBars, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { instagram, whatsapp } from "@/lib/systemInfo/contacts";

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
    <nav className="fixed top-0 left-0 z-50 w-full h-20 bg-[#141414] text-white">
      <div className="mx-auto w-full max-w-7xl h-full flex items-center justify-between px-2 sm:px-5">
        <div className="flex flex-row gap-2 items-center">
          <button className={`cursor-pointer  ${isOpen ? "invisible" : "visible"}`} onClick={() => toggleOpenSideBar()}>
            <FaBars className="flex" size={30} />
          </button>

          <Sidebar isOpen={isOpen} onClose={toggleOpenSideBar} />


        </div>
          <Image src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/logo.svg`} alt="Logo" quality={100} height={50} width={202}/>
        <div className="flex flex-row gap-2 md:gap-5 text-[35px]">
          <Link
            href={`${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </nav>
  );
}
