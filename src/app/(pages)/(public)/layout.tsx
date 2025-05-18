import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../globals.css";
import { ToastContainer } from "react-toastify";

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
      <body className="min-h-[calc(100vh-5rem)] flex flex-col bg-[#E1E1E1] overflow-y-auto scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-200 mt-20">
        <Navbar />
        {/* Conteúdo da página */}
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
