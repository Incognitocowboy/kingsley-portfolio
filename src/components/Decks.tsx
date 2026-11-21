import { useEffect, useRef } from 'react';
import {
  anaL, anaR, cue, getParams, getState, pads, scratch, setBoth, setBpm, setEcho, setFilter, setVolume, setXfade, toggleDeck,
  type Deck as DeckId,
} from '../audio/engine';
import { profile } from '../data/content';
import { useEngine } from '../useEngine';
import Knob from './Knob';

function Deck({ id, color, sub }: { id: DeckId; color: string; sub: string }) {
  const playing = useEngine()[id];
  const platter = useRef<HTMLDivElement>(null);
  const drag = useRef<{ a: number } | null>(null);
  const rot = useRef(0);

  useEffect(() => {
    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      const s = getState();
      if (s[id] && !drag.current) rot.current += dt * 200 * (s.bpm / 124);
      if (platter.current) platter.current.style.transform = `rotate(${rot.current}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [id]);

  const angle = (e: React.PointerEvent) => {
    const r = platter.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180) / Math.PI;
  };
  const onDown = (e: React.PointerEvent) => { platter.current!.setPointerCapture(e.pointerId); drag.current = { a: angle(e) }; };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const a = angle(e); let da = a - drag.current.a;
    if (da > 180) da -= 360; if (da < -180) da += 360;
    rot.current += da; drag.current.a = a;
    if (Math.abs(da) > 2) scratch(id, da);
  };
  const onUp = () => { drag.current = null; };

  return (
    <div className={`deck${playing ? ' playing' : ''}`} style={{ '--deck-c': color } as React.CSSProperties}>
      <div className="deck-label"><span>DECK <b>{id}</b></span><span>{sub}</span></div>
      <div className="platter-wrap">
        <div className="platter" ref={platter} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <div className="label">{profile.name}<br />{id}</div>
        </div>
        <div className="tonearm" />
      </div>
      <div className="deck-controls">
        <button className="btn play" aria-label={`Play deck ${id}`} onClick={() => toggleDeck(id)}>{playing ? '❚❚' : '▶'}</button>
        <button className="btn" onClick={() => cue(id)}>CUE</button>
      </div>
    </div>
  );
}

function Meters() {
  const L = useRef<HTMLDivElement>(null), R = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const buf = new Float32Array(512);
    const level = (a: AnalyserNode | null) => { if (!a) return 0; a.getFloatTimeDomainData(buf); let m = 0; for (const v of buf) m = Math.max(m, Math.abs(v)); return m; };
    let raf = 0;
    const frame = () => {
      const l = level(anaL), r = level(anaR);
      L.current?.querySelectorAll('s').forEach((s, i) => s.classList.toggle('on', l * 16 > i));
      R.current?.querySelectorAll('s').forEach((s, i) => s.classList.toggle('on', r * 16 > i));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  const segs = Array.from({ length: 16 }, (_, i) => <s key={i} className={i >= 14 ? 'warn peak' : i >= 11 ? 'warn' : ''} />);
  return <div className="meters"><div className="meter" ref={L}>{segs}</div><div className="meter" ref={R}>{segs}</div></div>;
}

function Pads() {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hit = (k: string) => {
    pads.find((p) => p.key === k)?.play();
    const b = refs.current[k]; if (!b) return;
    b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 120);
  };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.target as Element).matches('input,textarea')) return;
      if (e.code === 'Space') { e.preventDefault(); const s = getState(); setBoth(!(s.A || s.B)); return; }
      const k = e.key.toUpperCase();
      if (!e.repeat && pads.some((p) => p.key === k)) hit(k);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);
  return (
    <div className="pads-wrap reveal">
      {pads.map((p) => (
        <button key={p.key} ref={(el) => { refs.current[p.key] = el; }} className="pad"
          style={{ '--pc': p.color } as React.CSSProperties} onPointerDown={() => hit(p.key)}>
          <kbd>{p.key}</kbd><span>{p.name}</span>
        </button>
      ))}
    </div>
  );
}

export default function Decks() {
  const { bpm } = useEngine();
  const p = getParams();
  return (
    <section id="decks">
      <div className="sec-head reveal"><span className="num">01</span><h2>Take the decks</h2>
        <p>A tiny synth engine I built with the Web Audio API: no samples, no libraries. Hit play on both decks, ride the crossfader, twist the filter. Drag a platter to scratch.</p></div>

      <div className="console reveal">
        <Deck id="A" color="var(--pink)" sub="DRUMS · 4/4" />
        <div className="mixer">
          <div className="bpm-display"><span>{bpm}</span><small>BPM</small></div>
          <div className="knobs">
            <Knob label="FILTER" color="var(--cyan)" initial={p.filter} onChange={setFilter} />
            <Knob label="ECHO" color="var(--pink)" initial={p.echo} onChange={setEcho} />
            <Knob label="MASTER" color="var(--lime)" initial={p.volume} onChange={setVolume} />
          </div>
          <Meters />
          <div className="pitch">TEMPO <input type="range" min={100} max={150} value={bpm} aria-label="Tempo" onChange={(e) => setBpm(+e.target.value)} /></div>
          <div className="xfade">
            <input type="range" min={0} max={100} defaultValue={p.xfade * 100} aria-label="Crossfader" onChange={(e) => setXfade(+e.target.value / 100)} />
            <div className="ends"><span>A</span><span>CROSSFADER</span><span>B</span></div>
          </div>
        </div>
        <Deck id="B" color="var(--cyan)" sub="BASS · ARP" />
      </div>

      <Pads />
      <p className="hint">Keyboard: <b>Q W E R / A S D F</b> trigger pads · <b>Space</b> toggles both decks</p>
    </section>
  );
}
