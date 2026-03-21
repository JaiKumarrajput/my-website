"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const sectionDialogues: Record<string, string[]> = {
  hero: [
    "Hey there! 👋",
    "I'm Jai Kumar!",
    "A Full-Stack Developer",
    "Scroll to explore my journey! ↓",
  ],
  origin: [
    "This is where it all began...",
    "Curious kid → Developer 🚀",
    "B.Tech in Computer Engineering",
  ],
  skills: [
    "These are my superpowers! ⚡",
    "10+ technologies mastered",
    "Always learning something new",
  ],
  projects: [
    "Check out my creations! 🎨",
    "Every project tells a story",
    "Click a building for details!",
  ],
  achievements: [
    "Our biggest milestone! 🏆",
    "We launched a real product!",
    "IPTV — free for all users",
  ],
  contact: [
    "Let's connect! 💬",
    "Got an idea? Let's build it!",
    "I'd love to hear from you",
  ],
};

export default function CharacterGuide() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("hero");
  const dialogueIdx = useRef(0);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeText = useCallback((text: string, callback?: () => void) => {
    if (!textRef.current || !bubbleRef.current) return;
    let ci = 0;
    textRef.current.textContent = "";
    bubbleRef.current.style.opacity = "1";
    bubbleRef.current.style.transform = "translateY(0) scale(1)";

    function typ() {
      if (!textRef.current) return;
      if (ci < text.length) {
        textRef.current.textContent += text[ci];
        ci++;
        typingTimeout.current = setTimeout(typ, 30 + Math.random() * 20);
      } else {
        if (callback) callback();
      }
    }
    typ();
  }, []);

  const playDialogue = useCallback(() => {
    const msgs = sectionDialogues[currentSection];
    if (!msgs || msgs.length === 0) return;
    const text = msgs[dialogueIdx.current % msgs.length];

    typeText(text, () => {
      typingTimeout.current = setTimeout(() => {
        if (bubbleRef.current) {
          bubbleRef.current.style.opacity = "0";
          bubbleRef.current.style.transform = "translateY(8px) scale(0.95)";
        }
        typingTimeout.current = setTimeout(() => {
          dialogueIdx.current++;
          playDialogue();
        }, 500);
      }, 2800);
    });
  }, [currentSection, typeText]);

  // Play dialogue on section change
  useEffect(() => {
    const timeout = setTimeout(playDialogue, 600);
    return () => clearTimeout(timeout);
  }, [currentSection, playDialogue]);

  // Determine section positions and initialize GSAP
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (guideRef.current) {
          gsap.to(guideRef.current, { opacity: 1, duration: 1.5, delay: 2 });
        }

        const isMobile = window.innerWidth <= 768;
        const baseScale = isMobile ? 0.65 : 1;

        const positions: Record<string, any> = {
          hero: { x: "5vw", y: 0, rotation: 0, scale: baseScale },
          origin: { x: "3vw", y: 40, rotation: -2, scale: baseScale * 0.95 },
          skills: { x: isMobile ? "50vw" : "75vw", y: 80, rotation: 3, scale: baseScale * 0.92 },
          projects: { x: "4vw", y: 30, rotation: -1, scale: baseScale * 0.95 },
          achievements: { x: "5vw", y: 50, rotation: -2, scale: baseScale * 0.93 },
          contact: { x: isMobile ? "55vw" : "70vw", y: 0, rotation: 0, scale: baseScale * 0.95 },
        };

        const sections = ["hero", "origin", "skills", "projects", "achievements", "contact"];
        
        // Initial setup
        if (guideRef.current) {
          gsap.set(guideRef.current, {
            left: 0,
            x: positions["hero"].x,
            y: positions["hero"].y,
            rotation: positions["hero"].rotation,
            scale: positions["hero"].scale,
          });
        }

        sections.forEach((sectionId, i) => {
          const sectionEl = document.getElementById(sectionId);
          if (!sectionEl) return;

          ScrollTrigger.create({
            trigger: sectionEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentSection(sectionId),
            onEnterBack: () => setCurrentSection(sectionId),
          });

          // Animation towards this section's character state when we scroll to it
          if (i > 0 && guideRef.current) {
            gsap.to(guideRef.current, {
              scrollTrigger: {
                trigger: sectionEl,
                start: "top bottom", 
                end: "top center",
                scrub: 1,
              },
              x: positions[sectionId].x,
              y: positions[sectionId].y,
              rotation: positions[sectionId].rotation,
              scale: positions[sectionId].scale,
              ease: "power2.inOut",
            });
          }
        });

        // Cleanup
        return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      });
    });
  }, []);

  return (
    <div
      ref={guideRef}
      className="character-guide pointer-events-none opacity-0 fixed top-[18vh] md:top-[25vh] z-[8000]"
      style={{ transformOrigin: "top left" }}
    >
      <div ref={bubbleRef} className="speech-bubble">
        <span ref={textRef} className="speech-text"></span>
        <span className="speech-cursor">|</span>
      </div>
      <svg
        className="character-svg"
        viewBox="0 0 200 450"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c48b71" />
            <stop offset="50%" stopColor="#e8b89d" />
            <stop offset="100%" stopColor="#d19c81" />
          </linearGradient>
          <linearGradient id="hair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a35" />
            <stop offset="100%" stopColor="#111118" />
          </linearGradient>
          <linearGradient id="fabric" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a14" />
          </linearGradient>
          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="iris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a3b2c" />
            <stop offset="100%" stopColor="#1a120b" />
          </radialGradient>
          <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="100" cy="430" rx="60" ry="12" fill="url(#cyanGlow)" opacity="0.4" className="char-shadow" />
        <ellipse cx="100" cy="430" rx="35" ry="6" fill="#000" opacity="0.6" className="char-shadow" />

        <g className="char-torso">
          {/* Legs */}
          <g className="char-legs">
            <g className="char-leg-left">
              <path d="M72 260 L84 260 L80 380 L66 380 Z" fill="#0f0f18" />
              <path d="M78 260 L84 260 L80 380 L76 380 Z" fill="#1a1a28" />
              <path d="M60 400 Q60 380 75 380 Q90 380 90 400 L90 410 Q90 415 80 415 L60 415 Z" fill="#111" filter="url(#drop-shadow)" />
              <path d="M60 410 L90 410 L90 415 Q80 418 60 415 Z" fill="#00f0ff" />
            </g>
            <g className="char-leg-right">
              <path d="M116 260 L128 260 L122 380 L108 380 Z" fill="#0a0a10" />
              <path d="M122 260 L128 260 L122 380 L118 380 Z" fill="#151520" />
              <path d="M102 400 Q102 380 117 380 Q132 380 132 400 L132 410 Q132 415 122 415 L102 415 Z" fill="#111" filter="url(#drop-shadow)" />
              <path d="M102 410 L132 410 L132 415 Q122 418 102 415 Z" fill="#00f0ff" />
            </g>
          </g>

          {/* Torso */}
          <g className="char-body">
            <path d="M50 160 Q100 140 150 160 L140 280 Q100 290 60 280 Z" fill="url(#fabric)" filter="url(#drop-shadow)" />
            <path d="M70 180 Q80 200 75 240" stroke="#2a2a3e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M130 180 Q120 200 125 240" stroke="#2a2a3e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M90 160 Q85 190 85 210" stroke="#00f0ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
            <circle cx="85" cy="210" r="2" fill="#00f0ff" />
            <path d="M110 160 Q115 190 115 210" stroke="#00f0ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
            <circle cx="115" cy="210" r="2" fill="#00f0ff" />
            <path d="M70 230 L130 230 L140 270 L60 270 Z" fill="#121220" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="100" y1="160" x2="100" y2="280" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.4" />
          </g>

          {/* Left Arm */}
          <g className="char-arm-left">
            <path d="M55 165 Q30 200 40 250" stroke="url(#fabric)" strokeWidth="18" fill="none" strokeLinecap="round" />
            <circle cx="42" cy="255" r="10" fill="url(#skin)" />
          </g>

          {/* Right Arm (Waving) */}
          <g className="char-arm-right">
            <path d="M145 165 Q175 190 160 230" stroke="url(#fabric)" strokeWidth="18" fill="none" strokeLinecap="round" filter="url(#drop-shadow)" />
            <g className="char-hand-wave">
              <circle cx="162" cy="240" r="11" fill="url(#skin)" />
              <path d="M152 235 Q145 230 148 220" stroke="url(#skin)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M158 232 Q155 220 158 210" stroke="url(#skin)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M164 232 Q165 220 168 212" stroke="url(#skin)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M170 235 Q175 230 176 222" stroke="url(#skin)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M155 242 Q145 245 142 240" stroke="url(#skin)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* Head */}
        <g className="char-head">
          <rect x="91" y="130" width="18" height="30" rx="6" fill="#a3765c" />
          <rect x="91" y="130" width="18" height="20" rx="6" fill="url(#skin)" />
          <path d="M68 95 Q60 100 66 115 Q72 120 72 105 Z" fill="url(#skin)" />
          <path d="M132 95 Q140 100 134 115 Q128 120 128 105 Z" fill="url(#skin)" />
          <rect x="70" y="50" width="60" height="90" rx="30" fill="url(#skin)" />
          <path d="M70 80 Q65 40 100 35 Q135 40 130 80 Q135 45 100 30 Q65 45 70 80 Z" fill="url(#hair)" />
          <path d="M65 85 Q75 60 100 65 Q125 60 135 85 Q130 50 100 55 Q70 50 65 85 Z" fill="#1a1a25" />

          {/* Eyes */}
          <g className="char-eyes">
            <ellipse cx="86" cy="100" rx="6" ry="7" fill="#f8f9fa" />
            <ellipse cx="87" cy="100" rx="3.5" ry="4" fill="url(#iris)" />
            <ellipse cx="87" cy="100" rx="1.5" ry="2" fill="#000" />
            <circle cx="86" cy="98" r="1.2" fill="#fff" />

            <ellipse cx="114" cy="100" rx="6" ry="7" fill="#f8f9fa" />
            <ellipse cx="113" cy="100" rx="3.5" ry="4" fill="url(#iris)" />
            <ellipse cx="113" cy="100" rx="1.5" ry="2" fill="#000" />
            <circle cx="112" cy="98" r="1.2" fill="#fff" />
          </g>

          {/* Eyebrows */}
          <path d="M78 90 Q85 85 94 88" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M122 90 Q115 85 106 88" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M98 108 L100 114 L104 114" stroke="#b08066" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Mouth */}
          <path d="M92 122 Q100 128 108 122" stroke="#8a5a46" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Glasses */}
          <rect x="76" y="93" width="22" height="18" rx="6" fill="rgba(0,240,255,0.05)" stroke="#00f0ff" strokeWidth="1.5" />
          <rect x="102" y="93" width="22" height="18" rx="6" fill="rgba(0,240,255,0.05)" stroke="#00f0ff" strokeWidth="1.5" />
          <path d="M98 102 Q100 100 102 102" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
          <path d="M76 100 L68 98" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
          <path d="M124 100 L132 98" stroke="#00f0ff" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}
