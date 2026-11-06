"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  shape?: "circle" | "rounded" | "square";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  mobileScroll?: boolean;
  lightbox?: boolean;
  className?: string;
};

const sizes = {
  sm: "h-24 w-24 lg:h-28 lg:w-28",
  md: "h-28 w-28 lg:h-36 lg:w-36",
  lg: "h-36 w-36 lg:h-44 lg:w-44",
};

const shapes = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-none",
};

const alignments = {
  left: "lg:justify-start",
  center: "lg:justify-center",
  right: "lg:justify-end",
};

export default function ImageGallery({
  images,
  shape = "circle",
  size = "md",
  align = "center",
  mobileScroll = true,
  lightbox = true,
  className = "",
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = lightbox && activeIndex !== null;

  const close = () => setActiveIndex(null);

  const previous = () => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length,
    );
  };

  const next = () => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % images.length,
    );
  };

  // Lightbox: Tastatur und Scroll-Sperre
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + images.length) % images.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % images.length,
        );
      }

      // Tastaturfokus bleibt in der Lightbox
      if (event.key === "Tab") {
        const controls = [
          closeButtonRef.current,
          ...Array.from(
            document.querySelectorAll<HTMLButtonElement>(
              '[data-gallery-control="true"]',
            ),
          ),
        ].filter((element): element is HTMLButtonElement => Boolean(element));

        if (!controls.length) return;

        const first = controls[0];
        const last = controls[controls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Vorschaubilder */}
      <div
        role="group"
        aria-label="Galerija fotografija"
        className={[
          "flex items-center gap-4 py-5 lg:gap-6",
          mobileScroll
            ? "flex-nowrap justify-start overflow-x-auto overscroll-x-contain snap-x snap-mandatory lg:overflow-visible"
            : "flex-wrap justify-center",
          alignments[align],
          className,
        ].join(" ")}
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            disabled={!lightbox}
            aria-label={`Otvori fotografiju ${index + 1}: ${image.alt}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
            className={[
              "group relative shrink-0 snap-center cursor-pointer",
              "overflow-hidden border-2 border-white/30",
              "transition-all duration-300",
              "hover:-translate-y-1 hover:scale-105",
              "hover:border-lime-400",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-lime-400",
              "disabled:cursor-default",
              shapes[shape],
              sizes[size],
            ].join(" ")}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 176px, 176px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {/* Lightbox: Portal in den body, damit kein Stacking-Kontext (z.B. `isolate`) sie einsperrt */}
      {isOpen && activeIndex !== null && images[activeIndex] && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pregled fotografija"
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/90 p-4
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          {/* Schließen */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Zatvori galeriju"
            className="
              absolute right-4 top-4 z-20
              flex h-11 w-11 items-center justify-center
              rounded-full bg-white/10 text-white
              transition-colors hover:bg-white/20
              focus-visible:outline-2
              focus-visible:outline-white
            "
          >
            <X size={24} />
          </button>

          {/* Vorheriges Bild */}
          {images.length > 1 && (
            <button
              type="button"
              data-gallery-control="true"
              onClick={previous}
              aria-label="Prethodna fotografija"
              className="
                absolute left-2 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center rounded-full
                bg-black/40 text-white
                hover:bg-black/70
                focus-visible:outline-2
                focus-visible:outline-white
                sm:left-6
              "
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Vollständiges Foto */}
          <div
            className="
              relative h-[75vh] w-[90vw]
              max-w-275
            "
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              priority
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Nächstes Bild */}
          {images.length > 1 && (
            <button
              type="button"
              data-gallery-control="true"
              onClick={next}
              aria-label="Sledeća fotografija"
              className="
                absolute right-2 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center rounded-full
                bg-black/40 text-white
                hover:bg-black/70
                focus-visible:outline-2
                focus-visible:outline-white
                sm:right-6
              "
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Bildzähler */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70">
            {activeIndex + 1} / {images.length}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
