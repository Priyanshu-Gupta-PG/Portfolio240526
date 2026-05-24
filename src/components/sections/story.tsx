"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { links } from "@/lib/content";

const VIDEO_ID = "HwwCLEwwuic";
const VIDEO_TITLE =
  "17-year-old Founder Who Built, Sold & Funded His Own Education";
const THUMB_HQ = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const THUMB_FALLBACK = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(THUMB_HQ);

  return (
    <section
      id="story"
      ref={ref}
      className="relative w-full px-4 sm:px-10 py-24 sm:py-44 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">
          {/* LEFT — text */}
          <div className="md:col-span-5 lg:col-span-5 md:pt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-3"
            >
              <span className="text-mono-xs text-[var(--color-accent)]">01</span>
              <span className="text-mono-xs text-[var(--color-fg-muted)]">
                FEATURED
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-6 text-display text-[clamp(2.25rem,4.8vw,4rem)] text-[var(--color-fg)] leading-[1.02]"
            >
              Featured on{" "}
              <span className="text-display-italic text-[var(--color-accent)]">
                Polaris.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-6 text-[var(--color-fg-muted)] text-base sm:text-lg leading-relaxed max-w-md"
            >
              Sat down with{" "}
              <span className="text-[var(--color-fg)]">Campus CEOs</span>,
              Polaris School of Technology&apos;s founder series, for episode
              four — the long version of how I built and sold two companies
              before college.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-10 flex flex-col gap-3"
            >
              <div className="hairline w-32" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm max-w-xs">
                <div>
                  <dt className="text-mono-xs text-[var(--color-fg-dim)]">
                    SHOW
                  </dt>
                  <dd className="mt-1 text-[var(--color-fg)]">Campus CEOs</dd>
                </div>
                <div>
                  <dt className="text-mono-xs text-[var(--color-fg-dim)]">
                    EPISODE
                  </dt>
                  <dd className="mt-1 text-[var(--color-fg)] tabular-nums">04</dd>
                </div>
                <div>
                  <dt className="text-mono-xs text-[var(--color-fg-dim)]">
                    NETWORK
                  </dt>
                  <dd className="mt-1 text-[var(--color-fg)]">
                    Polaris School of Technology
                  </dd>
                </div>
                <div>
                  <dt className="text-mono-xs text-[var(--color-fg-dim)]">
                    RUNTIME
                  </dt>
                  <dd className="mt-1 text-[var(--color-fg)] tabular-nums">~12 min</dd>
                </div>
              </dl>

              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-mono-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors w-fit"
              >
                <span>WATCH ON YOUTUBE</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — video card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="md:col-span-7 lg:col-span-6 lg:col-start-7"
          >
            <div className="relative rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] shadow-2xl shadow-black/40">
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
                      sizes="(min-width: 1280px) 720px, (min-width: 768px) 56vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/btn:scale-[1.03]"
                      onError={() => {
                        if (thumbSrc !== THUMB_FALLBACK) setThumbSrc(THUMB_FALLBACK);
                      }}
                      unoptimized
                    />

                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent"
                    />

                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="relative flex items-center justify-center">
                        <span className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[var(--color-accent)]/25 blur-xl scale-100 group-hover/btn:scale-125 transition-transform duration-700" />
                        <span className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] shadow-lg shadow-[var(--color-accent)]/40 transition-transform duration-500 group-hover/btn:scale-110">
                          <Play
                            className="h-5 w-5 sm:h-6 sm:w-6 fill-[var(--color-bg)] translate-x-[1px]"
                            strokeWidth={0}
                          />
                        </span>
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* caption below card */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-mono-xs text-[var(--color-fg-dim)] truncate">
                {VIDEO_TITLE}
              </p>
              <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums shrink-0">
                EP · 04
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
