import React from "react";
import SignupCard from "../components/SignupCard";
import SignupImage from "../assets/SignupComp.png";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <motion.div
      className="flex h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section with the Image */}
      <motion.div
        className="w-full flex flex-col justify-center items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src={SignupImage}
          alt="Social Media Icons"
          className="w-[900px] h-auto"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
        <motion.p
          className="text-4xl font-semibold mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Sign Up to your{" "}
          <span className="text-orange-500 font-bold">ADVENTURE!</span>
        </motion.p>
      </motion.div>

      {/* Signup Form Section */}
      <motion.div
        className="w-3/5 flex justify-center items-center -mt-20"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SignupCard />
      </motion.div>
    </motion.div>
  );
};

export default Signup;
