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

## Contact form → your inbox

The "Send request" form emails you through [Web3Forms](https://web3forms.com) (free). Your address never appears in the site's code.

1. Go to web3forms.com, enter the inbox you want messages sent to, and copy the access key they email you.
2. Copy `.env.example` to `.env.local` and paste the key into `VITE_WEB3FORMS_KEY=`. Restart `npm run dev`.
3. When you deploy (e.g. Vercel), add `VITE_WEB3FORMS_KEY` in the host's environment variables too.

Without a key, the form shows a "not set up yet" message instead of sending.
