// Tiny Web Audio synth: two decks (drums / bass+arp), mixer.
// No samples — every sound is generated.

export type Deck = 'A' | 'B';
export type EngineState = { A: boolean; B: boolean; bpm: number };

let ctx: AudioContext | null = null;
let master!: GainNode, filter!: BiquadFilterNode, delay!: DelayNode, fb!: GainNode, wet!: GainNode;
let busA!: GainNode, busB!: GainNode, noiseBuf!: AudioBuffer;
export let analyser: AnalyserNode | null = null;
export let anaL: AnalyserNode | null = null;
export let anaR: AnalyserNode | null = null;

const params = { filter: 1, echo: 0.2, volume: 0.8, xfade: 0.5 };
let state: EngineState = { A: false, B: false, bpm: 124 };
let step = 0, nextTime = 0, timer: number | null = null;

const listeners = new Set<() => void>();
export const beatListeners = new Set<() => void>();
export const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const getState = () => state;
const setState = (p: Partial<EngineState>) => { state = { ...state, ...p }; listeners.forEach((f) => f()); };
export const getParams = () => params;

function ensure() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.Q.value = 6;
    delay = ctx.createDelay(1); fb = ctx.createGain(); wet = ctx.createGain();
    analyser = ctx.createAnalyser(); analyser.fftSize = 256;
    const split = ctx.createChannelSplitter(2);
    anaL = ctx.createAnalyser(); anaR = ctx.createAnalyser(); anaL.fftSize = anaR.fftSize = 512;
    busA = ctx.createGain(); busB = ctx.createGain();
    busA.connect(filter); busB.connect(filter);
    filter.connect(master); filter.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
    master.connect(analyser); analyser.connect(ctx.destination);
    master.connect(split); split.connect(anaL, 0); split.connect(anaR, 1);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    setFilter(params.filter); setEcho(params.echo); setVolume(params.volume); setXfade(params.xfade); setDelayTime();
  }
  void ctx.resume();
  return ctx;
}

// ---------- voices ----------
const env = (g: GainNode, t: number, a: number, peak: number, dec: number) => {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
};
function kick(t: number, out: AudioNode) {
  const c = ctx!, o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
  env(g, t, 0.003, 1, 0.4); o.connect(g).connect(out); o.start(t); o.stop(t + 0.5);
}
function noise(t: number, out: AudioNode, type: BiquadFilterType, freq: number, peak: number, dec: number) {
  const c = ctx!, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; env(g, t, 0.002, peak, dec);
  s.connect(f).connect(g).connect(out); s.start(t); s.stop(t + dec + 0.05);
}
function tone(t: number, out: AudioNode, type: OscillatorType, f1: number, f2: number, peak: number, dec: number, cut = 3000) {
  const c = ctx!, o = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f1, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dec);
  lp.frequency.value = cut; env(g, t, 0.005, peak, dec);
  o.connect(lp).connect(g).connect(out); o.start(t); o.stop(t + dec + 0.05);
}

// ---------- sequencer ----------
const bassLine = [55, 0, 55, 65.4, 0, 55, 73.4, 0, 55, 0, 82.4, 55, 0, 65.4, 55, 49];
const arp = [440, 523.3, 659.3, 523.3, 587.3, 698.5, 880, 698.5];
function scheduleStep(s: number, t: number) {
  if (state.A) {
    if (s % 4 === 0) kick(t, busA);
    if (s % 4 === 2) noise(t, busA, 'highpass', 8000, 0.35, 0.05);
    if (s % 2 === 1) noise(t, busA, 'highpass', 10000, 0.12, 0.03);
    if (s % 8 === 4) noise(t, busA, 'bandpass', 1500, 0.6, 0.15);
  }
  if (state.B) {
    const n = bassLine[s]; if (n) tone(t, busB, 'sawtooth', n, 0, 0.35, 0.18, 700);
    if (s % 2 === 0) tone(t, busB, 'square', arp[(s / 2) % 8], 0, 0.06, 0.12, 2400);
  }
  if (s % 4 === 0) {
    const ms = Math.max(0, (t - ctx!.currentTime) * 1000);
    setTimeout(() => beatListeners.forEach((f) => f()), ms);
  }
}
function scheduler() {
  const spb = 60 / state.bpm / 4;
  while (nextTime < ctx!.currentTime + 0.12) { scheduleStep(step, nextTime); nextTime += spb; step = (step + 1) % 16; }
}
function updateTransport() {
  const any = state.A || state.B;
  if (any && timer === null) { nextTime = ctx!.currentTime + 0.05; step = 0; timer = window.setInterval(scheduler, 25); }
  if (!any && timer !== null) { clearInterval(timer); timer = null; }
}

// ---------- public controls ----------
export function toggleDeck(d: Deck, force?: boolean) {
  ensure(); setState({ [d]: force ?? !state[d] } as Partial<EngineState>); updateTransport();
}
export function setBoth(on: boolean) { ensure(); setState({ A: on, B: on }); updateTransport(); }
export function cue(d: Deck) { const c = ensure(); d === 'A' ? kick(c.currentTime, busA) : tone(c.currentTime, busB, 'sawtooth', 55, 0, 0.4, 0.3, 700); }
export function scratch(d: Deck, amount: number) { const c = ensure(); noise(c.currentTime, d === 'A' ? busA : busB, 'bandpass', 800 + Math.abs(amount) * 60, 0.25, 0.04); }
function setDelayTime() { if (ctx) delay.delayTime.value = (60 / state.bpm) * 0.75; }
export function setBpm(bpm: number) { setState({ bpm }); setDelayTime(); }
export function setXfade(x: number) { params.xfade = x; if (ctx) { busA.gain.value = Math.cos((x * Math.PI) / 2); busB.gain.value = Math.cos(((1 - x) * Math.PI) / 2); } }
export function setFilter(v: number) { params.filter = v; if (ctx) filter.frequency.setTargetAtTime(80 * Math.pow(250, v), ctx.currentTime, 0.02); }
export function setEcho(v: number) { params.echo = v; if (ctx) { wet.gain.value = v * 0.7; fb.gain.value = 0.2 + v * 0.45; } }
export function setVolume(v: number) { params.volume = v; if (ctx) master.gain.value = v; }

