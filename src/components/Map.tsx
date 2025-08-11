import Image from "next/image";
import React from "react";

const Map = () => {
  return (
    <div className="w-full mt-[-29] aspect-[16/9] relative">
      {/* Set aspect ratio */}
      <Image
        src="/map.jpg"
        alt="map"
        fill
        className="object-contain object-center"
        priority
      />
    </div>
  );
};

export default Map;
