"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ventures, type Venture } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Ventures() {
  return (
    <section id="ventures" className="relative w-full px-6 sm:px-10 py-32 sm:py-48 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader number="03" label="WORK" headline="Companies I've built, sold, and am still building." />
        <ul className="mt-16 sm:mt-24">
          {ventures.map((v, i) => (
            <VentureRow key={v.name} venture={v} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function VentureRow({ venture, index }: { venture: Venture; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);

  const isAcquired = venture.status === "acquired";
  const isActive = venture.status === "active";

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-t border-[var(--color-border)] last:border-b"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-y-3 py-8 sm:py-12 md:gap-x-8">
        {/* number */}
        <div className="md:col-span-1">
          <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums">
            0{index + 1}
          </span>
        </div>

        {/* name */}
        <div className="md:col-span-4">
          <motion.h3
            animate={{ x: hovered ? 8 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[clamp(1.75rem,4vw,3.2rem)] text-[var(--color-fg)]"
          >
            {venture.name}
          </motion.h3>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-mono-xs text-[var(--color-fg-muted)]">
              {venture.role}
            </span>
            {isActive && (
              <span className="inline-flex items-center gap-1.5 text-mono-xs text-[var(--color-accent)]">
                <span className="h-1 w-1 rounded-full bg-[var(--color-accent)] animate-pulse" />
                LIVE
              </span>
            )}
            {isAcquired && (
              <span className="text-mono-xs text-[var(--color-fg-muted)]">
                → ACQUIRED · {venture.acquirer?.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* blurb */}
        <div className="md:col-span-5">
          <p className="text-base sm:text-lg text-[var(--color-fg)] leading-snug max-w-md">
            {venture.blurb}
          </p>
          <p className="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed max-w-md">
            {venture.detail}
          </p>
          {venture.metrics && (
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {venture.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-mono-xs text-[var(--color-fg-dim)]">
                    {m.label.toUpperCase()}
                  </div>
                  <div className="mt-0.5 text-sm text-[var(--color-fg)] tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* dates / arrow */}
        <div className="md:col-span-2 md:text-right">
          <div className="text-mono-xs text-[var(--color-fg-muted)] tabular-nums">
            {venture.start}
            {venture.end ? ` — ${venture.end}` : " — now"}
          </div>
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : -8,
            }}
            transition={{ duration: 0.4 }}
            className="mt-3 inline-flex md:flex md:justify-end"
          >
            <ArrowUpRight
              className="h-5 w-5 text-[var(--color-accent)]"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </div>

      {/* hover accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 -top-px h-px bg-[var(--color-accent)] origin-left"
      />
    </motion.li>
  );
}

export function SectionHeader({
  number,
  label,
  headline,
}: {
  number: string;
  label: string;
  headline: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline gap-3"
      >
        <span className="text-mono-xs text-[var(--color-accent)]">{number}</span>
        <span className="text-mono-xs text-[var(--color-fg-muted)]">{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          "mt-6 text-display text-[clamp(2rem,5vw,4rem)] text-[var(--color-fg)] max-w-[18ch] leading-[1.05]"
        )}
      >
        {headline}
      </motion.h2>
    </div>
  );
}
