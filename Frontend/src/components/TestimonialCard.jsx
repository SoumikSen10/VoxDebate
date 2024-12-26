import React from "react";
import { useSelector } from "react-redux";

const TestimonialCard = ({ image, name, role, testimonial }) => {
  const theme = useSelector((state) => state.theme.theme);

  const cardClasses =
    theme === "light"
      ? "bg-white shadow-xl border border-gray-300"
      : "bg-gray-800 shadow-xl border border-gray-700";

  return (
    <div
      className={`p-8 rounded-2xl flex flex-col items-center text-center space-y-6 ${cardClasses} transition-transform duration-300 hover:scale-105 transform-gpu`}
    >
      <div className="w-20 h-20 rounded-full border-4 border-indigo-500 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-gray-800 dark:text-gray-200 text-lg italic max-w-xs mx-auto">
        "{testimonial}"
      </p>
      <div>
        <h3 className="text-xl font-semibold text-indigo-600">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
