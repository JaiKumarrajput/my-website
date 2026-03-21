"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  glowColor: string;
  label: string;
  onClick?: () => void;
}

function Building({
  position,
  height,
  width,
  depth,
  color,
  glowColor,
  label,
  onClick,
}: BuildingProps) {
  const meshRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.05}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef} position={position} onClick={onClick}>
        {/* Main building body */}
        <RoundedBox
          args={[width, height, depth]}
          radius={0.15}
          smoothness={4}
          position={[0, height / 2, 0]}
        >
          <meshStandardMaterial
            color={color}
            emissive={glowColor}
            emissiveIntensity={0.15}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </RoundedBox>

        {/* Window grid lines */}
        {Array.from({ length: Math.floor(height / 0.7) }).map((_, i) => (
          <group key={`row-${i}`}>
            {Array.from({ length: Math.floor(width / 0.6) }).map((_, j) => (
              <mesh
                key={`window-${i}-${j}`}
                position={[
                  -width / 2 + 0.4 + j * 0.6,
                  0.8 + i * 0.7,
                  depth / 2 + 0.01,
                ]}
              >
                <planeGeometry args={[0.3, 0.4]} />
                <meshBasicMaterial
                  color={glowColor}
                  transparent
                  opacity={0.3 + Math.random() * 0.4}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Top glow */}
        <pointLight
          ref={glowRef}
          position={[0, height + 0.5, 0]}
          color={glowColor}
          intensity={2}
          distance={5}
        />

        {/* Rooftop accent */}
        <mesh position={[0, height + 0.1, 0]}>
          <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.5} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -0.6, depth / 2 + 0.2]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={3}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

interface ProjectBuildingsProps {
  onBuildingClick?: (index: number) => void;
}

export default function ProjectBuildings({ onBuildingClick }: ProjectBuildingsProps) {
  const buildings = [
    {
      position: [-4, 0, 0] as [number, number, number],
      height: 4,
      width: 2,
      depth: 1.5,
      color: "#0a0a1a",
      glowColor: "#00f0ff",
      label: "Amazon Clone",
    },
    {
      position: [0, 0, -1] as [number, number, number],
      height: 5.5,
      width: 2.2,
      depth: 1.8,
      color: "#0a0a1a",
      glowColor: "#8b5cf6",
      label: "Banking System",
    },
    {
      position: [4, 0, 0.5] as [number, number, number],
      height: 3.5,
      width: 1.8,
      depth: 1.4,
      color: "#0a0a1a",
      glowColor: "#ec4899",
      label: "Chat App",
    },
    {
      position: [-2.5, 0, 2.5] as [number, number, number],
      height: 4.8,
      width: 2.1,
      depth: 1.6,
      color: "#0a0a1a",
      glowColor: "#fb923c",
      label: "WMS 3PL",
    },
    {
      position: [2.5, 0, 2.2] as [number, number, number],
      height: 4.2,
      width: 1.9,
      depth: 1.7,
      color: "#0a0a1a",
      glowColor: "#4ade80",
      label: "Get Developer",
    },
  ];

  return (
    <group>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#00f0ff" />

      {/* Ground plane with glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#050508"
          emissive="#00f0ff"
          emissiveIntensity={0.02}
          roughness={0.9}
        />
      </mesh>

      {/* Grid lines on ground */}
      {Array.from({ length: 21 }).map((_, i) => (
        <mesh
          key={`grid-x-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10 + i, 0.01, 0]}
        >
          <planeGeometry args={[0.01, 10]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
        </mesh>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh
          key={`grid-z-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.01, -5 + i]}
        >
          <planeGeometry args={[20, 0.01]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
        </mesh>
      ))}

      {buildings.map((building, i) => (
        <Building
          key={i}
          {...building}
          onClick={() => onBuildingClick?.(i)}
        />
      ))}
    </group>
  );
}
