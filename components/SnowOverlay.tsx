"use client";

import { motion } from "motion/react";
import { Snowflake } from "lucide-react";
import { useMemo } from "react";

export default function SnowOverlay() {
  const flakes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      size: Math.random() * 14 + 10, // icon size
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.4,
      rotate: Math.random() * 360,
      drift: Math.random() * 40 - 20,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-[-10vh] text-white"
          style={{
            left: `${flake.x}vw`,
            opacity: flake.opacity,
          }}
          initial={{ y: "-10vh", rotate: 0 }}
          animate={{
            y: "110vh",
            x: flake.drift,
            rotate: flake.rotate,
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Snowflake size={flake.size} />
        </motion.div>
      ))}
    </div>
  );
}
