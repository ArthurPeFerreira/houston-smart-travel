export const dynamic = "force-dynamic";

import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import { Metadata } from "next";
import ClientSideCounter from "./components/ClientSideCounter";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <main className="flex-1 w-full min-h-[100dvh] bg-black flex flex-col items-center justify-center">
      <HeroSection/>
      <Locals/>
      <CTASection/>
      <ClientSideCounter type="home"/>
    </main>
  );
}


