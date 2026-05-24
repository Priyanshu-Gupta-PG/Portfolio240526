"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ventures";
import { links } from "@/lib/content";

const VIDEO_ID = "HwwCLEwwuic";
const VIDEO_TITLE =
  "17-year-old Founder Who Built, Sold & Funded His Own Education";
const VIDEO_META = "Campus CEOs · Episode 04 · Polaris School of Technology";
// hqdefault is reliably available for every video at consistent 480×360.
// maxresdefault occasionally 404s on newer/short uploads.
const THUMB_HQ = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const THUMB_FALLBACK = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(THUMB_HQ);

  return (
    <section
      id="story"
      ref={ref}
      className="relative w-full px-6 sm:px-10 py-32 sm:py-48 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          number="01"
          label="STORY"
          headline="Listen to my story."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          <p className="md:col-span-7 lg:col-span-6 text-[var(--color-fg-muted)] text-base sm:text-lg leading-relaxed max-w-xl">
            Twelve minutes on the long version of how this actually went — from
            building my first company at fourteen, to selling two before
            college, to funding my own education with the proceeds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="relative mt-12 sm:mt-16 rounded-2xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] group"
        >
          <div className="relative aspect-video w-full">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${VIDEO_TITLE}`}
                className="absolute inset-0 group/btn cursor-pointer"
              >
                <Image
                  src={thumbSrc}
                  alt={VIDEO_TITLE}
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/btn:scale-[1.03]"
                  onError={() => {
                    if (thumbSrc !== THUMB_FALLBACK) setThumbSrc(THUMB_FALLBACK);
                  }}
                  unoptimized
                />

                {/* vignette */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-[var(--color-bg)]/10 to-transparent"
                />

                {/* play button */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[var(--color-accent)]/20 blur-2xl scale-100 group-hover/btn:scale-125 transition-transform duration-700" />
                    <span className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] shadow-lg shadow-[var(--color-accent)]/30 transition-transform duration-500 group-hover/btn:scale-110">
                      <Play
                        className="h-8 w-8 sm:h-9 sm:w-9 fill-[var(--color-bg)] translate-x-[2px]"
                        strokeWidth={0}
                      />
                    </span>
                  </span>
                </span>

                {/* meta strip */}
                <span className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <span className="flex flex-col gap-2 text-left max-w-xl">
                    <span className="text-mono-xs text-[var(--color-accent)]">
                      {VIDEO_META}
                    </span>
                    <span className="text-display text-[clamp(1.25rem,2.6vw,2rem)] text-[var(--color-fg)] leading-tight">
                      {VIDEO_TITLE}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-mono-xs text-[var(--color-fg-muted)] self-start sm:self-end">
                    <span className="hidden sm:inline">CLICK TO PLAY</span>
                    <span className="sm:hidden">TAP TO PLAY</span>
                    <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-5 flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-mono-xs text-[var(--color-fg-dim)]">
            Filmed at Polaris School of Technology, Bengaluru
          </p>
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-mono-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
          >
            <span>WATCH ON YOUTUBE</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
