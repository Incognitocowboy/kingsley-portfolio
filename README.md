# Kingsley — portfolio

DJ-themed developer portfolio. Vite + React + TypeScript, no UI libraries. The decks, pads and visualizer run on a small Web Audio synth (`src/audio/engine.ts`) with no audio files.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where to edit

| What | File |
|---|---|
| Name, tagline, links, projects, experience, about text, stats | `src/data/content.ts` |
| Colors, fonts, animations | `src/styles.css` (color tokens at the top in `:root`) |
| A section's layout | `src/components/<Section>.tsx` |
| Sounds, beat pattern, pads | `src/audio/engine.ts` |

The contact form doesn't send anything yet; see the note at the top of `src/components/Contact.tsx`.
