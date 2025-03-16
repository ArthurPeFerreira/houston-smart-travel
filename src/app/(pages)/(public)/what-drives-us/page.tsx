import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Drives Us",
};

export default function WhatDrivesUs() {
  const h1ClassName = "text-[#141414] text-4xl [text-align:justify]";
  const h2ClassName = "text-[#141414] text-lg [text-align:justify]";
  return (
    <main className="flex-1 h-full w-full">
      <div className="max-w-7xl mx-auto mt-2 mb-5 flex flex-col gap-3 p-5">
        <h1 className={h1ClassName}>Our Mission</h1>
        <h2 className={h2ClassName}>
          At Houston Smart Travel, we believe that traveling should be
          accessible to everyone. Our mission is to provide the best travel
          experiences, ensuring comfort and convenience at affordable prices.
        </h2>

        <h1 className={h1ClassName}>Our Vision</h1>
        <h2 className={h2ClassName}>
          To be the primary choice for travelers seeking affordable and
          high-quality travel experiences, connecting people from all walks of
          life with their dream destinations. We want to be recognized for our
          excellence in service and the positive impact we create by making
          travel more inclusive.
        </h2>

        <h1 className={h1ClassName}>Our Values</h1>
        <h2 className={h2ClassName}>
          <li>
            Accessibility: We believe in making travel available to everyone, no
            matter their background or budget.
          </li>
          <li>
            Quality: We are committed to providing top-notch travel services
            with a focus on comfort and reliability.
          </li>
          <li>
            Inclusivity: Our goal is to unite people across different social
            classes, ensuring that everyone has access to meaningful travel
            experiences.
          </li>
        </h2>
      </div>
    </main>
  );
}
