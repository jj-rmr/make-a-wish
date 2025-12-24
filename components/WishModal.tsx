"use client";

import { useState } from "react";
import WishForm from "./WishForm";
import * as motion from "motion/react-client";

export default function WishModal({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="h-full w-full bg-accent px-6 py-3 text-muted text-5xl font-primary
                   hover:opacity-90 transition"
      >
        Leave a Wish
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={{ backdropFilter: "0px", opacity: 0 }}
            animate={{ backdropFilter: "8px", opacity: 1 }}
            exit={{ backdropFilter: "0px", opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* MODAL */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-2 rounded-4xl
                       bg-background p-6 shadow-xl outline outline-accent"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-primary font-bold
                         hover:scale-110 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <WishForm
              onSuccess={() => {
                onSuccess?.(); // 🔥 notify Home
                setOpen(false); // close modal after success
              }}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
