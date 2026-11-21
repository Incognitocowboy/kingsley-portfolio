// ─────────────────────────────────────────────────────────────
//  All of the site's text lives here. Edit this file to update
//  your name, projects, experience, stats and links.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'KINGSLEY',
  role: 'Software Developer · Full-stack · Builder',
  tagline: 'I mix clean code, fast UIs and solid backends. Shipping at',
};

export const links = {
  github: 'https://github.com/Incognitocowboy',
  linkedin: 'https://www.linkedin.com/in/kingsley-ani-62a58a209',
  cv: '', // add a link to your CV (or put a PDF in /public and use '/cv.pdf')
};

export const stack = ['TYPESCRIPT', 'REACT', 'NODE', 'PYTHON', 'GO', 'POSTGRES', 'DOCKER', 'AWS'];

export type Project = {
  title: string;
  year: string;
  stack: string;
  color: string; // accent color for hover glow + waveform
  cover: string; // any CSS background (gradient or url(...))
  url?: string; // live link; leave out for no link
};

export const projects: Project[] = [
  {
    title: '161 Archive',
    year: '2026',
    stack: 'E-commerce · Vintage store',
    color: '#ffb627',
    cover: 'linear-gradient(150deg,#1a1410,#5a3a22 45%,#ffb627 120%)',
    url: 'https://161archive.com',
  },
  {
    title: 'Made to Order Planner',
    year: '2026',
    stack: 'Next.js · Supabase · Tailwind',
    color: '#21e6ff',
    cover: 'linear-gradient(135deg,#0b2a33 0%,#0a8fb0 45%,#c6ff3d 130%)',
    url: 'https://made-to-order-planner.vercel.app',
  },
  // ↓ placeholders — replace with your real projects
  { title: 'Realtime Collab Editor', year: '2026', stack: 'React · WebSockets · CRDT', color: '#ff2e88', cover: 'conic-gradient(from 45deg,#ff2e88,#6b2cff,#21e6ff,#ff2e88)' },
  { title: 'Payments API Gateway', year: '2025', stack: 'Go · Postgres · Redis', color: '#21e6ff', cover: 'radial-gradient(circle at 30% 30%,#21e6ff,#0a3b6b 60%,#05050a)' },
  { title: 'Analytics Dashboard', year: '2025', stack: 'Next.js · D3 · tRPC', color: '#ffb627', cover: 'linear-gradient(160deg,#ffb627,#ff2e88 60%,#3a0a2a)' },
  { title: 'CLI Deploy Tool', year: '2024', stack: 'Rust · Open source', color: '#c6ff3d', cover: 'repeating-radial-gradient(circle,#c6ff3d 0 6px,#122200 6px 18px)' },
  { title: 'This Portfolio', year: '2026', stack: 'React · Web Audio · Canvas', color: '#21e6ff', cover: 'conic-gradient(#21e6ff 0 25%,#0b0a10 0 50%,#ff2e88 0 75%,#0b0a10 0)', url: 'https://github.com/Incognitocowboy' },
];

export type Job = { from: string; to: string; title: string; org: string; tag: string; current?: boolean; url?: string };

// ↓ placeholders except education — replace with your real history
export const experience: Job[] = [
  { from: '2024', to: '— NOW', title: 'Senior Software Engineer', org: 'Acme Cloud · Platform team', tag: 'CURRENT', current: true },
  { from: '2021', to: '— 2024', title: 'Full-stack Developer', org: 'Pixel & Co · Product squad', tag: 'REACT · NODE' },
  { from: '2019', to: '— 2021', title: 'Frontend Developer', org: 'Startup Studio', tag: 'TYPESCRIPT' },
  { from: '2018', to: '— 2019', title: 'Software Engineering Intern', org: 'Data Labs', tag: 'PYTHON' },
  { from: '2018', to: 'GRAD', title: 'B.S. Computer Science', org: 'University of Houston', tag: 'EDUCATION' },
];

export const about = [
  "I'm a <b>software developer</b> who builds products like DJs build sets: layer by layer, keeping the tempo steady, and always reading the room (users).",
  'I work across the stack, from <b>React</b> interfaces with tactile animations to <b>Node</b> and <b>Go</b> services on <b>Postgres</b>. I care about performance, accessibility and code that the next person can read.',
];

export const stats = [
  { value: 7, suffix: '+', label: 'Years coding' },
  { value: 40, suffix: '', label: 'Projects shipped' },
  { value: 5, suffix: 'k', label: 'Commits / year' },
  { value: 99, suffix: '%', label: 'Uptime vibes' },
];

export const contactTypes = ['Full-time', 'Contract', 'Freelance', 'Just saying hi'];
