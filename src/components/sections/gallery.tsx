"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
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

// Distribute items across 3 columns by index modulo 3.
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
          Tap any frame to open.
        </p>
      </div>

      <div className="mt-12 sm:mt-16 mx-auto max-w-[1500px] px-6 sm:px-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-5 h-[640px] sm:h-[820px]">
          <ScrollColumn
            photos={col1}
            direction="up"
            duration={42}
            onOpen={(p) => setOpenIndex(gallery.findIndex((g) => g.id === p.id))}
          />
          <ScrollColumn
            photos={col2}
            direction="down"
            duration={52}
            onOpen={(p) => setOpenIndex(gallery.findIndex((g) => g.id === p.id))}
            offset
          />
          <ScrollColumn
            photos={col3}
            direction="up"
            duration={36}
            onOpen={(p) => setOpenIndex(gallery.findIndex((g) => g.id === p.id))}
          />
        </div>
      </div>

      <Lightbox
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((v) =>
            v === null ? null : (v - 1 + gallery.length) % gallery.length
          )
        }
        onNext={() =>
          setOpenIndex((v) => (v === null ? null : (v + 1) % gallery.length))
        }
      />
    </section>
  );
}

function ScrollColumn({
  photos,
  direction,
  duration,
  onOpen,
  offset = false,
}: {
  photos: GalleryPhoto[];
  direction: "up" | "down";
  duration: number;
  onOpen: (photo: GalleryPhoto) => void;
  offset?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  // Render the set twice. Animating between 0% and -50% lands on identical
  // content, so the loop point is invisible.
  const items = [...photos, ...photos];
  const target = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      // Negative top margin on the middle column offsets it so the three
      // columns don't line up in a grid.
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
            onClick={() => onOpen(photo)}
          />
        ))}
      </motion.div>

      {/* edge fades so the loop seams stay invisible */}
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

function ColumnCard({
  photo,
  onClick,
}: {
  photo: GalleryPhoto;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full block rounded-lg overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)] group/card cursor-pointer",
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
              "object-cover transition-all duration-700 ease-out group-hover/card:scale-[1.05]",
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
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-[var(--color-bg)]/15 to-transparent opacity-90 group-hover/card:opacity-60 transition-opacity duration-500"
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

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)] origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </button>
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

function Lightbox({
  openIndex,
  onClose,
  onPrev,
  onNext,
}: {
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = openIndex !== null;
  const photo = open ? gallery[openIndex] : null;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFailed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--color-bg)]/95 backdrop-blur-md p-4 sm:p-12"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex flex-col gap-5"
          >
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)]">
              {!failed ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  className="object-cover"
                  onError={() => setFailed(true)}
                  unoptimized
                />
              ) : (
                <Placeholder photo={photo} loaded={false} failed />
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-mono-xs text-[var(--color-accent)]">
                    {tagLabel[photo.tag]}
                  </span>
                  <span className="text-mono-xs text-[var(--color-fg-dim)] tabular-nums">
                    {photo.date}
                  </span>
                  {photo.location && (
                    <span className="text-mono-xs text-[var(--color-fg-dim)]">
                      ↳ {photo.location.toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-display-italic text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--color-fg)] leading-tight">
                  {photo.event}
                </h3>
                <p className="mt-1.5 text-[var(--color-fg-muted)] max-w-2xl">
                  {photo.caption}
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-end">
                <button
                  onClick={onPrev}
                  aria-label="Previous photo"
                  className="h-10 w-10 grid place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={onNext}
                  aria-label="Next photo"
                  className="h-10 w-10 grid place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="h-10 w-10 grid place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors ml-1"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
