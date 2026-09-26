import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el);
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToY(y: number) {
  if (instance) {
    instance.scrollTo(y);
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}