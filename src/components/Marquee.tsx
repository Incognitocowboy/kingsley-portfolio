import { stack } from '../data/content';

export default function Marquee() {
  const items = [...stack, ...stack]; // doubled for a seamless loop
  return (
    <div className="marquee" aria-hidden="true">
      <div>{items.map((s, i) => <span key={i}>{s}</span>)}</div>
    </div>
  );
}
