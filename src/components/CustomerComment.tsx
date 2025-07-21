import React from "react";
import Carousel from "./Cards-Carousel";

const comments = [
  {
    name: "Ahmed Al-Saud",
    comment:
      "Super Shield has transformed my driving experience! The heat insulation is incredible, and I can feel the difference immediately.",
    rating: 5,
  },
  {
    name: "Fatima Al-Harbi",
    comment:
      "Excellent product, easy to install and very effective against heat.",
    rating: 4,
  },
  {
    name: "Mohammed Al-Otaibi",
    comment: "I recommend Super Shield to everyone. Great value for money!",
    rating: 5,
  },
];

const CustomerComment = () => {
  return (
    <div className="mt-5 mx-5 my-10">
      <p className="text-center my-5 font-bold text-3xl">Customer Feedback</p>
      <Carousel slides={comments} />
    </div>
  );
};

export default CustomerComment;
