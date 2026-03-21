"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import ContactPortal from "@/components/three/ContactPortal";

const socials = [
  {
    icon: "✉️",
    label: "Email",
    href: "mailto:rajput.jai2004@gmail.com",
  },
  {
    icon: "⚡",
    label: "GitHub",
    href: "https://github.com/JaiKumarrajput",
  },
  {
    icon: "🔗",
    label: "LinkedIn",
    href: "https://linkedin.com/",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section relative py-20 md:py-32 lg:py-[200px] px-5 lg:px-10 text-center"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.p
          className="font-['Space_Grotesk'] text-[0.65rem] tracking-[6px] uppercase text-[var(--accent)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Epilogue
        </motion.p>

        <motion.h2
          className="font-['Outfit'] font-extrabold text-[clamp(2rem,4.5vw,4rem)] tracking-[-1px] leading-[1.1] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Let&apos;s Build Something
          <br />
          <span className="gradient-text">Extraordinary</span>
        </motion.h2>

        <motion.p
          className="text-[1.05rem] text-[var(--text-secondary)] max-w-[550px] leading-[1.9] mb-16 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every great collaboration starts with a conversation. Whether you have an idea,
          a project, or just want to connect — I&apos;d love to hear from you.
        </motion.p>

        {/* 3D Portal */}
        <motion.div
          className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ContactPortal />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="max-w-[520px] mx-auto flex flex-col gap-4 mb-12"
          action="https://formspree.io/f/{your-id}"
          method="POST"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="px-6 py-[18px] rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-[16px] text-[var(--text-primary)] font-['Inter'] text-[0.9rem] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_30px_rgba(0,240,255,0.06)] transition-all duration-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="px-6 py-[18px] rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-[16px] text-[var(--text-primary)] font-['Inter'] text-[0.9rem] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_30px_rgba(0,240,255,0.06)] transition-all duration-400"
          />
          <textarea
            name="message"
            placeholder="Tell me about your idea..."
            required
            className="px-6 py-[18px] rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-[16px] text-[var(--text-primary)] font-['Inter'] text-[0.9rem] outline-none min-h-[140px] resize-y focus:border-[var(--accent)] focus:shadow-[0_0_30px_rgba(0,240,255,0.06)] transition-all duration-400"
          />
          <button
            type="submit"
            className="px-10 py-[18px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-[#050508] font-['Space_Grotesk'] font-bold text-[0.8rem] tracking-[2px] uppercase rounded-full border-none hover:-translate-y-[3px] hover:shadow-[0_16px_60px_rgba(0,240,255,0.2)] transition-all duration-400 shadow-[0_8px_40px_rgba(0,240,255,0.12)]"
          >
            Send Message →
          </button>
        </motion.form>

        {/* Social Pills */}
        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 bg-[var(--bg-card)] backdrop-blur-[16px] border border-[var(--border)] rounded-full font-['Space_Grotesk'] text-[0.75rem] tracking-[1px] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,240,255,0.08)] transition-all duration-400"
            >
              {social.icon} {social.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
