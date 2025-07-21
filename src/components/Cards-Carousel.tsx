"use client";
import React, { useState } from "react";
import ServiceCard from "./Service-Card";

interface CarouselProps {
  slides: {
    name: string;
    comment: string;
    rating: number;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const startIndex =
    slides.length === 1 ? 0 : Math.floor((slides.length - 1) / 2);

  const [currentPage, setCurrentPage] = useState<number>(startIndex);

  return (
    <div className="overflow-hidden w-full py-4">
      <div
        className="flex flex-row items-center gap-5 perspective-1000 justify-center animate-scroll-x"
        style={{ animation: "scroll-x 20s linear infinite" }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentPage;
          return (
            <div
              key={slide.name + index}
              className="transition-transform duration-500 cursor-pointer"
              onClick={() => setCurrentPage(index)}
              style={{
                transform: isActive
                  ? "scale(1) translateZ(50px)"
                  : "scale(0.9) translateZ(-20px)",
                opacity: isActive ? 1 : 0.9,
              }}
            >
              <ServiceCard {...slide} />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
