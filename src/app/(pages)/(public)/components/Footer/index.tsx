// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use server";

import Link from "next/link";

export default async function Footer() {
  const divColumnsClassName = "flex flex-col gap-1 text-[17px] sm:text-md";
  const h1ClassName = "font-bold";
  const h2ClassName = "";

  return (
    <footer className="text-white w-full h-auto bg-[#141414]">
      <div className="flex flex-col items-center p-5 mx-auto w-full max-w-7xl">
        <div className="w-full flex flex-row items-start justify-between px-5 text-white mb-4">
          <div className={divColumnsClassName}>
            <h1 className={h1ClassName}>Services</h1>
            <h2 className={h2ClassName}>
              <Link href={"/"}>Home</Link>
            </h2>
            <h2 className={h2ClassName}>
              <Link href={"/check-flights"}>Check Flights</Link>
            </h2>
          </div>
          <div className={divColumnsClassName}>
            <h1 className={h1ClassName}>Contact</h1>
            <h2 className={h2ClassName}>Email: email@email</h2>
            <h2 className={h2ClassName}>Phone: 4599999999</h2>
          </div>
          <div className={divColumnsClassName}>
            <h1 className={h1ClassName}>Discover</h1>
            <h2 className={h2ClassName}>
              <Link href={"/about-us"}>About Us</Link>
            </h2>
            <h2 className={h2ClassName}>
              <Link href={"/what-drives-us"}>What Drives Us</Link>
            </h2>
          </div>
          <div className={divColumnsClassName}>
            <h1 className={h1ClassName}>Support</h1>
            <h2 className={h2ClassName}>
              <Link href={"/terms-services"}>Terms of Services</Link>
            </h2>
            <h2 className={h2ClassName}>
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </h2>
          </div>
        </div>
        <div className="">© 2025 Houston SmarTravel</div>
      </div>
    </footer>
  );
}
