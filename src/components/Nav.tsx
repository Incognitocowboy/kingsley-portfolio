import { setBoth } from '../audio/engine';
import { profile } from '../data/content';
import { useEngine } from '../useEngine';

export default function Nav() {
  const { A, B } = useEngine();
  const live = A || B;
  const name = profile.name;
  return (
    <nav>
      <div className="logo">{name.slice(0, -1)}<span>{name.slice(-1)}</span></div>
      <ul>
        <li><a href="#decks">Decks</a></li>
        <li><a href="#mixes">Projects</a></li>
        <li><a href="#tour">Experience</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#book">Hire me</a></li>
      </ul>
      <button
        type="button"
        className={`live-pill${live ? ' on' : ''}`}
        aria-pressed={live}
        title={live ? 'Go off air (dark mode, music off)' : 'Go on air (light mode, music on)'}
        onClick={() => setBoth(!live)}
      >
        <i /><span>{live ? 'ON AIR' : 'OFF AIR'}</span>
      </button>
    </nav>
  );
}
