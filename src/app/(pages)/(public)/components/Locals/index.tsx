// "use client";

// import foto from "@/public/locals/images/imagem.jpg"
// import Image from "next/image";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useEffect, useState } from "react";

// const destinations = [
//   { name: "Bariloche", image: foto },
//   { name: "Veneza", image: foto },
//   { name: "Machu Picchu", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
// ];

// export default function Locals() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slidesPerView, setSlidesPerView] = useState(1);

//   // 1) Detecta a largura da tela para definir quantos slides serão exibidos
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSlidesPerView(4);
//       } else if (window.innerWidth >= 768) {
//         setSlidesPerView(3);
//       } else if (window.innerWidth >= 640) {
//         setSlidesPerView(2);
//       } else {
//         setSlidesPerView(1);
//       }
//     };

//     // Executa na montagem do componente
//     handleResize();

//     // Ouvinte para redimensionamento
//     window.addEventListener("resize", handleResize);

//     // Remove o ouvinte ao desmontar
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // 2) Calcula o índice máximo para não ultrapassar o fim
//   //    Ex: se há 4 cards e mostramos 3 por vez, o máximo índice é 1
//   const maxIndex = destinations.length - slidesPerView;

//   // 3) Funções para avançar/voltar 1 card
//   const nextSlide = () => {
//     if (currentIndex < maxIndex) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   return (
//       <section className="w-full bg-[#E6DCD1] flex flex-col items-center py-4">
//       {/* Container que "corta" o overflow */}
//         <div className="relative w-full max-w-5xl">
//           {/* Faixa de slides (flex horizontal) */}
//           <div
//             className="flex gap-8 transition-transform duration-700 ease-in-out"
//             style={{
//               // Desloca a faixa para a esquerda de acordo com o `currentIndex`
//               transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
//             }}
//           >
//             {destinations.map((destination, index) => (
//                 <div
//                 key={index}
//                 // Larguras responsivas para cada card
//                 className="flex flex-col items-center px-2"
//                 >
//                 <div className="w-[232px] h-[248px] relative">
//                 <Image
//                     src={destination.image}
//                     alt={destination.name}
//                     fill
//                     className="object-cover rounded-xl shadow-md"
//                 />
//                 </div>
//                 <span className="absolute bottom-[-8px] mt-2 bg-black text-white px-4 py-1 rounded-full text-sm whitespace-nowrap">
//                     {destination.name}
//                 </span>
//                 </div>
//             ))}
//           </div>
//         </div>
          
//         {/* Controles de navegação e indicadores */}
//         <div className="flex items-center justify-center gap-4 mt-4">
//           {/* Botão Voltar */}
//           <button
//             onClick={prevSlide}
//             disabled={currentIndex === 0}
//             className={`p-2 rounded-full border border-gray-300 ${
//               currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             <FaChevronLeft />
//           </button>
          
//           {/* Indicadores de qual "conjunto" de slides está ativo */}
//           <div className="flex gap-2">
//             {destinations.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentIndex ? "bg-gray-800" : "bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
          
//           {/* Botão Avançar */}
//           <button
//             onClick={nextSlide}
//             disabled={currentIndex >= maxIndex}
//             className={`p-2 rounded-full border border-gray-300 ${
//               currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//     </section>
//   );
// }


"use client";

import foto from "@/public/locals/images/imagem.jpg"
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const destinations = [
  { name: "Bariloche", image: foto },
  { name: "Veneza", image: foto },
  { name: "Machu Picchu", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  { name: "Paris", image: foto },
  // ...pode ter mais
];

// Função para “quebrar” o array em pedaços (páginas) de tamanho fixo
function chunkArray<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default function PaginatedCarousel() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // Detecta a largura da tela para definir quantos slides por página
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Quebra o array original em “páginas” com tamanho = slidesPerView
  const chunkedDestinations = chunkArray(destinations, slidesPerView);
  const totalPages = chunkedDestinations.length - 1;

  // Navegação: cada clique avança/volta uma página inteira
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full bg-[#E6DCD1] flex flex-col items-center py-4">
      <div className="relative w-full max-w-5xl overflow-hidden">
        {/* Faixa de "páginas" (cada página é um chunk do array) */}
        <div
          className="flex transition-transform duration-700 ease-in-out" 
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {chunkedDestinations.map((pageDestinations, pageIndex) => (
            // Cada página é um “slide”
            <div key={pageIndex} className="flex w-full justify-center gap-8">
              {pageDestinations.map((destination, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-[232px] h-[248px] relative">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <span className="absolute bottom-[-8px] bg-black text-white px-4 py-1 rounded-full text-sm whitespace-nowrap">
                    {destination.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegação */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`p-2 rounded-full border border-gray-300 ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* Indicadores de qual página está ativa */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentPage ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className={`p-2 rounded-full border border-gray-300 ${
            currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import foto from "@/public/locals/images/imagem.jpg";

// const destinations = [
//   { name: "Bariloche", image: foto },
//   { name: "Veneza", image: foto },
//   { name: "Machu Picchu", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
//   { name: "Paris", image: foto },
// ];

// export default function Carrossel1PorClique() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slidesPerView, setSlidesPerView] = useState(1);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSlidesPerView(4);
//       } else if (window.innerWidth >= 768) {
//         setSlidesPerView(3);
//       } else if (window.innerWidth >= 640) {
//         setSlidesPerView(2);
//       } else {
//         setSlidesPerView(1);
//       }
//     };

//     // Executa na montagem
//     handleResize();

//     // Listener de resize
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Se tenho X destinos e mostro Y por vez, só posso avançar até X - Y
//   const maxIndex = destinations.length - slidesPerView;

//   // Avança 1 item por clique
//   const nextSlide = () => {
//     if (currentIndex < maxIndex) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   // Volta 1 item por clique
//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   return (
//     <section className="w-full bg-[#E6DCD1] flex flex-col items-center pt-5 pb-3">
//       <div className="relative w-full max-w-screen overflow-hidden">
//         <div
//           className="flex gap-8 transition-transform duration-700 ease-in-out "
//           style={{
//             // Desloca o carrossel 1 card por vez
//             transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
//           }}
//         >
//           {destinations.map((destination, index) => (
//             <div key={index} className="flex flex-col items-center px-2">
//               <div className="w-[232px] h-[270px] relative">
//                 <Image
//                   src={destination.image}
//                   alt={destination.name}
//                   fill
//                   className="object-cover rounded-xl shadow-md"
//                 />
//               </div>
//               <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm whitespace-nowrap"
//       >
//                 {destination.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Controles de navegação */}
//       <div className="flex items-center justify-center gap-4 mt-4">
//         {/* Botão Voltar */}
//         <button
//           onClick={prevSlide}
//           disabled={currentIndex === 0}
//           className={`p-2 rounded-full border border-gray-300 ${
//             currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           <FaChevronLeft />
//         </button>

//         {/* Indicadores (opcional) */}
//         <div className="flex gap-2">
//           {destinations.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 index === currentIndex ? "bg-gray-800" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Botão Avançar */}
//         <button
//           onClick={nextSlide}
//           disabled={currentIndex >= maxIndex}
//           className={`p-2 rounded-full border border-gray-300 ${
//             currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </section>
//   );
// }
