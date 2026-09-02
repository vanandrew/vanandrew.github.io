# nononsense.me

Personal site of Andrew Van. Next.js (static export) on GitHub Pages.

The front page runs a real 2-D Fourier reconstruction in the browser: a portrait
(or a Shepp–Logan phantom) is transformed into k-space and rebuilt from whichever
phase-encode lines have been acquired. Lines fill in automatically in centric,
linear or random order, or by dragging across the k-space panel. The headline
blurs and sharpens with the contiguous low-frequency band that has been acquired.

## Layout

```
src/app/            routes: /, /about, /projects (work), /demos, /contact, 404
src/components/     Nav, Footer, Section, WorkList, DemoList, ContactForm
src/components/kspace/
  KSpaceHero.tsx    the hero instrument (canvas, controls, pointer painting)
  fft.ts            allocation-free radix-2 2-D FFT
  phantom.ts        modified Shepp–Logan phantom
src/data/           site content: work, demos, cv
public/demos/       standalone MRI teaching demos + shared demo.css
public/kspace_presentation.html   slide deck (reveal.js)
```

Fonts (Instrument Serif, Instrument Sans, JetBrains Mono) are self-hosted at build
time through `next/font/google`. Colours live as CSS variables in
`src/app/globals.css` and follow the system light/dark preference.

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Pushing to `master` builds and deploys through `.github/workflows/deploy.yml`.

## Editing content

- Work / publications: `src/data/work.ts`
- Demos list: `src/data/demos.ts`
- Experience, education, skills, social links: `src/data/cv.ts`
- Contact form posts to Formspree (`src/components/ContactForm.tsx`)
