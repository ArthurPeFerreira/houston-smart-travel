import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "@/lib/bullmq/scheduler.ts"; 

export const metadata: Metadata = {
  description: "",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,      
    shortcut: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
    apple: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/favicon.ico`,  
  },
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
