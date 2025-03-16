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
      <body className="min-h-screen flex flex-col bg-[#E1E1E1]">
        <Navbar />
        {/* <main className="flex-1">{children}</main> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
