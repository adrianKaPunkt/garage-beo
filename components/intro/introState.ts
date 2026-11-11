/**
 * Gemeinsamer Zustand des Intros (Rolltor + Logo-Animation).
 *
 * Ob das Intro läuft, entscheidet ein kleines Skript im <head>
 * (INTRO_GATE_SCRIPT) noch vor dem ersten Zeichnen der Seite: Es setzt
 * `data-intro="play"` auf <html>. Ohne JavaScript, beim zweiten Besuch
 * in derselben Sitzung (wenn PLAY_ON_EVERY_VISIT aus ist), bei
 * „Bewegung reduzieren“ oder bei einem Link
 * auf einen Abschnitt (#kontakt …) bleibt das Attribut weg und die
 * Seite erscheint sofort.
 */

export const INTRO_EVENT = "garage:intro-done";
export const INTRO_STORAGE_KEY = "garage-intro-seen";

/**
 * true: Intro bei jedem Aufruf (auch beim Neuladen) – vorerst zum Ansehen.
 * false: nur einmal pro Sitzung (Browser-Tab).
 */
const PLAY_ON_EVERY_VISIT = true;

/**
 * Läuft vor dem ersten Zeichnen. `?intro` in der Adresse erzwingt das
 * Intro (zum Testen), auch wenn es in dieser Sitzung schon lief.
 */
export const INTRO_GATE_SCRIPT = `(function(){try{
var d=document.documentElement,s=location.search,force=/[?&]intro\\b/.test(s);
if(!force){
${PLAY_ON_EVERY_VISIT ? "" : `if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;`}
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(location.hash.length>1)return;
}
d.setAttribute("data-intro","play");
}catch(e){}})();`;

export function isIntroPlaying() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.intro === "play"
  );
}

/**
 * Ruft `callback` auf, sobald das Intro fertig ist – oder sofort, wenn
 * keins läuft. Gibt eine Aufräumfunktion zurück.
 */
export function onIntroDone(callback: () => void): () => void {
  if (!isIntroPlaying()) {
    callback();
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}
