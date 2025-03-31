// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("email@email.com").then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
    }
  };

  const handleCopyPhone = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("Phone@Phone.com");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000); // reseta feedback
    }
  };

  return (
    <footer className="text-white w-full bg-[#141414] py-5">
      <div className="mx-auto max-w-7xl px-6">
        {/* Grid de colunas */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Services</h1>
            <Link href="/">Home</Link>
            <Link href="/check-flights">Check Flights</Link>
          </div>
          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Contact</h1>

            <div className="flex-wrap gap-x-1">
              <span className="">Phone: </span>
              <span
                onClick={handleCopyPhone}
                className="text-blue-400 cursor-pointer hover:underline text-nowrap"
              >
                <a
                  href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20podemos%20conversar%3F"
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  {copiedEmail ? "Copied!" : "Click to Copy"}
                </a>
              </span>
            </div>

            {/* Email - clicável no mobile, click to copy no desktop */}
            <div className="flex-wrap gap-x-1">
              <span className="">Email: </span>
              <span
                onClick={handleCopyEmail}
                className="text-blue-400 cursor-pointer hover:underline text-nowrap"
              >
                <a
                  href="mailto:email@email.com"
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  {copiedEmail ? "Copied!" : "Click to Copy"}
                </a>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Discover</h1>
            <Link href="/about-us">About Us</Link>
            <Link href="/what-drives-us">What Drives Us</Link>
          </div>
          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Support</h1>
            <Link href="/terms-services">Terms of Services</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
          © 2025 Houston SmarTravel
        </div>
      </div>
    </footer>
  );
}
