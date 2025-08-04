import React from "react";

interface ServiceCardProps {
  name: string;
  comment: string;
  rating: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, comment, rating }) => {
  return (
    <div className="flex flex-col items-center rounded-xl px-4 py-10 space-y-4 w-64 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <p className="text-center font-bold text-lg">{name}</p>
      <p className="text-sm italic">&ldquo;{comment}&rdquo;</p>
      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-400"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
