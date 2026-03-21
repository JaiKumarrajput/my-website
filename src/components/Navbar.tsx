"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Origin", href: "#origin" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[9000] px-6 md:px-10 py-5 flex justify-between items-center mix-blend-difference">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="font-['Outfit'] font-extrabold text-[1.4rem] tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          JK.
        </a>

        {/* Centered Desktop Eyebrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <p className="font-['Space_Grotesk'] text-[0.7rem] tracking-[6px] uppercase text-[var(--accent)] whitespace-nowrap">
            Welcome to my universe
          </p>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="font-['Space_Grotesk'] text-[0.72rem] tracking-[2px] uppercase text-white/60 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-400 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-7 h-5 flex flex-col justify-between bg-transparent border-none z-[9001]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[2px] bg-white rounded transition-all duration-300 ${
              isOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`w-full h-[2px] bg-white rounded transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-[2px] bg-white rounded transition-all duration-300 ${
              isOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(5,5,8,0.95)] backdrop-blur-[20px] z-[8999] flex items-center justify-center"
          >
            <ul className="list-none text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  className="my-8"
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="font-['Outfit'] text-4xl font-bold text-white tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
