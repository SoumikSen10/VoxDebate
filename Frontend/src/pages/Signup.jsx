import React from "react";
import SignupCard from "../components/SignupCard";
import SignupImage from "../assets/SignupComp.png";
import { motion } from "framer-motion"; // Import framer motion

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Hero Section with the Image */}
      <div className="w-full flex flex-col justify-center items-center">
        <motion.img
          src={SignupImage}
          alt="Social Media Icons"
          className="w-[900px] h-auto"
          initial={{ y: 0 }} // Initial position
          animate={{ y: [0, -10, 0] }} // Floating animation (up and down)
          transition={{
            repeat: Infinity, // Repeat forever
            duration: 2, // Duration of each cycle
            ease: "easeInOut", // Easing function
          }}
        />
        <p className="text-4xl font-semibold">
          Sign Up to your{" "}
          <span className="text-orange-500 font-bold">ADVENTURE!</span>
        </p>
      </div>

      {/* Signup Form Section */}
      <div className="w-3/5 flex justify-center items-center">
        <SignupCard />
      </div>
    </div>
  );
};

export default Signup;
