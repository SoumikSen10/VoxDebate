import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import waveImageDark from "../assets/waveImageDark.png";
import waveImageLight from "../assets/waveImageLight.png";

const Hero = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="h-screen flex items-center justify-center text-center p-8 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Section */}
        <div
          className={`text-left md:w-1/2 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <h1 className="text-5xl font-bold mb-4">
            MORPH TO YOUR <span className="text-orange-500">FICTIONAL</span>{" "}
            <span className="text-purple-500">VOICE</span>
          </h1>
          <p className="text-xl mb-6">
            Create Your Voice, Shape Your Story, and Unleash Your True
            Potential.
          </p>
          <div className="flex gap-6 justify-center mt-4">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-300">
              Start Creating
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-full text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition-all duration-300">
              Read Documentation
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div>
          {/* Conditionally render the image based on the current theme */}
          <motion.img
            src={theme === "dark" ? waveImageDark : waveImageLight}
            alt="Mimic Morph"
            className="ml-20"
            initial={{ y: 0 }} // Initial position
            animate={{ y: [0, -10, 0] }} // Floating animation (up and down)
            transition={{
              repeat: Infinity, // Repeat forever
              duration: 2, // Duration of each cycle
              ease: "easeInOut", // Easing function
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
