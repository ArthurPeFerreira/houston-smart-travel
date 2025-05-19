import { whatsapp } from "@/lib/systemInfo/contacts";
import { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Under Construction",
};

export default function UnderConstruction() {
  return (
    <main
      className="
        flex-1 flex items-center justify-center
        bg-no-repeat bg-cover bg-center p-5
      "
      style={{
      backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/under-construction.png)`,
      }}
    >
      <div className="max-w-7xl w-full flex flex-col xl:flex-row items-center h-full justify-center ">
       
          <div className="[text-align:justify]">
            {/* Seção de texto */}
            <h1 className="text-6xl font-bold text-center text-black mb-4">
              Under Construction
            </h1>
            <h1 className="text-4xl font-bold text-center text-black mb-4">
            For availability, please send us a message.
            </h1>
            <div className="w-full flex justify-center my-5">
            <Link
              target="_blank"
              href={whatsapp}
              className="bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors flex flex-row items-center gap-2"
            >
              <FaWhatsapp />
              Send us a message
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
