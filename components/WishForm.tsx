"use client";

import React, { useState } from "react";

export default function WishForm({ onSuccess }: { onSuccess?: () => void }) {
  const [from, setFrom] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!from.trim()) {
      setError("Please enter who this is from.");
      return;
    }

    if (!wish.trim()) {
      setError("Please enter your wish.");
      return;
    }

    setError("");
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, wish }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setFrom("");
      setWish("");

      onSuccess?.();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "rounded-lg border border-dashed border-accent/80 px-4 py-3 w-full grow " +
    "focus:outline-none focus:ring focus:ring-accent focus:ring-offset-2 " +
    "focus:ring-offset-background bg-background";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 p-4 place-items-center"
    >
      <div className="mt-8 relative w-full">
        <input
          type="text"
          placeholder="From"
          value={from}
          maxLength={255}
          onChange={(e) => setFrom(e.target.value)}
          className={inputStyle}
        />
        <span className="absolute top-1 right-1 text-xs text-foreground/60">
          {from.length}/255
        </span>
      </div>

      <div className="relative w-full">
        <textarea
          placeholder="Your Wish"
          value={wish}
          maxLength={255}
          rows={4}
          onChange={(e) => setWish(e.target.value)}
          className={`${inputStyle} resize-none`}
        />
        <span className="absolute top-1 right-1 text-xs text-foreground/60">
          {wish.length}/255
        </span>
      </div>

      {error && (
        <p className="text-sm text-primary text-center italic">{error}</p>
      )}

      {status === "success" && (
        <p className="text-sm text-muted text-center italic">
          Wish sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-primary text-center italic">
          Failed to send wish.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="self-center rounded-lg bg-accent px-6 py-3 text-background font-bold
                   hover:scale-105 disabled:opacity-50 transition"
      >
        {loading ? "Sending..." : "Send Wish"}
      </button>
    </form>
  );
}
