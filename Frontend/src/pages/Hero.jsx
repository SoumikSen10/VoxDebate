import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import waveImageDark from "../assets/waveImageDark.png";
import waveImageLight from "../assets/waveImageLight.png";

const Hero = () => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const applyTheme = () => {
      if (theme === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    };

    applyTheme();

    return () => {
      document.body.classList.remove("dark");
      document.body.classList.remove("light");
    };
  }, [theme]);

  return (
    <div className="h-screen flex items-center justify-center text-center p-8 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Section */}
        <motion.div
          className={`text-left md:w-1/2 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            ENGAGE WITH <span className="text-orange-500">AI</span>{" "}
            <span className="text-purple-500">DEBATES</span>
          </h1>
          <p className="text-lg mb-8">
            Challenge Perspectives, Analyze Sentiments, and Debate with
            Cutting-Edge AI.
          </p>
          <div className="flex gap-4 justify-start mt-4">
            <motion.button
              className="bg-orange-500 w-[14rem] h-[4rem] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/playground")} // Navigate to Playground page
            >
              Start Debating
            </motion.button>
            <motion.button
              className="border border-white w-[12rem] h-[4rem] text-white px-6 py-3 rounded-full text-lg font-semibold bg-transparent hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/manual")} // Navigate to Manual page
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={theme === "dark" ? waveImageDark : waveImageLight}
            alt="Vox Debate"
            className="ml-20"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
