// Loading.module.css

  // Loading.js
  "use client";
  import { motion } from "motion/react";
  import styles from "./loading.module.css";
  
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
      </div>
    );
  };
  
  export default Loading;