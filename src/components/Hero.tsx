import { useEffect, useRef } from 'react';
import { analyser, getState, setBoth } from '../audio/engine';
import { links, profile } from '../data/content';
import { useEngine } from '../useEngine';

function Visualizer() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, g = cv.getContext('2d')!;
    const freq = new Uint8Array(128);
    let W = 0, H = 0, raf = 0;
    const resize = () => { W = cv.width = cv.offsetWidth * devicePixelRatio; H = cv.height = cv.offsetHeight * devicePixelRatio; };
    resize(); addEventListener('resize', resize);
    const frame = (now: number) => {
      const s = getState(), live = !!analyser && (s.A || s.B);
      if (live) analyser!.getByteFrequencyData(freq);
      g.clearRect(0, 0, W, H);
      const n = 64, bw = W / n;
      for (let i = 0; i < n; i++) {
        const v = live ? freq[i] / 255 : (Math.sin(now / 700 + i * 0.3) * 0.5 + 0.5) * 0.18 + 0.04;
        const h = v * H * 0.7, x = i * bw;
        const grad = g.createLinearGradient(0, H, 0, H - h);
        grad.addColorStop(0, '#ff2e88'); grad.addColorStop(1, '#21e6ff');
        g.fillStyle = grad; g.fillRect(x + bw * 0.15, H - h, bw * 0.7, h);
        g.globalAlpha = 0.25; g.fillRect(x + bw * 0.15, 0, bw * 0.7, h * 0.35); g.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, []);
  return <canvas id="viz" ref={ref} />;
}

export default function Hero() {
  const { A, B, bpm } = useEngine();
  const live = A || B;
  const drop = () => {
    setBoth(!live);
    if (!live) document.getElementById('decks')?.scrollIntoView();
  };
  return (
    <header className="hero" id="hero">
      <Visualizer />
      <div className="hero-inner">
        <div className="kicker">{profile.role}</div>
        <h1 className="glitch" data-text={profile.name}>{profile.name}</h1>
        <p className="tagline">{profile.tagline} <b>{bpm} BPM</b>.</p>
        <div className="hero-cta">
          <button className="btn hotpink" onClick={drop}>{live ? '■ Stop' : '▶ Drop the beat'}</button>
          <a className="btn" href="#mixes">View projects</a>
          {links.github && <a className="btn" href={links.github} target="_blank" rel="noopener">GitHub ↗</a>}
        </div>
      </div>
      <div className="scroll-hint">SCROLL ↓</div>
    </header>
  );
}
