// /components/FallingWishes.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import WishCard from "./WishCard";

export default function FallingWishes() {
  const [wishes, setWishes] = useState<any[]>([]);
  const [displayedWishes, setDisplayedWishes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWishes() {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data);
    }
    fetchWishes();
  }, []);

  // stagger the display
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= wishes.length) return clearInterval(interval);
      setDisplayedWishes((prev) => [...prev, wishes[index]]);
      index++;
    }, 500); // 0.5s between cards
    return () => clearInterval(interval);
  }, [wishes]);

  return (
    <>
      {displayedWishes.map((wish) => (
        <motion.div
          key={wish.id}
          className="absolute"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{
            duration: 8 + Math.random() * 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <WishCard from={wish.from_name} wish={wish.wish} />
        </motion.div>
      ))}
    </>
  );
}
