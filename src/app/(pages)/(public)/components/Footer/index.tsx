// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use client";

import { email, whatsapp } from "@/lib/systemInfo/contacts";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1000);
      });
    }
  };

  return (
    <footer className="text-white w-full bg-[#141414] py-5">
      <div className="mx-auto max-w-7xl px-6">
        {/* Grid de colunas */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-5">
          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Services</h1>
            <Link href="/">Home</Link>
            <Link href="/check-flights">Check Flights</Link>
          </div>
          <div className="flex flex-col gap-1 text-[17px]">
            <h1 className="font-bold">Contact</h1>

            <div className="flex-wrap gap-x-1">
              <Link
                href={`${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white cursor-pointer underline"
              >
                Phone
              </Link>
            </div>

            {/* Email - clicável no mobile, click to copy no desktop */}
            <div className="flex-wrap gap-x-1">
              <span
                onClick={handleCopyEmail}
                className="text-white cursor-pointer underline text-nowrap"
              >
                <a
                  href={`mailto:${email}`}
                  className="text-white cursor-pointer underline"
                >
                  {copiedEmail ? "Copied!" : "Email"}
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
          © 2025 Houston Smart Travel, L.L.C. All rights reserved
        </div>
      </div>
    </footer>
  );
}