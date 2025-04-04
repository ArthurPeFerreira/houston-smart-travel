import { Metadata } from "next";
// import { FaSpinner } from "react-icons/fa";
import CheckFlightsBox from "./components/CheckFlightsBox";
import Image from "next/image";
import background from "@/../public/static/Montanha Fundo Check Flights.jpg";

export const metadata: Metadata = {
  title: "Check Flights",
};

export default function CheckFlights() {
  return (
    <main className="relative flex-1 w-full min-h-[70vh] md:min-h-fit flex items-center justify-center bg-no-repeat bg-cover bg-center p-5">
      <Image
        src={background}
        quality={100}
        fill
        alt="Beach Background"
        className="absolute inset-0"
      />
      <div className="absolute inset-0">
        <CheckFlightsBox />
      </div>
    </main>
  );
}

// export default function CheckFlights() {
//   return (
//     <main className="relative w-full  flex items-center justify-center bg-no-repeat bg-cover bg-center p-5">
//       <Image
//         src={background}
//         quality={100}
//         fill
//         alt="Beach Background"
//         className="absolute inset-0 -z-10 object-cover"
//       />
//       <CheckFlightsBox />
//     </main>
//   );
// }

