"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { gallery, type GalleryPhoto } from "@/lib/content";
import { SectionHeader } from "./ventures";
import { cn } from "@/lib/utils";

const tagLabel: Record<GalleryPhoto["tag"], string> = {
  fellowship: "FELLOWSHIP",
  hackathon: "HACKATHON",
  speaking: "SPEAKING",
  organized: "ORGANIZED",
  competed: "COMPETED",
  field: "FIELD",
  yc: "Y COMBINATOR",
};

const aspectClass: Record<GalleryPhoto["aspect"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

// Round-robin split: items go to col 0, 1, 2, 0, 1, 2, ...
function splitColumns(photos: GalleryPhoto[], n: number): GalleryPhoto[][] {
  const cols: GalleryPhoto[][] = Array.from({ length: n }, () => []);
  photos.forEach((p, i) => cols[i % n].push(p));
  return cols;
}

// Default to 3 (desktop) so SSR renders the desktop layout. Mobile clients
// flip to 2 on mount — brief reflow but no hydration mismatch since the
// outer markup is identical.
function useColumnCount(): number {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCount(mq.matches ? 2 : 3);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return count;
}

// Per-column animation timing. Even-indexed columns scroll up, odd ones
// scroll down — gives the parallax sway regardless of column count.
const COLUMN_DURATIONS = [14, 17, 11];

export function Gallery() {
  const count = useColumnCount();
  const cols = useMemo(() => splitColumns(gallery, count), [count]);

  return (
    <section
      id="gallery"
      className="relative w-full py-24 sm:py-48 border-t border-[var(--color-border)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-10">
        <SectionHeader
          number="06"
          label="OUT IN THE WILD"
          headline="Receipts from the road."
        />
        <p className="mt-6 max-w-xl text-[var(--color-fg-muted)] text-base leading-relaxed">
          Fellowships, pitch nights, hackathons, team rooms.
        </p>
      </div>

      <div className="mt-10 sm:mt-16 mx-auto max-w-[1500px] px-4 sm:px-10">
        <div
          className={cn(
            "grid gap-3 sm:gap-5 h-[560px] sm:h-[820px]",
            count === 2 ? "grid-cols-2" : "grid-cols-3"
          )}
        >
          {cols.map((photos, i) => (
            <ScrollColumn
              key={`${count}-${i}`}
              photos={photos}
              direction={i % 2 === 0 ? "up" : "down"}
              duration={COLUMN_DURATIONS[i] ?? 15}
              offset={count === 3 && i === 1}
              columnCount={count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollColumn({
  photos,
  direction,
  duration,
  offset = false,
  columnCount,
}: {
  photos: GalleryPhoto[];
  direction: "up" | "down";
  duration: number;
  offset?: boolean;
  columnCount: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const items = [...photos, ...photos];
  const target = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={offset ? { transform: "translateY(-6%)" } : undefined}
    >
      <motion.div
        className="flex flex-col gap-3 sm:gap-5 will-change-transform"
        animate={inView ? { y: target } : undefined}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {items.map((photo, i) => (
          <ColumnCard
            key={`${photo.id}-${i}`}
            photo={photo}
            columnCount={columnCount}
          />
        ))}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10"
      />
    </div>
  );
}

function ColumnCard({
  photo,
  columnCount,
}: {
  photo: GalleryPhoto;
  columnCount: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full block rounded-lg overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)]",
        aspectClass[photo.aspect]
      )}
    >
      <div className="absolute inset-0">
        {!failed && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              columnCount === 2
                ? "(min-width: 640px) 30vw, 48vw"
                : "(min-width: 1024px) 460px, (min-width: 640px) 30vw, 33vw"
            }
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            unoptimized
          />
        )}
        {(failed || !loaded) && (
          <Placeholder photo={photo} loaded={loaded} failed={failed} />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-[var(--color-bg)]/15 to-transparent"
        />
      </div>

      <div className="relative h-full flex flex-col justify-end p-3 sm:p-4">
        <div className="hidden sm:flex items-center justify-between text-mono-xs">
          <span className="text-[var(--color-accent)]">{tagLabel[photo.tag]}</span>
          <span className="text-[var(--color-fg-muted)] tabular-nums">{photo.date}</span>
        </div>
        <span className="sm:hidden text-[9px] tracking-[0.16em] uppercase text-[var(--color-accent)] font-mono">
          {tagLabel[photo.tag]}
        </span>
        <h3 className="mt-1 sm:mt-1.5 text-display-italic text-[clamp(0.85rem,1.2vw,1.1rem)] text-[var(--color-fg)] leading-tight line-clamp-2">
          {photo.event}
        </h3>
      </div>
    </div>
  );
}

function Placeholder({
  photo,
  loaded,
  failed,
}: {
  photo: GalleryPhoto;
  loaded: boolean;
  failed: boolean;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-soft)]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 20%, var(--color-accent) 0%, transparent 30%),
          radial-gradient(circle at 70% 80%, var(--color-accent) 0%, transparent 25%)
        `,
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex flex-col items-center gap-2 opacity-30">
        <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--color-fg)]" strokeWidth={1.2} />
        <span className="text-[10px] tracking-[0.18em] text-[var(--color-fg)]">
          {failed ? "PLACEHOLDER" : loaded ? "" : "—"}
        </span>
      </div>
      <div className="sr-only">{photo.alt}</div>
    </div>
  );
}
