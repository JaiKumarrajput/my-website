"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ContactPortal() {
  const portalRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  // Portal particles
  const particleCount = 500;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2 + Math.random() * 1.5;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = Math.sin(angle) * radius;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;

    const colorChoice = Math.random();
    if (colorChoice < 0.5) {
      particleColors[i * 3] = 0;
      particleColors[i * 3 + 1] = 0.94;
      particleColors[i * 3 + 2] = 1;
    } else {
      particleColors[i * 3] = 0.55;
      particleColors[i * 3 + 1] = 0.36;
      particleColors[i * 3 + 2] = 0.96;
    }
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (portalRef.current) {
      portalRef.current.rotation.z += 0.005;
      const scale = 1 + Math.sin(time) * 0.05;
      portalRef.current.scale.setScalar(scale);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= 0.008;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.003;
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.atan2(positions[i * 3 + 1], positions[i * 3]);
        const newAngle = angle + 0.002;
        const radius = Math.sqrt(
          positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2
        );
        positions[i * 3] = Math.cos(newAngle) * radius;
        positions[i * 3 + 1] = Math.sin(newAngle) * radius;
        positions[i * 3 + 2] += Math.sin(time + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} intensity={3} color="#00f0ff" />
      <pointLight position={[0, 0, -3]} intensity={2} color="#8b5cf6" />

      {/* Outer ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[3, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.2, 0.08, 12, 80]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Portal center glow */}
      <mesh>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Energy particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
