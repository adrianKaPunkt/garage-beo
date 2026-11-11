"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";
import GarageBeogradLogo from "@/components/GarageBeogradLogo";
import AnimatedCar from "@/components/AnimatedCar/AnimatedCar";
import { INTRO_EVENT, INTRO_STORAGE_KEY } from "./introState";

gsap.registerPlugin(useGSAP, SplitText);

// Farben auf dem dunklen Hintergrund, wie der Header auf dunklen Sektionen
const DOOR_COLORS = {
  primary: "var(--color-lime-300, #bbf451)",
  accent: "var(--color-orange)",
};

const GAR_LETTERS = ["gar-a1", "gar-r", "gar-a2", "gar-g2", "gar-e"];
const BEO_LETTERS = ["beo-e", "beo-o", "beo-g", "beo-r", "beo-a", "beo-d"];

/**
 * Intro (etwa 4,5 s):
 * 1. Dunkler Hintergrund mit Verläufen, das Logo baut sich Buchstabe für
 *    Buchstabe auf.
 * 2. Das Maskottchen-Auto fährt von rechts ein und parkt unter dem Logo,
 *    die Buchstaben wackeln dabei im Fahrtwind.
 * 3. „Tehnički pregled i registracija“ erscheint.
 * 4. Der Untertitel verschwindet, das Logo fliegt in den Header, der
 *    Hintergrund fährt wie ein Garagentor nach oben und das Auto rollt an
 *    seinen Platz im Hero-Bereich.
 *
 * Sichtbar nur, wenn das Skript im <head> `data-intro="play"` gesetzt hat
 * (siehe introState.ts und die Regeln in globals.css). Klick, Taste oder
 * Scrollen springt direkt zu Schritt 4.
 */
