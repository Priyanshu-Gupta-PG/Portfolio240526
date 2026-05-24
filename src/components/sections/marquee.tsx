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

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative w-full overflow-hidden border-y border-[var(--color-border)] py-6 sm:py-8 bg-[var(--color-bg-soft)]"
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12">
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
