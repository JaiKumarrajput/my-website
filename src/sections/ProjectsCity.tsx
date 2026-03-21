"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectBuildings from "@/components/three/ProjectBuildings";

const projects = [
  {
    title: "Amazon Clone",
    description:
      "A full-featured e-commerce platform replicating Amazon's core experience — from product discovery to secure payment processing. Built with a modern React frontend, real-time Firebase backend, and Stripe-powered checkout.",
    stack: ["React", "Firebase", "Stripe", "Auth"],
    color: "#00f0ff",
    image: "/amazon-clone.jpg",
    githubUrl: "",
    liveUrl: ""
  },
  {
    title: "Microservices Banking",
    description:
      "A robust online banking system built with microservices architecture — secure account management, real-time transactions, and financial data processing. Designed for scale, reliability, and enterprise-grade security.",
    stack: ["AngularJS", "Microservices", "REST API"],
    color: "#8b5cf6",
    image: "/banking-system.jpg",
    githubUrl: "",
    liveUrl: ""
  },
  {
    title: "Real-Time Chat",
    description:
      "A real-time desktop chat application enabling instant messaging through socket connections. Features a clean Java Swing interface, multi-threaded server architecture, and reliable message delivery.",
    stack: ["Java Swing", "Socket.IO", "Multithreading"],
    color: "#ec4899",
    image: "/chat-application.png",
    githubUrl: "",
    liveUrl: ""
  },
  {
    title: "WMS - 3PL",
    description:
      "A comprehensive Multi-Tenant third-party logistics (3PL) Warehouse Management System. Designed to optimize supply chain operations with robust inventory tracking, order fulfillment, real-time analytics, and warehouse space utilization.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    color: "#fb923c",
    image: "/wms-dashboard.png",
    githubUrl: "https://github.com/JaiKumarrajput/Warehouse-Management-System-3PL.git",
    liveUrl: "coming_soon"
  },
  {
    title: "Get Developer",
    description:
      "A dedicated platform bridging the gap between exceptional developers and ambitious businesses. Designed with a seamless user experience, featuring advanced search algorithms to match project requirements with the right talent to go online efficiently.",
    stack: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    color: "#4ade80",
    image: "/get-developer.png",
    githubUrl: "https://github.com/JaiKumarrajput/Get-Developer_Best-for-go-online.git",
    liveUrl: "coming_soon"
  }
];

export default function ProjectsCity() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
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
          Chapter 03
        </motion.p>

        <motion.h2
          className="font-['Outfit'] font-extrabold text-[clamp(2rem,4.5vw,4rem)] tracking-[-1px] leading-[1.1] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Projects City
        </motion.h2>

        <motion.p
          className="text-[1.05rem] text-[var(--text-secondary)] max-w-[550px] leading-[1.9] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Each building represents a project I&apos;ve built. Click to explore the details.
        </motion.p>

        {/* 3D City */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-[var(--border)] bg-[rgba(5,5,8,0.5)] cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Canvas
            camera={{ position: [0, 6, 12], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ pointerEvents: "auto" }}
          >
            <Suspense fallback={null}>
              <ProjectBuildings onBuildingClick={(i) => setSelectedProject(i)} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={Math.PI / 4}
              />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        </motion.div>

        {/* Project Cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card p-6 cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              onClick={() => setSelectedProject(i)}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 w-full h-[3px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                }}
              />

              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-['Outfit'] font-black text-4xl opacity-10"
                  style={{ color: project.color }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-['Outfit'] font-bold text-xl text-white">
                  {project.title}
                </h3>
              </div>

              <p className="text-[0.88rem] text-[var(--text-secondary)] leading-[1.7] mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-['Space_Grotesk'] text-[0.65rem] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border border-[rgba(0,240,255,0.12)] bg-[rgba(0,240,255,0.03)] text-[var(--accent)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="project-modal-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              {/* Project image */}
              <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-8 border border-[var(--border)]">
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span
                className="font-['Space_Grotesk'] text-[0.65rem] tracking-[4px] uppercase mb-3 block"
                style={{ color: projects[selectedProject].color }}
              >
                Mission 0{selectedProject + 1}
              </span>

              <h3 className="font-['Outfit'] font-extrabold text-3xl mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {projects[selectedProject].title}
              </h3>

              <p className="text-[var(--text-secondary)] leading-[1.9] mb-6">
                {projects[selectedProject].description}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {projects[selectedProject].stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-['Space_Grotesk'] text-[0.72rem] tracking-[1.5px] uppercase px-5 py-2.5 rounded-full border border-[rgba(0,240,255,0.12)] bg-[rgba(0,240,255,0.03)] text-[var(--accent)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {projects[selectedProject].githubUrl && (
                  <a
                    href={projects[selectedProject].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-white text-black font-['Space_Grotesk'] font-bold text-sm tracking-wider uppercase hover:bg-[var(--accent)] transition-colors"
                  >
                    Source Code
                  </a>
                )}
                {projects[selectedProject].liveUrl === "coming_soon" ? (
                  <button
                    disabled
                    className="flex-1 text-center py-3 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text-secondary)] font-['Space_Grotesk'] font-bold text-sm tracking-wider uppercase opacity-70 cursor-not-allowed"
                  >
                    Live Soon
                  </button>
                ) : projects[selectedProject].liveUrl ? (
                  <a
                    href={projects[selectedProject].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-transparent border border-[var(--accent)] text-[var(--accent)] font-['Space_Grotesk'] font-bold text-sm tracking-wider uppercase hover:bg-[rgba(0,240,255,0.1)] transition-colors"
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
