"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section id="hero" className="relative h-[300vh] overflow-visible">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] blur-[1px] saturate-50"
        >
          <source src="/wholebackground1.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <motion.div
          className="relative z-[2] text-center max-w-[900px] px-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
          }}
        >
          {/* Title */}
          <h1 className="font-['Outfit'] font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] tracking-[-2px] mb-8">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                Every great product
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                starts with{" "}
                <span className="bg-gradient-to-r from-white via-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
                  an idea.
                </span>
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-[clamp(1rem,2vw,1.3rem)] text-[var(--text-secondary)] max-w-[600px] mx-auto mb-12 leading-[1.8]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            I&apos;m <strong className="text-white">Jai Kumar</strong> — a full-stack developer
            who transforms ideas into scalable, beautiful digital experiences. This is my story.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 sm:gap-6 justify-center flex-wrap"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex flex-none items-center justify-center min-w-[200px] px-8 py-[18px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-[#050508] font-['Space_Grotesk'] font-bold text-[0.8rem] tracking-[1.5px] uppercase rounded-full hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-400 shadow-[0_8px_40px_rgba(0,240,255,0.25)] whitespace-nowrap"
            >
              Explore My Work ↓
            </a>
            <a
              href="/Jai_resume.pdf"
              download
              className="inline-flex flex-none items-center justify-center min-w-[200px] px-8 py-[18px] bg-transparent text-white font-['Space_Grotesk'] font-semibold text-[0.8rem] tracking-[1.5px] uppercase rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-400 whitespace-nowrap"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-['Space_Grotesk'] text-[0.6rem] tracking-[4px] uppercase text-[var(--text-muted)]">
            Scroll
          </span>
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-[var(--accent)] to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}
