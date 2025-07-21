import React from "react";

const Agencies = () => {
  return (
    <div>
      <div className="mt-5 mx-5 my-10">
        <p className="text-center my-5 font-bold text-3xl">
          Our products are approved for all car agencies in the Kingdom of Saudi
          Arabia
        </p>
        <div className="overflow-hidden w-full py-8">
          <div
            className="flex gap-8 animate-scroll-x items-center"
            style={{ animation: "scroll-x 15s linear infinite" }}
          >
            {[
              "super.png",
              "vercel.svg",
              "window.svg",
              "vat.png",
              "globe.svg",
              "next.svg",
            ].map((logo, idx) => (
              <img
                key={idx}
                src={`/${logo}`}
                alt={logo.replace(/\..+$/, "")}
                className="h-16 w-auto object-contain"
                style={{ minWidth: "100px" }}
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll-x {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Agencies;
