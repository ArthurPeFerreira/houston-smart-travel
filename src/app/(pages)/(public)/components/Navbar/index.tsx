// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use server";

import Image from "next/image";
import logo from "@/public/static/Logo.png"
import Link from "next/link";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

export default async function Navbar() {
    
    return (
      <nav className="text-white w-full h-20 bg-[#141414] flex items-center justify-between">
        <div className="w-full flex flex-row items-center justify-between px-5">
            <Image src={logo} alt="Logo" height={60} />
            <div className="flex flex-row items-center justify-center gap-5 text-2xl">
                <Link href="/">
                    Home
                </Link>
                <Link href="/check-flights">
                    Check Flights
                </Link>
                <Link href="/about-us">
                    About Us
                </Link>
            </div>
            <div className="flex flex-row gap-5">
                <FaWhatsapp size={60}/>
                <FaFacebookMessenger size={60}/>
            </div>
        </div>
      </nav>
    );
}
