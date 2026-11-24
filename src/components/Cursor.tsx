import { useEffect, useRef } from 'react';

const HOT = 'a,button,.knob,.platter,.mix,input,textarea';

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) { dot.current.style.left = tx + 'px'; dot.current.style.top = ty + 'px'; }
    };
    const over = (e: PointerEvent) => ring.current?.classList.toggle('hot', !!(e.target as Element).closest?.(HOT));
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      if (ring.current) { ring.current.style.left = cx + 'px'; ring.current.style.top = cy + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    loop();
    return () => { removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div id="cur" ref={ring} />
      <div id="cur-dot" ref={dot} />
    </>
  );
}
