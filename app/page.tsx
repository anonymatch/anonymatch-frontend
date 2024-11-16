"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importa el componente Link
import Header from "@/components/header";

export default function Component() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      {/* <Header /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-full h-80 mx-auto"
        >
          <img
            src="/assets/logo.png"
            alt="ANONYMATCH Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 leading-relaxed pb-4"
        >
          We believe that true connections are built on more than just
          appearances. Harness the power of AI to find meaningful connections
          based on true compatibility, values, interests and shared visions.
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/onboarding-1-ideal-match">
            <Button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
              w-48 h-14 text-lg font-semibold rounded-full 
              transition-all duration-300 transform
              ${isHovered ? "bg-[#FF6B6B]" : "bg-[#FF4081]"}
              hover:scale-105 hover:shadow-lg
              text-white
            `}
            >
              START
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
