import React from "react";
import { useSelector } from "react-redux";

const TestimonialCard = ({ image, name, role, testimonial }) => {
  const theme = useSelector((state) => state.theme.theme);

  const glassClasses =
    theme === "light"
      ? "bg-white bg-opacity-70 border border-gray-300 shadow-md"
      : "bg-gray-800 bg-opacity-60 border border-gray-700 shadow-lg";

  return (
    <div
      className={`p-6 rounded-2xl max-w-md flex flex-col items-center text-center space-y-4 ${glassClasses} transition-transform duration-300 hover:scale-105`}
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-400"
      />
      <p className="text-gray-300 italic">{`"${testimonial}"`}</p>
      <div>
        <h3 className="text-lg font-semibold text-indigo-400">{name}</h3>
        <p className="text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
