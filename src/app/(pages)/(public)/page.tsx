import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {

  return (
    <main className="flex-1 w-full min-h-screen bg-black flex flex-col items-center justify-center">
      <HeroSection/>
      <Locals/>
      <CTASection/>
    </main>
  );
}


