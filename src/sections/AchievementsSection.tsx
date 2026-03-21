"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}

function AnimatedCounter({ end, suffix = "", duration = 2, isInView }: CounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span className="gradient-text font-['Outfit'] font-black text-[clamp(3rem,6vw,5rem)]">
      {count}
      {suffix}
    </span>
  );
}

const achievements = [
  { value: 10, suffix: "+", label: "Projects Built", icon: "🚀" },
  { value: 12, suffix: "+", label: "Technologies Used", icon: "⚡" },
  { value: 3, suffix: "+", label: "Years of Learning", icon: "📚" },
  { value: 2000, suffix: "+", label: "Coding Hours", icon: "⏱️" },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section relative py-20 md:py-32 lg:py-[200px] px-5 lg:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.p
          className="font-['Space_Grotesk'] text-[0.65rem] tracking-[6px] uppercase text-[var(--accent)] mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Chapter 04
        </motion.p>

        <motion.h2
          className="font-['Outfit'] font-extrabold text-[clamp(2rem,4.5vw,4rem)] tracking-[-1px] leading-[1.1] mb-5 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Achievements
        </motion.h2>

        <motion.p
          className="text-[1.05rem] text-[var(--text-secondary)] max-w-[550px] leading-[1.9] mb-16 text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Numbers that tell the story of my developer journey.
        </motion.p>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.label}
              className="glass-card p-8 text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            >
              <span className="text-3xl mb-4 block">{ach.icon}</span>
              <AnimatedCounter
                end={ach.value}
                suffix={ach.suffix}
                isInView={isInView}
                duration={2 + i * 0.3}
              />
              <span className="font-['Space_Grotesk'] text-[0.7rem] tracking-[2px] uppercase text-[var(--text-muted)] mt-3 block">
                {ach.label}
              </span>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,240,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* IPTV Milestone */}
        <motion.div
          className="glass-card p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,240,255,0.02)] to-[rgba(139,92,246,0.02)]" />
          <span className="text-5xl mb-6 block">🏆</span>
          <h3 className="font-['Outfit'] font-bold text-2xl mb-3">
            We Launched IPTV
          </h3>
          <p className="text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.8] mb-10">
            A broadcasting application launched with our organization — initially free for all
            users. Born from collaboration, ambition, and a vision to democratize content.
          </p>

          {/* IPTV Screenshots Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => {
              const src = i + 1 === 8 ? `/Project8.jpg` : `/project${i + 1}.jpg`;
              return (
                <motion.div
                  key={i}
                  className="rounded-2xl overflow-hidden aspect-[4/3] relative group cursor-pointer"
                  initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.8 + (i % 3) * 0.15 }}
                >
                  <img
                    src={src}
                    alt={`IPTV Screenshot ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,8,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
