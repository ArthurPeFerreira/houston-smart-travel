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
                href={`${whatsapp}&text=Ol%C3%A1%2C%20podemos%20conversar%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Phone
              </Link>
            </div>

            {/* Email - clicável no mobile, click to copy no desktop */}
            <div className="flex-wrap gap-x-1">
              <span
                onClick={handleCopyEmail}
                className="text-blue-400 cursor-pointer hover:underline text-nowrap"
              >
                <a
                  href={`mailto:${email}`}
                  className="text-blue-400 cursor-pointer hover:underline"
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
          © 2025 Houston SmarTravel
        </div>
      </div>
    </footer>
  );
}

// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Footer() {
//   const [copiedEmail, setCopiedEmail] = useState(false);
//   const [copiedPhone, setCopiedPhone] = useState(false);

//   const handleCopy = (text: string, setCopied: (val: boolean) => void) => {
//     if (typeof navigator !== "undefined" && navigator.clipboard) {
//       navigator.clipboard.writeText(text).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       });
//     }
//   };

//   return (
//     <footer className="text-white w-full bg-[#141414] py-5">
//       <div className="mx-auto max-w-7xl px-6">
//         {/* Grid de colunas */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//           <div className="flex flex-col gap-1 text-[17px]">
//             <h1 className="font-bold">Services</h1>
//             <Link href="/">Home</Link>
//             <Link href="/check-flights">Check Flights</Link>
//           </div>

//           <div className="flex flex-col gap-1 text-[17px]">
//             <h1 className="font-bold">Contact</h1>

//             <div className="flex items-center gap-2">
//               <span>Phone:</span>
//               <button
//                 onClick={() =>
//                   handleCopy("5511999999999", setCopiedPhone)
//                 }
//                 className="text-blue-400 hover:underline text-sm"
//               >
//                 Click to Copy
//               </button>
//               {copiedPhone && (
//                 <span className="text-green-400 text-xs">Copied!</span>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <span>Email:</span>
//               <button
//                 onClick={() =>
//                   handleCopy("email@email.com", setCopiedEmail)
//                 }
//                 className="text-blue-400 hover:underline text-sm"
//               >
//                 Click to Copy
//               </button>
//               {copiedEmail && (
//                 <span className="text-green-400 text-xs">Copied!</span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-1 text-[17px]">
//             <h1 className="font-bold">Discover</h1>
//             <Link href="/about-us">About Us</Link>
//             <Link href="/what-drives-us">What Drives Us</Link>
//           </div>

//           <div className="flex flex-col gap-1 text-[17px]">
//             <h1 className="font-bold">Support</h1>
//             <Link href="/terms-services">Terms of Services</Link>
//             <Link href="/privacy-policy">Privacy Policy</Link>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
//           © 2025 Houston SmarTravel
//         </div>
//       </div>
//     </footer>
//   );
// }
