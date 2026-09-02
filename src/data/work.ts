export type WorkLink = { label: string; href: string };

export type Work = {
  slug: string;
  title: string;
  blurb: string;
  kind: string;
  tags: string[];
  links: WorkLink[];
  featured: boolean;
};

export const work: Work[] = [
  {
    slug: 'warpkit',
    title: 'warpkit',
    blurb:
      'Python library for neuroimaging transforms and the reference implementation of MEDIC, Multi-Echo DIstortion Correction for fMRI. The phase difference between echoes in every frame becomes a B0 field map, so distortion is corrected as the head moves rather than once from a static field map. Ships as wheels, standalone binaries and a Docker image; the phase-unwrapping core is a C++17 port of ROMEO. Published in Imaging Neuroscience; patent pending.',
    kind: 'Neuroimaging',
    tags: ['Distortion correction', 'fMRI', 'Python', 'C++'],
    links: [
      { label: 'Code', href: 'https://github.com/vanandrew/warpkit' },
      { label: 'Paper', href: 'https://doi.org/10.1162/IMAG.a.1262' },
      { label: 'Preprint', href: 'https://www.biorxiv.org/content/10.1101/2023.11.28.568744v1' },
    ],
    featured: true,
  },
  {
    slug: 'wbsurfer2',
    title: 'wbsurfer2',
    blurb:
      'Command-line tool for turning CIFTI surface data into movies with Connectome Workbench 2. A refresh of the original wbsurfer, distributed as compiled binaries for each OS as well as on PyPI.',
    kind: 'Visualisation',
    tags: ['CIFTI', 'Connectome Workbench', 'Python'],
    links: [{ label: 'Code', href: 'https://github.com/vanandrew/wbsurfer2' }],
    featured: true,
  },
  {
    slug: 'jamb',
    title: 'jamb',
    blurb:
      'IEC 62304 requirements traceability for pytest. Link tests to the requirements they verify with a marker, manage the requirement documents from the command line, and generate the traceability matrices that regulatory submissions for medical-device software need.',
    kind: 'Developer tooling',
    tags: ['pytest', 'IEC 62304', 'Python'],
    links: [
      { label: 'Code', href: 'https://github.com/vanandrew/jamb' },
      { label: 'Docs', href: 'https://jamb.readthedocs.io' },
    ],
    featured: true,
  },
  {
    slug: 'difftrace',
    title: 'difftrace',
    blurb:
      'Change detection for uv monorepos. Parses uv.lock into the workspace dependency graph, maps a git diff onto packages, and walks reverse dependencies to find everything transitively affected, so CI only builds, tests and deploys what a change actually touches. Zero runtime dependencies; ships as a GitHub Action.',
    kind: 'Developer tooling',
    tags: ['uv', 'CI', 'Python'],
    links: [{ label: 'Code', href: 'https://github.com/vanandrew/difftrace' }],
    featured: true,
  },
  {
    slug: 'brainextractor',
    title: 'brainextractor',
    blurb:
      "FSL's Brain Extraction Tool re-implemented in pure Python: a deformable surface model that finds the brain boundary without the original toolchain.",
    kind: 'Neuroimaging',
    tags: ['Brain extraction', 'Python'],
    links: [{ label: 'Code', href: 'https://github.com/vanandrew/brainextractor' }],
    featured: true,
  },
];