export default function IntroOverlay() {
  const tActions = useTranslations("common.actions");
  const tCommon = useTranslations("common");
  const rootRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState(DOOR_COLORS);

  useGSAP(
    () => {
      const root = rootRef.current;
      const html = document.documentElement;
      if (!root || html.dataset.intro !== "play") return;

      // Die CSS-Notbremse (blendet das Intro aus, falls JS hängt) abschalten
      root.style.animation = "none";

      const q = <T extends Element>(selector: string) =>
        root.querySelector<T>(selector);
      const door = q<HTMLElement>("[data-intro-door]");
      const logo = q<HTMLElement>("[data-intro-logo]");
      const svg = logo?.querySelector("svg");
      const car = q<HTMLElement>("[data-intro-car]");
      const subtitle = q<HTMLElement>("[data-intro-subtitle]");
      const subtitleText = q<HTMLElement>("[data-intro-subtitle-text]");
      const skip = q<HTMLElement>("[data-intro-skip]");
      if (!door || !logo || !svg || !car || !subtitle || !subtitleText || !skip) return;

      const part = (name: string) =>
        svg.querySelector<SVGElement>(`[data-part="${name}"]`)!;
      const bigG = part("gar-g1");
      const bigB = part("beo-b");
      const gar = GAR_LETTERS.map(part);
      const beo = BEO_LETTERS.map(part);
      const allLetters = [bigB, ...beo, bigG, ...gar];
      const speedLines = root.querySelectorAll("[data-intro-speed]");
      const subtitleLines = root.querySelectorAll("[data-intro-subtitle-line]");
      const subtitleChars = SplitText.create(subtitleText, { type: "chars", aria: "none" })
        .chars;
      // Der Text ist per CSS ausgeblendet, bis er in Buchstaben zerlegt ist
      gsap.set(subtitleChars, { opacity: 0 });
      gsap.set(subtitleText, { opacity: 1 });

      // Ziele außerhalb des Intros: Logo im Header, Auto im Hero-Bereich
      const headerLogo = () =>
        document.querySelector<SVGElement>("[data-intro-target] svg");
      const heroCar = () =>
        document.querySelector<HTMLElement>("[data-intro-car-target]");

      gsap.set(allLetters, { transformOrigin: "50% 100%" });
      gsap.set(car, { transformOrigin: "50% 100%" });

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {
          // Privater Modus: dann läuft das Intro beim nächsten Mal eben wieder
        }
        removeListeners();
        html.dataset.intro = "done";
        window.dispatchEvent(new Event(INTRO_EVENT));
      };

      const tl = gsap.timeline({ onComplete: finish });

      // 0. Lichter blenden weich auf und wandern langsam
      const glow = (name: string) => q<HTMLElement>(`[data-intro-glow="${name}"]`);
      tl.fromTo(
        root.querySelectorAll("[data-intro-glow]"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.12, ease: "power2.out" },
        0,
      );
      tl.to(glow("teal"), { x: "6vw", y: "5vh", duration: 4, ease: "sine.inOut" }, 0);
      tl.to(glow("orange"), { x: "-6vw", y: "-4vh", duration: 4, ease: "sine.inOut" }, 0);

      // 1. Die großen Anfangsbuchstaben springen herein, wie ein Stempel
      tl.fromTo(
        bigG,
        { opacity: 0, scale: 0.2, rotation: -24, y: -12 },
        { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 0.5, ease: "back.out(2.4)" },
        0.2,
      );
      tl.fromTo(
        bigB,
        { opacity: 0, scale: 0.2, rotation: 22, y: 12 },
        { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 0.5, ease: "back.out(2.4)" },
        0.34,
      );

      // ARAGE und EOGRAD folgen Buchstabe für Buchstabe, schräg mit Schwung
      tl.fromTo(
        gar,
        { opacity: 0, x: 14, y: -16, skewX: -18 },
        { opacity: 1, x: 0, y: 0, skewX: 0, duration: 0.36, stagger: 0.05, ease: "back.out(2)" },
        0.55,
      );
      tl.fromTo(
        beo,
        { opacity: 0, x: 14, y: 16, skewX: -18 },
        { opacity: 1, x: 0, y: 0, skewX: 0, duration: 0.36, stagger: 0.05, ease: "back.out(2)" },
        0.66,
      );
      tl.fromTo(skip, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.6);

      // 2. Das Auto fährt von rechts ein und parkt unter dem Logo
      tl.addLabel("car", 1.1);
      tl.fromTo(car, { x: "70vw" }, { x: 0, duration: 0.9, ease: "power3.out" }, "car");
      tl.fromTo(
        speedLines,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.2, stagger: 0.04, ease: "power2.out" },
        "car",
      );
      tl.to(speedLines, { scaleX: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, "car+=0.5");

      // Fahrtwind: die Buchstaben neigen sich von rechts nach links
      tl.to(
        allLetters,
        {
          skewX: 9,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          stagger: { each: 0.02, from: "end" },
        },
        "car+=0.15",
      );

      // Bremsen: Das Auto nickt nach vorn und federt zurück
      tl.to(
        car,
        {
          keyframes: [
            { rotation: -6, duration: 0.14, ease: "power2.out" },
            { rotation: 2.5, duration: 0.16, ease: "sine.inOut" },
            { rotation: 0, duration: 0.25, ease: "sine.out" },
          ],
        },
        "car+=0.78",
      );

      // 3. Untertitel: Linien wachsen, dann die Buchstaben
      tl.addLabel("subtitle", "car+=0.95");
      tl.fromTo(
        subtitleLines,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power3.out" },
        "subtitle",
      );
      tl.fromTo(
        subtitleChars,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.022, ease: "power2.out" },
        "subtitle+=0.1",
      );

      // Kurz stehen lassen, damit man alles lesen kann
      tl.addLabel("open", "subtitle+=1.9");

      // 4. Untertitel weg, Logo in den Header, Tor auf, Auto in den Hero
      tl.to(
        subtitleChars,
        { opacity: 0, y: -8, duration: 0.3, stagger: 0.008, ease: "power2.in" },
        "open",
      );
      tl.to(subtitleLines, { scaleX: 0, duration: 0.3, ease: "power2.in" }, "open");
      tl.to(skip, { opacity: 0, duration: 0.2 }, "open");
      tl.call(
        () => {
          // Farben des Header-Logos übernehmen (je nach Sektion grün oder lime)
          const target = headerLogo();
          const read = (name: string) => {
            const element = target?.querySelector(`[data-part="${name}"]`);
            return element ? getComputedStyle(element).fill : "";
          };
          setColors({
            primary: read("gar") || "var(--color-green)",
            accent: read("beo") || DOOR_COLORS.accent,
          });
        },
        undefined,
        "open+=0.1",
      );
      tl.to(door, { yPercent: -100, duration: 1, ease: "power2.inOut" }, "open+=0.25");

      // Flugbahnen erst beim Start messen (Fenstergröße kann sich ändern)
      const pathTo = (element: Element, target: Element | null | undefined) => {
        const from = element.getBoundingClientRect();
        const to = target?.getBoundingClientRect();
        if (!to || from.width === 0 || to.width === 0) return null;
        return {
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: to.width / from.width,
        };
      };

      let logoPath: ReturnType<typeof pathTo> | undefined;
      const logoFlight = () =>
        (logoPath ??= pathTo(logo, headerLogo())) ?? { x: 0, y: -window.innerHeight, scale: 0.3 };
      tl.to(
        logo,
        {
          x: () => logoFlight().x,
          y: () => logoFlight().y,
          scale: () => logoFlight().scale,
          duration: 0.95,
          ease: "power3.inOut",
        },
        "open+=0.1",
      );

      // Das Auto rollt an seinen Platz im Hero (dort wartet das gleiche Auto);
      // gibt es keinen, fährt es links hinaus
      const carBody = car.querySelector<HTMLElement>("[data-intro-car-body]") ?? car;
      let carPath: ReturnType<typeof pathTo> | undefined;
      const carFlight = () =>
        (carPath ??= pathTo(carBody, heroCar())) ?? {
          x: -window.innerWidth,
          y: 0,
          scale: 1,
        };
      // Für den Flug um die Mitte skalieren (die Flugbahn ist Mitte zu Mitte)
      tl.set(car, { transformOrigin: "50% 50%" }, "open+=0.24");
      tl.to(
        car,
        {
          x: () => carFlight().x,
          y: () => carFlight().y,
          scale: () => carFlight().scale,
          duration: 1.05,
          ease: "power2.inOut",
        },
        "open+=0.25",
      );

      // Überspringen: direkt zu Schritt 4, etwas schneller
      const skipIntro = (event?: Event) => {
        if (event?.cancelable && event.type !== "pointerdown") event.preventDefault();
        if (finished || tl.time() >= tl.labels.open) return;
        tl.seek("open").timeScale(1.4);
      };
      const onKey = (event: KeyboardEvent) => {
        if (["Tab", "Shift", "Alt", "Control", "Meta"].includes(event.key)) return;
        skipIntro(event);
      };

      // Scrollen während des Intros überspringt es, statt die Seite zu bewegen
      window.addEventListener("wheel", skipIntro, { passive: false });
      window.addEventListener("touchmove", skipIntro, { passive: false });
      window.addEventListener("keydown", onKey);
      root.addEventListener("pointerdown", skipIntro);

      function removeListeners() {
        window.removeEventListener("wheel", skipIntro);
        window.removeEventListener("touchmove", skipIntro);
        window.removeEventListener("keydown", onKey);
        root?.removeEventListener("pointerdown", skipIntro);
      }

      return () => {
        removeListeners();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="intro-overlay fixed inset-0 z-[70]">
      {/* Dunkler Hintergrund, der sich wie ein Garagentor nach oben öffnet */}
      <div
        data-intro-door
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{
          // Tiefes Grün-Anthrazit statt Schwarz, unten rechts leicht warm
          backgroundImage:
            "linear-gradient(160deg, #0c1a15 0%, #12302a 42%, #0e2320 68%, #1b1812 100%)",
          // Schatten unter der Torkante, wenn sie über die Seite fährt
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55)",
        }}
      >
        {/* Weiche Lichter, die sich während des Intros leicht bewegen */}
        <div
          data-intro-glow="teal"
          className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(40,130,100,0.45), transparent 65%)" }}
        />
        <div
          data-intro-glow="lime"
          className="absolute left-1/2 top-[42%] h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(187,244,81,0.16), transparent 62%)" }}
        />
        <div
          data-intro-glow="orange"
          className="absolute -bottom-[25%] -right-[15%] h-[60vmax] w-[60vmax] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(230,109,40,0.22), transparent 62%)" }}
        />

        {/* Diagonaler Glanz, wie Licht auf lackiertem Metall */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 45%, transparent 60%)",
          }}
        />

        {/* Feines Korn gegen Farbstufen im Verlauf */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Vignette an den Rändern */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Untere Kante: schmale Lichtlinie, die beim Öffnen nach oben fährt */}
        <div
          className="absolute inset-x-0 bottom-0 h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(230,109,40,0.9) 20%, rgba(187,244,81,0.9) 50%, rgba(230,109,40,0.9) 80%, transparent)",
          }}
        />
      </div>

      {/* Logo, Untertitel und Parkplatz für das Auto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[clamp(12px,2.5vh,28px)] overflow-hidden px-5"
      >
        <div data-intro-logo className="relative z-10 will-change-transform">
          <GarageBeogradLogo
            title=""
            className="h-auto w-[min(72vw,560px)]"
            primaryColor={colors.primary}
            accentColor={colors.accent}
          />
        </div>

        <div data-intro-subtitle className="flex w-full max-w-[640px] items-center justify-center gap-3 sm:gap-5">
          <span data-intro-subtitle-line className="h-px flex-1 origin-right bg-gradient-to-l from-orange to-transparent" />
          <p
            data-intro-subtitle-text
            className="m-0 shrink-0 text-center text-[clamp(11px,2.6vw,18px)] font-semibold uppercase tracking-[0.22em] text-white/90"
          >
            {tCommon("introSubtitle")}
          </p>
          <span data-intro-subtitle-line className="h-px flex-1 origin-left bg-gradient-to-r from-orange to-transparent" />
        </div>

        <div className="relative h-[clamp(120px,22vh,220px)] w-full">
          <div
            data-intro-car
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 will-change-transform"
            style={{ aspectRatio: "1 / 1", transform: "translateX(70vw)" }}
          >
            {/* Speed-Linien hinter dem Auto (es fährt nach links) */}
            <span data-intro-speed className="absolute left-[78%] top-[38%] h-[3px] w-[45%] origin-left rounded-full bg-white/70" />
            <span data-intro-speed className="absolute left-[85%] top-[55%] h-[3px] w-[60%] origin-left rounded-full bg-orange" />
            <span data-intro-speed className="absolute left-[80%] top-[72%] h-[3px] w-[38%] origin-left rounded-full bg-white/50" />
            {/* Gleiches Auto wie im Hero, damit der Übergang nahtlos ist */}
            <div data-intro-car-body className="h-full w-full">
              <AnimatedCar animated sizes="220px" />
            </div>
          </div>
        </div>
      </div>

      {/* Überspringen */}
      <button
        type="button"
        data-intro-skip
        className="absolute bottom-12 right-5 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white opacity-0 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
      >
        {tActions("skipIntro")}
      </button>
    </div>
  );
}
