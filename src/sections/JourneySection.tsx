"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { icon: "🎓", value: "B.Tech", label: "Computer Engineering" },
  { icon: "🏫", value: "GEU", label: "Graphic Era University" },
  { icon: "💼", value: "Intern", label: "Null Tech Edtech" },
  { icon: "📜", value: "16+", label: "Certifications" },
];

const paragraphs = [
  "It began with curiosity — the kind that makes you take apart things just to see how they work. For me, it wasn't hardware; it was software. The first time I saw code turn into something people could touch and use, I was hooked.",
  "I pursued a B.Tech in Computer Engineering at Graphic Era University, where I built the foundation — algorithms, data structures, system design. But the real classroom was building things: websites, apps, systems that solved real problems for real people.",
  "An internship at Null Technology Edtech sharpened my edge. Working on production websites and portals taught me what textbooks couldn't — deadline-driven development, clean architecture, and the art of shipping code that works at scale.",
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="section relative py-20 md:py-32 lg:py-[200px] px-5 lg:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Chapter Header */}
        <motion.p
          className="font-['Space_Grotesk'] text-[0.65rem] tracking-[6px] uppercase text-[var(--accent)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Chapter 01
        </motion.p>

        <motion.h2
          className="font-['Outfit'] font-extrabold text-[clamp(2rem,4.5vw,4rem)] tracking-[-1px] leading-[1.1] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          The Origin Story
        </motion.h2>

        <motion.p
          className="text-[1.05rem] text-[var(--text-secondary)] max-w-[550px] leading-[1.9] mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every developer has a beginning. Here&apos;s where mine started.
        </motion.p>

        {/* Grid: Story + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Narrative */}
          <div>
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                className={`text-[1.1rem] text-[var(--text-secondary)] leading-[2] mb-7 ${
                  i === 0
                    ? "[&::first-letter]:font-['Outfit'] [&::first-letter]:text-[4rem] [&::first-letter]:font-black [&::first-letter]:float-left [&::first-letter]:leading-[0.8] [&::first-letter]:mr-3 [&::first-letter]:mt-2 [&::first-letter]:bg-gradient-to-br [&::first-letter]:from-[var(--accent)] [&::first-letter]:to-[var(--accent2)] [&::first-letter]:bg-clip-text [&::first-letter]:text-transparent"
                    : ""
                }`}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card p-8 text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.1 }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-[var(--accent)] via-transparent to-[var(--accent2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
                <span className="text-[2rem] mb-3 block">{stat.icon}</span>
                <span className="font-['Outfit'] font-extrabold text-2xl gradient-text block">
                  {stat.value}
                </span>
                <span className="font-['Space_Grotesk'] text-[0.65rem] tracking-[2px] uppercase text-[var(--text-muted)] mt-1 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
