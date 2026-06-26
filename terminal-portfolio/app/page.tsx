"use client";

// ============================================
// Terminal Portfolio — Main Page
// ============================================

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import Terminal from "@/components/Terminal";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {!isBooted ? (
        <BootSequence onComplete={() => setIsBooted(true)} />
      ) : (
        <Terminal />
      )}
    </main>
  );
}
