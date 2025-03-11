"use server";

import Locals from "./components/Locals";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";

export default async function Home() {

  return (
    <div className="w-full min-h-screen">
      <HeroSection/>
      <Locals/>
      <CTASection/>
    </div>
  );
}


