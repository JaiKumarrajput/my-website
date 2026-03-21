"use client";

export default function MarqueeSection() {
  const words = ["DEVELOPER", "DESIGNER", "CREATOR", "ENGINEER"];
  // Duplicate for infinite scroll effect
  const items = [...words, ...words, ...words, ...words];

  return (
    <div className="py-[60px] overflow-hidden bg-[var(--bg)] whitespace-nowrap flex select-none border-t border-b border-[rgba(255,255,255,0.03)]">
      <div className="inline-flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        {items.map((word, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-['Outfit'] text-[clamp(4rem,8vw,8rem)] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] tracking-[-2px]">
              {word}
            </span>
            <span className="text-[var(--accent)] mx-10 text-[0.5em] opacity-50">
              •
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
