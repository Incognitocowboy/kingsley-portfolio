import { projects, type Project } from '../data/content';

function Card({ p, i }: { p: Project; i: number }) {
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateY(${(x - 0.5) * 12}deg) rotateX(${(0.5 - y) * 12}deg) translateZ(0)`;
    el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
  };
  const bars = Array.from({ length: 48 }, (_, j) => (
    <b key={j} style={{ '--i': j, height: `${20 + Math.abs(Math.sin(j * 0.7 + i) * Math.cos(j * 0.23)) * 80}%` } as React.CSSProperties} />
  ));
  const ext = { target: '_blank', rel: 'noopener' };
  return (
    <article
      className="mix reveal"
      style={{ '--mc': p.color, '--cover': p.cover, transitionDelay: `${(i % 3) * 80}ms` } as React.CSSProperties}
      onPointerMove={tilt} onPointerLeave={(e) => { e.currentTarget.style.transform = ''; }}
    >
      <div className="cover">
        {p.url
          ? <a className="play-o" href={p.url} {...ext} title={`Visit ${p.title}`} style={{ textDecoration: 'none' }}>↗</a>
          : <div className="play-o">↗</div>}
      </div>
      <h3>{p.url ? <a href={p.url} {...ext} style={{ color: 'inherit', textDecoration: 'none' }}>{p.title} ↗</a> : p.title}</h3>
      <div className="meta"><span>{p.stack}</span><span>{p.year}</span></div>
      <div className="wave">{bars}</div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="mixes">
      <div className="sec-head reveal"><span className="num">02</span><h2>Projects</h2><p>The tracklist: things I've built and shipped. Hover a card.</p></div>
      <div className="mixes">{projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}</div>
    </section>
  );
}
