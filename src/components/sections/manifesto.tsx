"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/content";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative w-full px-6 sm:px-10 py-32 sm:py-48 overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-3 sticky top-32"
            >
              <span className="text-mono-xs text-[var(--color-accent)]">01</span>
              <span className="text-mono-xs text-[var(--color-fg-muted)]">
                FOUNDER&apos;S NOTE
              </span>
            </motion.div>
          </div>

          <div className="md:col-span-9">
            {profile.manifesto.map((line, i) => {
              const start = i / profile.manifesto.length;
              const end = (i + 1) / profile.manifesto.length;
              return (
                <ManifestoLine
                  key={i}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                >
                  {line}
                </ManifestoLine>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoLine({
  children,
  scrollYProgress,
  start,
  end,
}: {
  children: React.ReactNode;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start * 0.5, (start + end) / 2 * 0.9, end * 0.95 + 0.05],
    [0.18, 1, 0.35]
  );
  return (
    <motion.p
      style={{ opacity }}
      className="text-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.18] text-[var(--color-fg)] mb-6 sm:mb-8 last:mb-0"
    >
      {children}
    </motion.p>
  );
}
