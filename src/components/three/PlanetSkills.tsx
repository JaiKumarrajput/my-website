"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface SkillPlanet {
  name: string;
  color: string;
  position: [number, number, number];
  size: number;
}

const skills: SkillPlanet[] = [
  { name: "React", color: "#61dafb", position: [-6, 2, -3], size: 0.9 },
  { name: "JavaScript", color: "#f7df1e", position: [4, -1, -5], size: 1.0 },
  { name: "HTML5", color: "#e44d26", position: [-3, -3, -4], size: 0.7 },
  { name: "CSS3", color: "#264de4", position: [7, 1, -6], size: 0.7 },
  { name: "PHP", color: "#777bb4", position: [-8, 0, -7], size: 0.8 },
  { name: "MySQL", color: "#4479a1", position: [2, 4, -5], size: 0.75 },
  { name: "Firebase", color: "#ffca28", position: [-5, -2, -6], size: 0.85 },
  { name: "Java", color: "#ed8b00", position: [6, -3, -4], size: 0.95 },
  { name: "Android", color: "#3ddc84", position: [-2, 3, -8], size: 0.8 },
  { name: "APIs", color: "#00f0ff", position: [0, -4, -3], size: 0.65 },
];

function Planet({
  name,
  color,
  position,
  size,
}: SkillPlanet) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (glowRef.current) {
      const scale = 1.3 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.2;
      ringRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={1.5}
      floatingRange={[-0.3, 0.3]}
    >
      <group position={position}>
        {/* Glow sphere behind the planet */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.5, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>

        {/* Main planet */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Orbit ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size * 1.6, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -size - 0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

export default function PlanetSkills() {
  return (
    <group>
      {/* Ambient and point lights for the galaxy */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
      <pointLight position={[10, 5, -5]} intensity={1} color="#8b5cf6" />

      {skills.map((skill) => (
        <Planet key={skill.name} {...skill} />
      ))}
    </group>
  );
}
