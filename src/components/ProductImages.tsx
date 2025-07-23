"use client";

import Image from "next/image";
import React from "react";

const images = [
  { id: 1, src: "/hero.png", alt: "Product Image 1" },
  { id: 2, src: "/hero-blue.png", alt: "Product Image 2" },
  { id: 3, src: "/hero-red.png", alt: "Product Image 3" },
];
const ProductImages = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <div className="h-[200px] relative">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between ">
        {images.map((img) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={img.id}
            onClick={() => setIndex(img.id - 1)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="30vw"
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
