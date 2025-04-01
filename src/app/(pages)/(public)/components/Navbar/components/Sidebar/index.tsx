"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Efeito colateral para travar o scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    // Remove caso o componente seja desmontado
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  return (
    <div>
      {/* Overlay escuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar com slide */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-fit h-full bg-[#141414] z-40 text-white px-5 py-6 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-6">
          <button onClick={onClose} className="text-white cursor-pointer">
            <FaBars size={30} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-xl">
          <Link href="/" onClick={onClose}>Home</Link>
          <Link href="/check-flights" onClick={onClose}>Check Flights</Link>
          <Link href="/about-us" onClick={onClose}>About Us</Link>
          <Link href="/what-drives-us" onClick={onClose}>What Drives Us</Link>
          <Link href="/terms-services" onClick={onClose}>Terms of Service</Link>
          <Link href="/privacy-policy" onClick={onClose}>Privacy Policy</Link>
        </nav>
      </div>
    </div>
  );
}
