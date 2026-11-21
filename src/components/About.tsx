import { useEffect, useRef } from 'react';
import { about, links, stats } from '../data/content';

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const n = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = n.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (now: number) => {
        const p = Math.min(1, (now - t0) / 1600);
        el.textContent = Math.round(value * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return <div className="stat"><div className="n" ref={n}>0</div><span>{label}</span></div>;
}

export default function About() {
  return (
    <section id="about">
      <div className="about">
        <div className="reveal">
          <div className="sec-head"><span className="num">04</span><h2>About</h2></div>
          {about.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: html }} />)}
          <a className="btn" href={links.cv || '#'} {...(links.cv ? { target: '_blank', rel: 'noopener' } : {})}>↓ Download CV</a>
        </div>
        <div className="stats reveal">{stats.map((s) => <Stat key={s.label} {...s} />)}</div>
      </div>
    </section>
  );
}
