"use client";

import { motion } from "framer-motion";
import React from "react";

type FramerClientProps = {
  children: React.ReactNode;
};

const FramerClient: React.FC<FramerClientProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
export default FramerClient;
