"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "./StarField";

export default function SceneBackground() {
  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <StarField count={2000} />
          <ambientLight intensity={0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
