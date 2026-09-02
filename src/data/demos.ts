export type Demo = {
  slug: string;
  title: string;
  blurb: string;
  path: string;
  kind: 'Interactive' | 'Slides';
};

export const demos: Demo[] = [
  {
    slug: 'kspace-navigator',
    title: 'k-space navigator',
    blurb:
      'Drive through k-space with gradient pulses like an Etch-a-Sketch. Fire an RF pulse, hold Gx and Gy, and watch the trajectory while the free induction signal decays under you.',
    path: '/demos/kspace_navigator.html',
    kind: 'Interactive',
  },
  {
    slug: 'kspace-reconstruction',
    title: 'Line-by-line reconstruction',
    blurb:
      'Acquire k-space one phase-encode line at a time in sequential, centric or keyhole order and see truncation, blurring and Gibbs ringing appear in the image.',
    path: '/demos/k-space-reconstruction.html',
    kind: 'Interactive',
  },
  {
    slug: 'spin-kspace',
    title: 'Spins and spatial frequency',
    blurb:
      'Move the (kx, ky) sampling point and watch the phase pattern it imposes across a grid of spins, in the laboratory or the rotating frame.',
    path: '/demos/spin-k-space-viz.html',
    kind: 'Interactive',
  },
  {
    slug: 'larmor',
    title: 'Larmor precession',
    blurb:
      'Individual nuclear spins at thermal equilibrium: precession around B0, Boltzmann populations, and why random phases sum to zero transverse magnetisation.',
    path: '/demos/larmor-precession-viz.html',
    kind: 'Interactive',
  },
  {
    slug: 'kspace-talk',
    title: 'Understanding k-space',
    blurb: 'A short slide deck that walks through the ideas behind the demos above.',
    path: '/kspace_presentation.html',
    kind: 'Slides',
  },
];
