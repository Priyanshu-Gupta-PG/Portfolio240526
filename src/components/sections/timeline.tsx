"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline, type TimelineItem } from "@/lib/content";
import { SectionHeader } from "./ventures";
import { cn } from "@/lib/utils";

const kindLabel: Record<TimelineItem["kind"], string> = {
  venture: "VENTURE",
  milestone: "MILESTONE",
  fellowship: "FELLOWSHIP",
  education: "EDUCATION",
};

export function Timeline() {
  return (
    <section
      id="journey"
      className="relative w-full px-6 sm:px-10 py-32 sm:py-48 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          number="03"
          label="JOURNEY"
          headline="From age fourteen to now."
        />

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-x-10">
          {/* spine */}
          <div className="hidden md:block md:col-span-1 relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hairline-v" />
          </div>

          <ol className="md:col-span-11 relative">
            {timeline.map((item, i) => (
              <TimelineRow key={`${item.year}-${item.title}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 5) * 0.06 }}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-x-10 py-7 sm:py-9 border-t border-[var(--color-border)] first:border-t-0"
    >
      {/* node */}
      <div className="hidden md:block absolute -left-[42px] top-[34px]">
        <div className="relative flex items-center justify-center">
          <span
            className={cn(
              "absolute h-3 w-3 rounded-full",
              item.kind === "venture"
                ? "bg-[var(--color-accent)]"
                : "bg-[var(--color-fg-dim)]"
            )}
          />
          <span
            className={cn(
              "h-5 w-5 rounded-full border",
              item.kind === "venture"
                ? "border-[var(--color-accent)]"
                : "border-[var(--color-border-strong)]"
            )}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <span className="text-display text-[clamp(1.5rem,2.4vw,2rem)] text-[var(--color-fg-muted)] tabular-nums">
          {item.year}
        </span>
      </div>

      <div className="md:col-span-7">
        <h3 className="text-[clamp(1.05rem,1.4vw,1.35rem)] text-[var(--color-fg)] font-medium leading-snug">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm sm:text-base text-[var(--color-fg-muted)] leading-relaxed max-w-xl">
          {item.body}
        </p>
      </div>

      <div className="md:col-span-3 md:text-right md:self-start">
        <span
          className={cn(
            "text-mono-xs",
            item.kind === "venture"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-fg-dim)]"
          )}
        >
          {kindLabel[item.kind]}
        </span>
      </div>
    </motion.li>
  );
}
