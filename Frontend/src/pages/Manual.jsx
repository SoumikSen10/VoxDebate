import React from "react";
import { motion } from "framer-motion";
import ManualAccordion from "@/components/ManualAccordion";
import ManualSearch from "@/components/ManualSearch";

const Manual = () => {
  return (
    <motion.div
      className="mt-8 ml-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ManualSearch />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ManualAccordion />
      </motion.div>
    </motion.div>
  );
};

export default Manual;
