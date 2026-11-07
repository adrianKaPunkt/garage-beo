"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

type VideoPreviewProps = {
  src: string;
  poster: string;
  title?: string;
  className?: string;
};

export default function VideoPreview({
  src,
  poster,
  title,
  className = "",
}: VideoPreviewProps) {
  const t = useTranslations("common.video");
  const label = title ?? t("defaultTitle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleStart = () => {
    const video = videoRef.current;
    setStarted(true);
    video?.focus();
    // play() must run inside the click: iOS Safari blocks autoPlay with sound.
    // If it is rejected anyway, the native controls are already visible.
    video?.play().catch(() => {});
  };

  return (
    <div
      className={`relative mx-auto aspect-9/16 w-full max-w-[calc(70vh*9/16)] overflow-hidden rounded-2xl bg-black shadow-lg ${className}`}
    >
      {/* The poster is only set after the click, otherwise the browser would
          fetch it eagerly and bypass the lazy-loaded image below. */}
      <video
        ref={videoRef}
        src={src}
        poster={started ? poster : undefined}
        preload="none"
        controls={started}
        playsInline
        tabIndex={-1}
        aria-label={label}
        className="block h-full w-full object-cover"
        onError={() => setFailed(true)}
      >
        {t("unsupported")}
      </video>

      {failed && (
        <p
          role="alert"
          className="absolute inset-0 m-0 flex items-center justify-center bg-black/70 p-4 text-center text-sm text-white"
        >
          <span>
            {t("unavailable")}{" "}
            <a className="underline" href={src}>
              {t("openDirectly")}
            </a>
            .
          </span>
        </p>
      )}

      {!started && (
        <button
          type="button"
          aria-label={t("play", { title: label })}
          onClick={handleStart}
          className="
            group absolute inset-0 block cursor-pointer
            focus-visible:outline-4
            focus-visible:-outline-offset-4
            focus-visible:outline-lime-300
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
          />

          <span
            aria-hidden="true"
            className="
              absolute inset-0 flex items-center justify-center
              bg-black/15 transition-colors
              group-hover:bg-black/25
            "
          >
            <span
              className="
                flex h-20 w-20 items-center justify-center
                rounded-full bg-lime-300 text-[#14332a]
                shadow-xl transition-transform
                motion-safe:group-hover:scale-110
              "
            >
              <Play size={32} fill="currentColor" className="ml-1" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
