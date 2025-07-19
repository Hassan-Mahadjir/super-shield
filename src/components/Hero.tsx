import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {" "}
      {/* NEW WRAPPER */}
      <div className="flex flex-col xl:flex-row gap-5 max-w-screen-xl mx-auto relative z-0">
        {/* Text Content */}
        <div className="flex-1 pt-24 px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Find, book, or rent a car – quickly and easily
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light mt-5">
            Super Shield is a car rental service that offers a wide range of
            vehicles to suit your needs. Whether you need a compact car for city
            driving or a spacious SUV for a family trip, we have you covered.
            Our user-friendly platform allows you to search, compare, and book
            cars effortlessly.
          </p>
        </div>

        {/* Image or Visual Area */}
        <div className="flex justify-end items-end w-full xl:flex-[1.5] h-[400px] sm:h-[500px] xl:h-screen">
          <div className="relative w-full max-w-[90%] h-full z-0">
            <Image
              src={"/hero.png"}
              alt="hero"
              fill
              className="object-contain"
            />
            <div
              className="absolute right-[-25%] xl:right-[-35%] xl:top-[1rem] w-full h-[590px] xl:h-screen bg-repeat-round -z-10 overflow-hidden"
              style={{ backgroundImage: "url('/hero-bg.png')" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
