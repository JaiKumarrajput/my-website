"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import PlanetSkills from "@/components/three/PlanetSkills";

export default function SkillsGalaxy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative py-20 md:py-32 lg:py-[200px] px-5 lg:px-10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.p
          className="font-['Space_Grotesk'] text-[0.65rem] tracking-[6px] uppercase text-[var(--accent)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Chapter 02
        </motion.p>

        <motion.h2
          className="font-['Outfit'] font-extrabold text-[clamp(2rem,4.5vw,4rem)] tracking-[-1px] leading-[1.1] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Skills Galaxy
        </motion.h2>

        <motion.p
          className="text-[1.05rem] text-[var(--text-secondary)] max-w-[550px] leading-[1.9] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Technologies I&apos;ve mastered, orbiting in my development universe. Hover and explore each planet.
        </motion.p>

        {/* 3D Galaxy */}
        <motion.div
          className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-[var(--border)] bg-[rgba(5,5,8,0.5)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Canvas
            camera={{ position: [0, 2, 14], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <PlanetSkills />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 3}
              />
            </Suspense>
          </Canvas>

          {/* Overlay gradient at edges */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[var(--bg)] via-transparent to-transparent opacity-30" />
        </motion.div>

        {/* Skill tags below the galaxy */}
        <motion.div
          className="flex flex-wrap gap-3 mt-10 justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            "React",
            "JavaScript",
            "HTML5",
            "CSS3",
            "PHP",
            "MySQL",
            "Firebase",
            "Java",
            "Android Studio",
            "API Integration",
          ].map((skill, i) => (
            <motion.span
              key={skill}
              className="font-['Space_Grotesk'] text-[0.72rem] tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-[rgba(0,240,255,0.12)] bg-[rgba(0,240,255,0.03)] text-[var(--accent)] hover:bg-[rgba(0,240,255,0.08)] hover:border-[rgba(0,240,255,0.25)] hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
