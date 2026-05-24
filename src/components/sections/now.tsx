"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { nowList } from "@/lib/content";
import { SectionHeader } from "./ventures";

export function Now() {
  return (
    <section
      id="now"
      className="relative w-full px-6 sm:px-10 py-32 sm:py-48 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="md:col-span-5">
            <SectionHeader
              number="05"
              label="NOW"
              headline="What I'm working on this week."
            />
            <p className="mt-6 text-[var(--color-fg-muted)] text-base leading-relaxed max-w-md">
              Inspired by Derek Sivers&apos;{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-fg)] underline decoration-[var(--color-accent)] underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
              >
                /now page
              </a>
              . Updated when something meaningful changes.
            </p>
          </div>

          <ul className="md:col-span-7">
            {nowList.map((item, i) => (
              <NowRow key={i} index={i}>
                {item}
              </NowRow>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NowRow({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="flex gap-5 sm:gap-6 py-5 sm:py-6 border-b border-[var(--color-border)] last:border-b-0"
    >
      <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums pt-1">
        0{index + 1}
      </span>
      <p className="text-base sm:text-lg text-[var(--color-fg)] leading-snug">
        {children}
      </p>
    </motion.li>
  );
}
