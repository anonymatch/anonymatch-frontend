// Loading.module.css

  // Loading.js
  "use client";
  import { motion } from "motion/react";
  import styles from "./loading.module.css";
import { Heart } from "lucide-react";
  
  const Loading = () => {
    return (
      <div className={styles.loading}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.dot}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
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
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.01,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-8 h-8" />
          </motion.div>
        ))}
      </div>
      
    );
  };
  
  export default Loading;