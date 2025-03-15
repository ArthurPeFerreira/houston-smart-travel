"use server";

import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import { getLocalByCache } from "@/lib/local/cacheLocal";


export default async function Home() {

  const locals = await getLocalByCache(0)

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
      <HeroSection/>
      <Locals locals={locals}/>
      <CTASection/>
    </div>
  );
}


