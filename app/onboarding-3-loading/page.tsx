'use client'

import { motion } from "motion/react";
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Loading from "@/components/loading";
export default function Component() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/main-home');
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-12 max-w-md text-center"
      >
        {/* Logo Animation */}
         <div className="flex flex-col items-center space-y-2">
          <div className="relative w-40 h-40">
            <img
              src="/assets/logo.png"
              alt="ANONYMATCH Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
   

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-medium text-gray-900">
            Hang on while our AI finds your best matches...
          </h2>
          
          {/* Loading Animation */}
         <Loading/>
        </motion.div>

        {/* Background Hearts Animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-100"
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100],
              x: Math.sin(i) * 50
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-8 h-8" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}