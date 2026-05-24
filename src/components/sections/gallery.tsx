"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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
};

const aspectClass: Record<GalleryPhoto["aspect"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

function splitColumns(photos: GalleryPhoto[]): [GalleryPhoto[], GalleryPhoto[], GalleryPhoto[]] {
  const a: GalleryPhoto[] = [];
  const b: GalleryPhoto[] = [];
  const c: GalleryPhoto[] = [];
  photos.forEach((p, i) => {
    if (i % 3 === 0) a.push(p);
    else if (i % 3 === 1) b.push(p);
    else c.push(p);
  });
  return [a, b, c];
}

export function Gallery() {
  const [col1, col2, col3] = useMemo(() => splitColumns(gallery), []);

  return (
    <section
      id="gallery"
      className="relative w-full py-32 sm:py-48 border-t border-[var(--color-border)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <SectionHeader
          number="06"
          label="OUT IN THE WILD"
          headline="Receipts from the road."
        />
        <p className="mt-6 max-w-xl text-[var(--color-fg-muted)] text-base leading-relaxed">
          Fellowships, pitch nights, hackathons, team rooms.
        </p>
      </div>

      <div className="mt-12 sm:mt-16 mx-auto max-w-[1500px] px-6 sm:px-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-5 h-[640px] sm:h-[820px]">
          <ScrollColumn photos={col1} direction="up" duration={14} />
          <ScrollColumn photos={col2} direction="down" duration={17} offset />
          <ScrollColumn photos={col3} direction="up" duration={11} />
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
}: {
  photos: GalleryPhoto[];
  direction: "up" | "down";
  duration: number;
  offset?: boolean;
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
          <ColumnCard key={`${photo.id}-${i}`} photo={photo} />
        ))}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10"
      />
    </div>
  );
}

function ColumnCard({ photo }: { photo: GalleryPhoto }) {
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
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 30vw, 33vw"
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
        <div className="flex items-center justify-between text-mono-xs">
          <span className="text-[var(--color-accent)]">{tagLabel[photo.tag]}</span>
          <span className="text-[var(--color-fg-muted)] tabular-nums">{photo.date}</span>
        </div>
        <h3 className="mt-1.5 text-display-italic text-[clamp(0.95rem,1.2vw,1.1rem)] text-[var(--color-fg)] leading-tight">
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
