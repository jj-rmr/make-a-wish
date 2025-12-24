"use client";

import { useState, useEffect } from "react";
import WishModal from "@/components/WishModal";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import SnowWrapper from "@/components/SnowWrapper";

export default function Home() {
  const [wishSent, setWishSent] = useState(false);

  useEffect(() => {
    if (wishSent) {
      const timer = setTimeout(() => setWishSent(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [wishSent]);

  return (
    <div className="h-svh w-svw p-2">
      <div className="h-full w-full flex flex-col gap-2 max-w-3xl mx-auto rounded-4xl">
        <div className="bg-secondary flex items-center justify-center h-24 w-full rounded-4xl">
          <h1 className="font-primary text-5xl text-accent">Make A Wish</h1>
        </div>

        <div className="relative bg-muted flex flex-col flex-1 rounded-4xl overflow-hidden">
          <SnowWrapper />

          <div className="relative flex-1 flex items-center justify-center">
            <AnimatePresence>
              {wishSent && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div
                    className="
                      w-[40%] h-[70%]
                      rounded-full
                      bg-emerald-400
                      blur-3xl
                    "
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Image
              src="/xmas-tree.png"
              alt="Christmas Tree"
              fill
              priority
              className="object-contain z-10"
              sizes="100vw"
            />

            <div className="absolute -bottom-80 h-100 w-full bg-[#d7f0f6] rounded-[100%]" />
          </div>

          <div className="bg-secondary z-20 border-t-4 border-primary w-full h-40 shrink-0">
            <WishModal onSuccess={() => setWishSent(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
