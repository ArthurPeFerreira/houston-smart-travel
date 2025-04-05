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
import { useState } from "react";
import { LocalType } from "@/lib/local/types";

interface LocalsProps {
  locals: LocalType[] | undefined;
}

export default function Locals({ locals }: LocalsProps) {
  // Estados para controlar se está no início ou no final do carrossel
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!locals || locals?.length == 0) {
    return null;
  }

  return (
    <section className="bg-[#E6DCD1] w-full text-[#141414]">
      <div className="py-8 px-4 max-w-7xl mx-auto">
        {/* <h1 className="text-2xl sm:text-4xl w-fit bg-[#FFFFFF]  p-3 rounded">
          Deals departing from Houston:
        </h1> */}
        <h1 className="text-4xl text-center font-medium sm:text-5xl md:text-5xl w-full">
          Deals departing from Houston
        </h1>
        <Swiper
          // Define os módulos que serão utilizados no Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // Configura a paginação automática
          // autoplay={{ delay: 30000, disableOnInteraction: false }}
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
          loop={false}
          // Ajusta o espaço entre slides
          spaceBetween={10}
          // Configura o comportamento responsivo-
          breakpoints={{
            0: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            800: { slidesPerView: 3 },
            1050: { slidesPerView: 4 },
          }}
          // Atualiza os estados ao mudar de slide
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {locals.map((local) =>
            local.active ? (
              // <SwiperSlide key={local.id} className="w-fit px-2">
              //   <div className="xl:w-[300px] xl:h-[250px] lg:w-[276px] lg:h-[230px] w-[300px] h-[250px] sm:text-md text-sm flex items-center justify-center relative">
              //     {/* Exibe a imagem de cada destino */}
              //     <Image
              //       src={local.image}
              //       alt={local.city}
              //       fill
              //       quality={100}
              //       unoptimized
              //       className="rounded-xl shadow-md object-cover"
              //     />
              //     {/* Nome do destino exibido abaixo da imagem */}
              //     <span className="absolute top-[-16px] left-1/2 transform -translate-x-1/2 bg-[#141414] text-white px-4 py-1 rounded-full whitespace-nowrap">
              //       {local.city}
              //     </span>
              //     <span className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-[#141414] text-white px-4 py-1 rounded-full whitespace-nowrap">
              //       Rounded Trip: $350
              //     </span>
              //   </div>
              // </SwiperSlide>
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
                    </span>
                    <span className="text-xl font-bold h-fit ">
                      ${"350.30"}{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        (Round Trip)
                      </span>
                    </span>
                  </div>

                  <button className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-[#141414] text-white px-4 py-1 rounded-full whitespace-nowrap">
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
              className={`custom-prev p-2 ${
                isBeginning
                  ? "opacity-50 disabled cursor-default"
                  : "cursor-pointer"
              }`}
            >
              <FaChevronLeft />
            </button>

            {/* Container da paginação personalizada */}
            <div className="custom-pagination flex gap-2" />

            {/* Botão para avançar para o próximo slide */}
            <button
              className={`custom-next p-2 ${
                isEnd ? "opacity-50 disabled cursor-default" : "cursor-pointer"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
