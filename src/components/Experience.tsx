import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="tour">
      <div className="sec-head reveal"><span className="num">03</span><h2>Experience</h2><p>The setlist so far.</p></div>
      <ul className="tour reveal">
        {experience.map((j) => (
          <li key={j.title + j.from}>
            <div className="date">{j.from}<small>{j.to}</small></div>
            <div className="city">{j.title}<small>{j.org}</small></div>
            <span className={`tag${j.current ? ' sold' : ''}`}>{j.tag}</span>
            <a className="btn chip" href={j.url ?? '#'} {...(j.url ? { target: '_blank', rel: 'noopener' } : {})}>Details</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
