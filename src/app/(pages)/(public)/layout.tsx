import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#E1E1E1] min-h-screen flex flex-col overflow-y-auto scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-200">
        {/* <Navbar /> */}
        {/* Conteúdo da página */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
