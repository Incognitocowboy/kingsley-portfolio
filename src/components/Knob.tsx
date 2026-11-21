import { useEffect, useRef, useState } from 'react';

type Props = { label: string; color: string; initial: number; onChange: (v: number) => void };

/** Drag up/down, scroll, or use arrow keys to turn. Value is 0..1. */
export default function Knob({ label, color, initial, onChange }: Props) {
  const [v, setV] = useState(initial);
  const el = useRef<HTMLDivElement>(null);
  const set = (n: number) => { const c = Math.max(0, Math.min(1, n)); setV(c); onChange(c); };
  const vRef = useRef(v); vRef.current = v;

  // wheel needs a non-passive listener to prevent page scroll
  useEffect(() => {
    const node = el.current!;
    const wheel = (e: WheelEvent) => { e.preventDefault(); set(vRef.current - e.deltaY / 1000); };
    node.addEventListener('wheel', wheel, { passive: false });
    return () => node.removeEventListener('wheel', wheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const down = (e: React.PointerEvent) => {
    const node = el.current!; node.setPointerCapture(e.pointerId);
    const y0 = e.clientY, v0 = v;
    const move = (ev: PointerEvent) => set(v0 + (y0 - ev.clientY) / 150);
    const up = () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerup', up); };
    node.addEventListener('pointermove', move); node.addEventListener('pointerup', up);
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') set(v + 0.05);
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') set(v - 0.05);
  };

  return (
    <div className="knob-box">
      <div
        ref={el} className="knob" role="slider" tabIndex={0} aria-label={label}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v * 100)}
        style={{ '--v': v, '--kc': color } as React.CSSProperties}
        onPointerDown={down} onKeyDown={key}
      ><i /></div>
      {label}
    </div>
  );
}
