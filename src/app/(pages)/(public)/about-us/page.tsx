// import { Metadata } from "next";

// import image01 from "@/../public/static/Imagem AboutUs 01.jpg";
// import image02 from "@/../public/static/Imagem AboutUs 02.jpg";
// import Image from "next/image";

// export const metadata: Metadata = {
//   title: "About Us",
// };

// export default function AboutUs() {
//   return (
//     <main
//       className="
//         w-full min-h-full
//         flex items-center justify-center
//         bg-no-repeat bg-cover bg-center p-5
//       "
//       style={{
//         backgroundImage: 'url("static/Mar Fundo About Us.png")',
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col xl:flex-row items-center justify-center h-full">
//         <div className=" bg-[#E1E1E1] flex flex-row rounded shadow-md p-6 h-fit mb-5 xl:mr-5 w-full md:w-[500px] xl:w-4/12">
//           <div className="[text-align:justify]">
//             {/* Seção de texto */}
//             <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
//             <div>
//               <p className="mb-4 ">
//                 At Houston Smart Travel, Emily and James, two passionate
//                 travelers, turned their love for exploring the world into a
//                 mission to help others experience unforgettable journeys. Their
//                 story began with a shared dream of making travel easier,
//                 smarter, and more accessible. What started as personal adventure
//                 soon became a way to connect people with incredible destinations
//                 while ensuring a seamless and cost-effective experience.
//               </p>
//               <p className="mb-4">
//                 For them, traveling is more than just visiting new places—it&apos;s
//                 about discovery, meaningful connections, and creating memories
//                 that last a lifetime. With extensive knowledge in smart travel
//                 strategies, they have built solutions travelers trust to plan
//                 hassle-free trips.
//               </p>
//               <p>
//                 Houston Smart Travel is committed to offering personalized
//                 itineraries, insights, and the kind of support that go beyond
//                 traditional travel planning. Whether it&apos;s a family planning
//                 their first international adventure, a couple seeking a romantic
//                 getaway, or a solo traveler looking for new horizons, Houston
//                 Smart Travel is here to make every journey extraordinary.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-5 w-full md:relative md:w-[720px] xl:w-[750px] md:h-[1000px]">
//           {/* Seção de imagens */}
//           <div className="md:absolute md:inset-0">
//             <Image
//               src={image01}
//               alt="Couple 1"
//               width={400}
//               height={600}
//               quality={100}
//               className="rounded-4xl shadow-2xl"
//             />
//           </div>

//           <div className="md:absolute md:top-100 md:left-[320px] xl:left-[350px]">
//             <Image
//               src={image02}
//               alt="Couple 2"
//               width={400}
//               height={600}
//               quality={100}
//               className="rounded-4xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUs() {
  return (
    <main
      className="
        flex-1 flex items-center justify-center
        bg-no-repeat bg-cover bg-center p-5
      "
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/static/about-us-background.png)`,
      }}
    >
      <div className="max-w-7xl w-full flex flex-col xl:flex-row items-center h-full justify-center ">
        <div className=" bg-[#E1E1E1] flex flex-row rounded shadow-md p-6 mb-5 xl:mr-5 w-full lg:w-7/12">
          <div className="[text-align:justify]">
            {/* Seção de texto */}
            <h1 className="text-3xl font-bold text-center mb-4">
              Travel has always been part of our story{" "}
            </h1>
            <div>
              {/* &apos; */}
              <p className="mb-4 ">
                As a family, we had the opportunity to live in different places,
                experience new cultures, and see the world from unique
                perspectives, all thanks to my husband&apos;s career in the oil and
                gas industry. What began as a routine of relocations soon turned
                into a deep passion for travel, discovery, and the meaningful
                connections we built along the way.
              </p>
              <p className="mb-4 ">
                These experiences showed us that travel is about more than just
                reaching a destination. It&apos;s about how it makes you feel, the
                thrill of exploring something new, the comfort of being close to
                the ones you love, and the unforgettable moments that stay with
                you forever.
              </p>
              <p className="mb-4 ">
                Inspired by that journey, Houston SmarTravel was born with one
                goal: to share that feeling with others and make meaningful
                travel experiences accessible to more people, regardless of
                budget or background.
              </p>
              <p className="mb-4 ">
                We&apos;re not just here to help you book a ticket. We&apos;re here to
                help you create memories that will last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
