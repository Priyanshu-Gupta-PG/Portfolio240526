"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { credentials } from "@/lib/content";
import { SectionHeader } from "./ventures";
import { cn } from "@/lib/utils";

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative w-full px-6 sm:px-10 py-32 sm:py-48 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          number="05"
          label="ROOMS"
          headline="The rooms I've been in."
        />
        <p className="mt-6 max-w-xl text-[var(--color-fg-muted)] text-base leading-relaxed">
          Picked by programs that pick founders. Sat in rooms with the
          people building the next decade.
        </p>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {credentials.map((c, i) => (
            <CredentialCard
              key={c.org}
              org={c.org}
              role={c.role}
              detail={c.detail}
              year={c.year}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialCard({
  org,
  role,
  detail,
  year,
  index,
}: {
  org: string;
  role: string;
  detail: string;
  year: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-[var(--color-bg)] p-8 sm:p-10 min-h-[260px] flex flex-col justify-between overflow-hidden group cursor-default"
    >
      {/* hover bg */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-soft)] to-transparent"
      />

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <h3 className={cn(
            "text-display text-[clamp(1.5rem,2.2vw,2rem)] text-[var(--color-fg)]"
          )}>
            {org}
          </h3>
          <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums">
            {year}
          </span>
        </div>
        <p className="mt-3 text-sm text-[var(--color-accent)]">{role}</p>
      </div>

      <motion.p
        animate={{
          opacity: hovered ? 1 : 0.55,
          y: hovered ? 0 : 4,
        }}
        transition={{ duration: 0.4 }}
        className="relative mt-6 text-sm text-[var(--color-fg-muted)] leading-relaxed"
      >
        {detail}
      </motion.p>

      {/* corner marker */}
      <motion.span
        animate={{ width: hovered ? "100%" : "12px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 h-px bg-[var(--color-accent)]"
      />
    </motion.div>
  );
}
