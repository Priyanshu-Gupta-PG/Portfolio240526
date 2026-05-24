"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  portrait: "aspect-[3/4] w-[260px] sm:w-[300px]",
  landscape: "aspect-[16/10] w-[440px] sm:w-[520px]",
  square: "aspect-square w-[320px] sm:w-[360px]",
};

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-32 sm:py-48 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <SectionHeader
            number="06"
            label="OUT IN THE WILD"
            headline="Receipts from the road."
          />
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-560)}
              aria-label="Scroll left"
              className="h-11 w-11 grid place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg-dim)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollBy(560)}
              aria-label="Scroll right"
              className="h-11 w-11 grid place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg-dim)] transition-colors"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-[var(--color-fg-muted)] text-base leading-relaxed">
          Fellowships, pitch nights, hackathons, team rooms.
          Drag to scroll.
        </p>
      </div>

      <div
        ref={trackRef}
        className="mt-12 sm:mt-16 flex gap-5 sm:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth px-6 sm:px-10 pb-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{ scrollbarColor: "var(--color-border-strong) transparent" }}
      >
        <div aria-hidden className="shrink-0 w-0 sm:w-[calc((100vw-1500px)/2)] max-w-0 sm:max-w-none" />
        {gallery.map((photo, i) => (
          <GalleryCard
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
        <div aria-hidden className="shrink-0 w-6 sm:w-10" />
      </div>

      <Lightbox
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((v) => (v === null ? null : (v - 1 + gallery.length) % gallery.length))
        }
        onNext={() =>
          setOpenIndex((v) => (v === null ? null : (v + 1) % gallery.length))
        }
      />
    </section>
  );
}

function GalleryCard({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 }}
      className={cn(
        "group relative shrink-0 snap-start text-left rounded-xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-bg-soft)]",
        aspectClass[photo.aspect]
      )}
    >
      {/* image / fallback */}
      <div className="absolute inset-0">
        {!failed && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 520px, 80vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]",
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
        {/* gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-[var(--color-bg)]/20 to-transparent"
        />
      </div>

      {/* meta */}
      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="text-mono-xs text-[var(--color-accent)]">
            {tagLabel[photo.tag]}
          </span>
          <span className="text-mono-xs text-[var(--color-fg-muted)] tabular-nums">
            {photo.date}
          </span>
        </div>
        <div>
          <h3 className="text-display-italic text-[clamp(1.25rem,1.8vw,1.5rem)] text-[var(--color-fg)] leading-tight">
            {photo.event}
          </h3>
          <p className="mt-1.5 text-sm text-[var(--color-fg-muted)] line-clamp-2">
            {photo.caption}
          </p>
          {photo.location && (
            <p className="mt-2 text-mono-xs text-[var(--color-fg-dim)]">
              ↳ {photo.location.toUpperCase()}
            </p>
          )}
        </div>
      </div>

      {/* hover accent */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.button>
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
      <div className="flex flex-col items-center gap-3 opacity-25">
        <Camera className="h-8 w-8 text-[var(--color-fg)]" strokeWidth={1.2} />
        <span className="text-mono-xs text-[var(--color-fg)]">
          {failed ? "PLACEHOLDER" : loaded ? "" : "LOADING"}
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
