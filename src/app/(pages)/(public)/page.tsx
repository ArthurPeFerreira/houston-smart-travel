import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import { getLocalByCache } from "@/lib/local/cacheLocal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {

  const locals = await getLocalByCache(0)

  return (
    <main className="flex-1 w-full min-h-screen bg-black flex flex-col items-center justify-center">
      <HeroSection/>
      <Locals locals={locals}/>
      <CTASection/>
    </main>
  );
}


