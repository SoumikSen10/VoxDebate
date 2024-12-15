import React from "react";
import LoginCard from "../components/LoginCard";
import LoginImage from "../assets/LoginComp.png";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex h-5/6 mb-24">
      {/* Hero Section with the Image */}
      <div className="w-full flex flex-col justify-center items-center">
        <motion.img
          src={LoginImage}
          alt="Floating Cubes"
          className="w-[700px] h-auto"
          initial={{ y: 0 }} // Initial position
          animate={{ y: [0, -10, 0] }} // Floating animation (up and down)
          transition={{
            repeat: Infinity, // Repeat forever
            duration: 2, // Duration of each cycle
            ease: "easeInOut", // Easing function
          }}
        />
        <p className="text-4xl font-semibold">
          Log in to your{" "}
          <span className="text-orange-500 font-bold">ADVENTURE!</span>
        </p>
      </div>

      {/* Login Form Section */}
      <div className="w-3/5 flex justify-center items-center">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
