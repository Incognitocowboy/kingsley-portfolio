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
  cv: '/cv.pdf', // generated from resume/resume.html — run `npm run cv` after editing
};

export const stack = ['TYPESCRIPT', 'REACT', 'NODE', 'PYTHON', 'GO', 'POSTGRES', 'DOCKER'];

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
  {
    title: 'SteezeNYC Website',
    year: '2025',
    stack: 'React · Node.js · Media site',
    color: '#ff2e88',
    cover: 'linear-gradient(140deg,#0b0a10 0%,#3a0a2a 40%,#ff2e88 110%)',
    // url: 'https://…', // TODO: add the live link
  },
  {
    title: 'Email Management AI Agent',
    year: '2026',
    stack: 'AI agent · LLM APIs · Next.js',
    color: '#c6ff3d',
    cover: 'radial-gradient(circle at 70% 30%,#c6ff3d,#2f5a00 45%,#0b0a10 85%)',
    // url: 'https://….vercel.app', // TODO: add once hosted on Vercel
  },
  // ↓ placeholders — replace with your real projects
  { title: 'Analytics Dashboard', year: '2025', stack: 'Next.js · D3 · tRPC', color: '#ffb627', cover: 'linear-gradient(160deg,#ffb627,#ff2e88 60%,#3a0a2a)' },
  { title: 'This Portfolio', year: '2026', stack: 'React · Web Audio · Canvas', color: '#21e6ff', cover: 'conic-gradient(#21e6ff 0 25%,#0b0a10 0 50%,#ff2e88 0 75%,#0b0a10 0)', url: 'https://github.com/Incognitocowboy' },
];

export type Job = { from: string; to: string; title: string; org: string; tag: string; current?: boolean; url?: string };

export const experience: Job[] = [
  { from: 'JAN 2025', to: '— NOV 2026', title: 'Full-stack Developer', org: 'SteezeNYC · New York, NY', tag: 'REACT · NODE', current: true },
  { from: '2022', to: '— 2024', title: 'Freelance Front-end Developer', org: 'Self-employed · client sites incl. 161 Archive', tag: 'FREELANCE', url: 'https://161archive.com' },
  { from: 'JAN 2023', to: 'CERTIFIED', title: 'Full-stack JavaScript Certifications', org: 'Noble Desktop · React, Node/Express, MongoDB', tag: 'CERTIFICATIONS' },
  { from: 'NOV 2020', to: '— DEC 2021', title: 'Legal Assistant', org: 'Adey Law Firm · Sugar Land, TX · managed the firm website', tag: 'WEBSITE' },
  { from: '2018', to: '— 2021', title: 'Electrical & Computer Engineering', org: 'University of Houston · GPA 3.46', tag: 'EDUCATION' },
];

export const about = [
  "I'm a <b>software developer</b> who builds products like DJs build sets: layer by layer, keeping the tempo steady, and always reading the room (users).",
  'I work across the stack, from <b>React</b> interfaces with tactile animations to <b>Node</b> and <b>Go</b> services on <b>Postgres</b>. I care about performance, accessibility and code that the next person can read.',
];

export const stats = [
  { value: 6, suffix: '', label: 'Years coding' },
  { value: 20, suffix: '', label: 'Projects shipped' },
  { value: 5, suffix: 'k', label: 'Commits / year' },
  { value: 99, suffix: '%', label: 'Uptime vibes' },
];

export const contactTypes = ['Full-time', 'Contract', 'Freelance', 'Just saying hi'];
