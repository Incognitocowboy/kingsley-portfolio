import { links, profile } from '../data/content';

const socials = [
  { label: 'GH', name: 'GitHub', href: links.github },
  { label: 'IN', name: 'LinkedIn', href: links.linkedin },
  { label: 'CV', name: 'CV', href: links.cv },
];

export default function Footer() {
  return (
    <footer>
      <div className="big">{profile.name}</div>
      <div className="socials">
        {socials.map((s) => (
          <a key={s.label} className="btn" aria-label={s.name} href={s.href || '#'} {...(s.href ? { target: '_blank', rel: 'noopener' } : {})}>{s.label}</a>
        ))}
      </div>
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
