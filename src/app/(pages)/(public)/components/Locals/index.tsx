"use client";

// Importa componentes do Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importa os estilos básicos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./styles.css";

// Importa o componente de imagem do Next.js e a imagem utilizada
import Image from "next/image";

// Importa os ícones de setas do React Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Importa o hook useState do React
// import { useState } from "react";
import { LocalType } from "@/lib/local/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";

export default function Locals() {
  // Estados para controlar se está no início ou no final do carrossel
  // const [isBeginning, setIsBeginning] = useState(true);
  // const [isEnd, setIsEnd] = useState(false);

  const [locals, setLocals] = useState<LocalType[]>();

  useEffect(() => {
    // Função assíncrona para buscar os locais
    async function fetchLocals() {
      try {
        // Faz uma requisição GET para a API para buscar os locais
        const response = await api.get("api/local");
        // Atualiza o estado com os dados recebidos
        setLocals(response.data);
      } catch (error) {
        console.log("Error fetching locals:", error);
      }
    }

    fetchLocals();
  }, []);

  const router = useRouter();

  if (!locals || locals?.length == 0) {
    return null;
  }

  return (
    <section className="bg-[#E6DCD1] w-full text-[#141414]">
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl text-center font-medium sm:text-5xl md:text-5xl w-full">
          Deals departing from Houston
        </h1>
        <Swiper
          // Define os módulos que serão utilizados no Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // Configura a paginação automática
          autoplay={{ delay: 30000, disableOnInteraction: false }}
          // Configura a navegação personalizada com botões externos
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          // Configura a paginação personalizada com bolinhas clicáveis
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          // Centraliza os slides
          centeredSlides={false}
          // Ficar em Loop
          loop={true}
          // Ajusta o espaço entre slides
          spaceBetween={10}
          // Configura o comportamento responsivo-
          breakpoints={{
            0: { slidesPerView: 1 },
            440: { slidesPerView: 2 },
            800: { slidesPerView: 3 },
            1050: { slidesPerView: 4 },
          }}
          // Atualiza os estados ao mudar de slide
          // onSlideChange={(swiper) => {
          //   setIsBeginning(swiper.isBeginning);
          //   setIsEnd(swiper.isEnd);
          // }}
        >
          {locals.map((local) =>
            local.active ? (
              <SwiperSlide
                key={local.id}
                className="w-fit flex flex-col items-center"
              >
                <div className="relative w-full max-w-[330px] h-[250px]">
                  <Image
                    src={local.image}
                    alt={local.city}
                    fill
                    quality={100}
                    unoptimized
                    className="shadow-md object-cover rounded-t-xl"
                  />
                </div>

                {/* Informações abaixo da imagem */}
                <div className="bg-[#F1F1F1] h-fit w-full max-w-[330px] p-2 flex flex-col rounded-b-xl">
                  <div className="flex flex-col mb-4">
                    <span className="text-xl font-semibold text-[#141414]">
                      {local.city}
                      {", "}
                      <span className="text-sm">{local.country}</span>
                    </span>
                    <span className="text-xl font-bold h-fit ">
                      {"$ "}
                      {local.passagePrice
                        ? Number(local.passagePrice).toFixed(2)
                        : "0.00"}{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        (Round Trip)
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/check-flights?airportId=${local.airport.id}`
                      )
                    }
                    className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-[#141414] text-white px-4 py-1 rounded-full whitespace-nowrap cursor-pointer"
                  >
                    Check Availability
                  </button>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>

        {/* Controles personalizados: botões de navegação e paginação */}
        <div className="w-full flex items-center justify-center">
          <div className="w-fit flex items-center justify-center gap-4 mb-4">
            {/* Botão para voltar ao slide anterior */}
            <button
              // className={`custom-prev p-2 ${
              //   isBeginning
              //     ? "opacity-50 disabled cursor-default"
              //     : "cursor-pointer"
              // }`}
              className={`custom-prev p-2 cursor-pointer`}
            >
              <FaChevronLeft />
            </button>

            {/* Container da paginação personalizada */}
            <div className="custom-pagination flex gap-2" />

            {/* Botão para avançar para o próximo slide */}
            <button
              // className={`custom-next p-2 ${
              //   isEnd ? "opacity-50 disabled cursor-default" : "cursor-pointer"
              // }`}
              className={`custom-next p-2 cursor-pointer`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
