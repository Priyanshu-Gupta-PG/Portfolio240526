"use client";

import { motion } from "framer-motion";

const items = [
  "Two acquisitions",
  "Y Combinator · SUS India",
  "Perplexity Business Fellow",
  "MIT LaunchX Alumnus",
  "McKinsey Forward 2025",
  "BuilderFellows · Founder",
  "Polaris E-Cell · Dealflow",
  "Bengaluru ↔ Bay Area",
];

// Render two identical sets back-to-back, then animate translateX 0% → -50%.
// Because the second set is identical to the first, the loop point is invisible.
export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative w-full overflow-hidden border-y border-[var(--color-border)] py-6 sm:py-8 bg-[var(--color-bg-soft)]"
    >
      <motion.div
        className="flex w-max gap-12 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-12 whitespace-nowrap"
          >
            <span className="text-display text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--color-fg)]">
              {item}
            </span>
            <span className="text-[var(--color-accent)] text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
