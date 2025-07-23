"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  { id: 1, src: "/hero.png", alt: "Product Image 1" },
  { id: 2, src: "/hero-blue.png", alt: "Product Image 2" },
  { id: 3, src: "/hero-red.png", alt: "Product Image 3" },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Main Swiper Viewer */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3]">
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Selector */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => {
              swiperRef.current?.slideTo(idx);
              setIndex(idx);
            }}
            className={`relative aspect-[1/1] w-[22%] sm:w-[18%] md:w-[15%] cursor-pointer rounded-md border-2 ${
              index === idx ? "border-black" : "border-transparent"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
