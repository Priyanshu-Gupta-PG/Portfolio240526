"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/content";
import { LineReveal, FadeIn } from "@/components/ui/reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full flex flex-col justify-end pb-24 sm:pb-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
        }}
      />

      {/* kicker */}
      <motion.div
        style={{ y, opacity }}
        className="mx-auto w-full max-w-[1500px] flex flex-col gap-10 sm:gap-14"
      >
        <FadeIn delay={0.1} className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          <span className="text-mono-xs text-[var(--color-fg-muted)]">
            {profile.role}
          </span>
        </FadeIn>

        {/* headline */}
        <h1 className="text-display text-[clamp(3.5rem,11vw,11.5rem)] text-[var(--color-fg)] max-w-[18ch]">
          <LineReveal delay={0.25}>
            <span>{profile.story.headline[0]}</span>
          </LineReveal>
          <LineReveal delay={0.4}>
            <span className="text-display-italic text-[var(--color-fg-muted)]">
              {profile.story.headline[1]}
            </span>
          </LineReveal>
        </h1>

        {/* sub */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-7 lg:col-span-6">
            <LineReveal delay={0.7}>
              <p className="text-display text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--color-fg)] leading-[1.05]">
                {profile.story.sub}
              </p>
            </LineReveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10 self-end">
            <FadeIn delay={1.0}>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {profile.story.where}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* footer strip */}
        <FadeIn delay={1.2} className="mt-8 sm:mt-12">
          <div className="hairline w-full" />
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-6 text-mono-xs text-[var(--color-fg-muted)]">
              <span>
                <span className="text-[var(--color-fg-dim)]">↳</span>{" "}
                {profile.city.toUpperCase()}, {profile.country.toUpperCase()}
              </span>
              <span className="hidden sm:inline text-[var(--color-fg-dim)]">·</span>
              <span className="text-[var(--color-fg-dim)]">
                25° 35′ N, 77° 35′ E
              </span>
            </div>
            <div className="flex items-center gap-2 text-mono-xs text-[var(--color-fg-muted)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span>OPEN TO BUILD</span>
            </div>
          </div>
        </FadeIn>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 hidden sm:flex flex-col items-end gap-2"
      >
        <span className="text-mono-xs text-[var(--color-fg-dim)]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-transparent via-[var(--color-fg-dim)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
