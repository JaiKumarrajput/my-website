"use client";

import { useState, useEffect } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`loader ${hidden ? "hidden" : ""}`}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      <div className="loader-counter">{Math.floor(progress)}%</div>
      <div className="loader-bar">
        <div
          className="loader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="loader-text">Loading Experience</span>
    </div>
  );
}
