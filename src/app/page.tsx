"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import CharacterGuide from "@/components/CharacterGuide";
import MarqueeSection from "@/components/MarqueeSection";
import SceneBackground from "@/components/three/SceneBackground";

import HeroSection from "@/sections/HeroSection";
import JourneySection from "@/sections/JourneySection";
import SkillsGalaxy from "@/sections/SkillsGalaxy";
import ProjectsCity from "@/sections/ProjectsCity";
import AchievementsSection from "@/sections/AchievementsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Update scroll progress bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />
      <CustomCursor />

      {!loading && (
        <ReactLenis root options={{ lerp: 0.02, duration: 2, smoothWheel: true }}>
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
          
          <Navbar />
          <SceneBackground />
          <CharacterGuide />

          <main className="relative z-10 w-full overflow-hidden text-white font-['Inter']">
            <HeroSection />
            
            <div className="py-12 md:py-24">
              <div className="divider">
                <div className="divider-line" />
              </div>
            </div>
            
            <JourneySection />
            
            <div className="py-12 md:py-24">
              <div className="divider">
                <div className="divider-line" />
              </div>
            </div>
            
            <MarqueeSection />
            
            <SkillsGalaxy />
            
            <div className="py-12 md:py-24">
              <div className="divider">
                <div className="divider-line" />
              </div>
            </div>
            
            <ProjectsCity />
            
            <div className="py-12 md:py-24">
              <div className="divider">
                <div className="divider-line" />
              </div>
            </div>
            
            <AchievementsSection />
            
            <div className="py-12 md:py-24">
              <div className="divider">
                <div className="divider-line" />
              </div>
            </div>
            
            <ContactSection />

            {/* Footer */}
            <footer className="relative z-10 text-center py-[60px] px-5 border-t border-[var(--border)]">
              <p className="font-['Space_Grotesk'] text-[0.7rem] tracking-[2px] text-[var(--text-muted)] uppercase">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
                  Jai Kumar
                </span>
                {" "}· Crafted with passion and purpose
              </p>
            </footer>
          </main>
        </ReactLenis>
      )}
    </>
  );
}
