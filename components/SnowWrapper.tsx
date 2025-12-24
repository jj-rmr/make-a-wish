"use client";

import React, { useEffect, useState } from "react";
import SnowOverlay from "./SnowOverlay";

export default function SnowWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <SnowOverlay />;
}
