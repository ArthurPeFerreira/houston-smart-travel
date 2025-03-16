import { Metadata } from "next";

import image01 from "@/../public/static/Imagem AboutUs 01.jpg";
import image02 from "@/../public/static/Imagem AboutUs 02.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUs() {
  return (
    <main
      className="
        w-full min-h-full 
        flex items-center justify-center 
        bg-no-repeat bg-cover bg-center p-5
      "
      style={{
        backgroundImage: 'url("static/Mar Fundo About Us.png")',
      }}
    >
      <div className="max-w-7xl w-full flex flex-col xl:flex-row items-center justify-center h-[1000px]">
        <div className=" bg-[#E1E1E1] w-4/12 flex flex-row rounded shadow-md p-6 mr-5 h-fit">
          <div className="[text-align:justify]">
            {/* Seção de texto */}
            <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
            <div>
              <p className="mb-4 ">
                At Houston Smart Travel, Emily and James, two passionate
                travelers, turned their love for exploring the world into a
                mission to help others experience unforgettable journeys. Their
                story began with a shared dream of making travel easier,
                smarter, and more accessible. What started as personal adventure
                soon became a way to connect people with incredible destinations
                while ensuring a seamless and cost-effective experience.
              </p>
              <p className="mb-4">
                For them, traveling is more than just visiting new places—it's
                about discovery, meaningful connections, and creating memories
                that last a lifetime. With extensive knowledge in smart travel
                strategies, they have built solutions travelers trust to plan
                hassle-free trips.
              </p>
              <p>
                Houston Smart Travel is committed to offering personalized
                itineraries, insights, and the kind of support that go beyond
                traditional travel planning. Whether it's a family planning
                their first international adventure, a couple seeking a romantic
                getaway, or a solo traveler looking for new horizons, Houston
                Smart Travel is here to make every journey extraordinary.
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-[750px] h-full">
          {/* Seção de imagens */}
          <div className="absolute inset-0">
            <Image
              src={image01}
              alt="Couple 1"
              width={400}
              height={600}
              quality={100}
              className="rounded-4xl shadow-2xl"
            />
          </div>

          <div className="absolute top-100 left-[350px]">
            <Image
              src={image02}
              alt="Couple 2"
              width={400}
              height={600}
              quality={100}
              className="rounded-4xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
