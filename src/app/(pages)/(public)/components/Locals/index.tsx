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

  if(!locals || locals?.length == 0) {
    return null;
  }

  return (
    <section className="bg-[#E6DCD1] w-full text-black">
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <Swiper
          // Define os módulos que serão utilizados no Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // Configura a paginação automática
          autoplay={{ delay: 5000, disableOnInteraction: false }}
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
          // Ajusta o espaço entre slides
          spaceBetween={10}
          // Configura o comportamento responsivo
          breakpoints={{
            480: { slidesPerView: 2 },
            690: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
          }}
          // Atualiza os estados ao mudar de slide
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {locals.map((local) => (
            local.active ? (
              <SwiperSlide
                key={local.id}
                className="w-fit px-2"
              >
                <div className="xl:w-[300px] xl:h-[500px] w-[210px] h-[350px] relative">
                  {/* Exibe a imagem de cada destino */}
                  <Image
                    src={local.image}
                    alt={local.city}
                    fill
                    quality={100}
                    className="rounded-xl shadow-md object-cover"
                  />
                  {/* Nome do destino exibido abaixo da imagem */}
                  <span className="absolute bottom-[-13px] left-1/2 transform -translate-x-1/2 bg-[#141414] text-white px-4 py-1 rounded-full text-sm whitespace-nowrap">
                    {local.city}
                  </span>
                </div>
              </SwiperSlide>
            ) : (null)
          ))

          }
        </Swiper>

        {/* Controles personalizados: botões de navegação e paginação */}
        <div className="w-full flex items-center justify-center">
          <div className="w-fit flex items-center justify-center gap-4 mb-4">
            {/* Botão para voltar ao slide anterior */}
            <button
              className={`custom-prev p-2 cursor-pointer ${
                isBeginning ? "invisible" : ""
              }`}
            >
              <FaChevronLeft />
            </button>

            {/* Container da paginação personalizada */}
            <div className="custom-pagination flex gap-2" />

            {/* Botão para avançar para o próximo slide */}
            <button
              className={`custom-next p-2 cursor-pointer ${
                isEnd ? "invisible" : ""
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
