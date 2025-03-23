import { Metadata } from "next";
// import { FaSpinner } from "react-icons/fa";
import CheckFlightsBox from "./components/CheckFlightsBox";

export const metadata: Metadata = {
  title: "Check Flights",
};

export default function CheckFlights() {
  
  // function handleSubmit(){

  // }

  return (
      <main
        className="flex-1 w-full min-h-full flex items-center justify-center bg-no-repeat bg-cover bg-center p-5"
        style={{
          backgroundImage: 'url("static/Montanha Fundo Check Flights.jpg")',
        }}
      >
        <CheckFlightsBox/>
    </main>
  );
}
