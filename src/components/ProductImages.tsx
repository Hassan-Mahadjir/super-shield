"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProductImagesProps = {
  images?: Array<string | { id?: number; src: string; alt?: string }>;
};

const defaultImages = [
  { id: 1, src: "/lucid-car-gpt.png", alt: "Product Image 1" },
  { id: 2, src: "/lucid-car-gpt.png", alt: "Product Image 2" },
  { id: 3, src: "/lucid-car-gpt.png", alt: "Product Image 3" },
];

const ProductImages = ({ images }: ProductImagesProps) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    src: string;
    alt: string;
  } | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Normalize images to array of {id, src, alt}
  const normalizedImages =
    images && images.length > 0
      ? images.map((img, idx) =>
          typeof img === "string"
            ? { id: idx, src: img, alt: `Product Image ${idx + 1}` }
            : {
                id: img.id ?? idx,
                src: img.src,
                alt: img.alt ?? `Product Image ${idx + 1}`,
              }
        )
      : defaultImages;

  const handleImageClick = (img: { id: number; src: string; alt: string }) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main Swiper Viewer */}
      <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] sm:aspect-[3/2] md:aspect-[5/3] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          className="w-full h-full"
          style={{ maxWidth: "85vw" }}
        >
          {normalizedImages.map((img) => (
            <SwiperSlide key={img.id} className="w-full h-full">
              <div
                className="relative w-full h-full cursor-pointer flex items-center justify-center"
                onClick={() => handleImageClick(img)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain rounded-md hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-red-500 !bg-black/30 !w-10 !h-10 !rounded-full !flex !items-center !justify-center hover:!bg-black/50 transition-all" />
        <div className="swiper-button-next !text-red-500 !bg-black/30 !w-10 !h-10 !rounded-full !flex !items-center !justify-center hover:!bg-black/50 transition-all" />

        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-4" />
      </div>

      {/* Thumbnail Selector */}
      <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-2xl mx-auto">
        {normalizedImages.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => {
              swiperRef.current?.slideTo(idx);
              setIndex(idx);
            }}
            className={`relative aspect-square w-16 sm:w-20 md:w-24 cursor-pointer rounded-md border-2 transition-all hover:scale-105 ${
              index === idx
                ? "border-red-500 shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover rounded-md"
              sizes="64px"
            />
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[95vh] w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/75 transition-all z-10"
            >
              ×
            </button>
            <div className="w-full h-full flex items-center justify-center p-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
