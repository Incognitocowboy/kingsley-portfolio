type VT = { ready: Promise<void> };
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => VT };

/**
 * Switch between dark (off air) and light (on air).
 * Uses the View Transitions API to wipe the new theme in as a circle
 * growing out of the ON AIR pill; falls back to an instant swap.
 */
export function setTheme(light: boolean) {
  const root = document.documentElement;
  const want = light ? 'light' : 'dark';
  if (root.dataset.theme === want) return;

  const swap = () => { root.dataset.theme = want; };
  const doc = document as DocWithVT;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce) { swap(); return; }

  const r = document.querySelector('.live-pill')?.getBoundingClientRect();
  const x = r ? r.left + r.width / 2 : innerWidth / 2;
  const y = r ? r.top + r.height / 2 : 0;
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const t = doc.startViewTransition(swap);
  t.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 1000, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
}
