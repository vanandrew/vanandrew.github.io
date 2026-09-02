export type CvItem = { when: string; what: string; where: string };

export const experience: CvItem[] = [
  { when: '2025 —', what: 'Senior Machine Learning Scientist', where: 'Turing Medical' },
  { when: '2023 — 2025', what: 'Machine Learning Scientist', where: 'Turing Medical' },
  { when: '2023', what: 'Visiting Scholar', where: 'Perelman School of Medicine, University of Pennsylvania' },
  { when: '2018 — 2023', what: 'Ph.D. Candidate, Biomedical Engineering', where: 'Washington University in St. Louis' },
  { when: '2016 — 2018', what: 'Neuroimaging Research Technician', where: 'Washington University School of Medicine' },
  { when: '2012 — 2014', what: 'Research Assistant', where: 'Texas A&M University' },
];

export const education: CvItem[] = [
  { when: '2023', what: 'Ph.D., Biomedical Engineering', where: 'Washington University in St. Louis' },
  { when: '2014', what: 'B.S., Biomedical Engineering', where: 'Texas A&M University' },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Neuroimaging',
    items: [
      'fMRI preprocessing',
      'Distortion correction',
      'Registration',
      'Brain extraction',
      'Segmentation',
      'Functional connectivity',
    ],
  },
  {
    group: 'Machine learning',
    items: ['PyTorch', 'TensorFlow', 'Computer vision', 'Medical image segmentation', 'NumPy', 'Pandas'],
  },
  {
    group: 'Languages',
    items: ['Python', 'C++', 'Rust', 'TypeScript', 'JavaScript', 'MATLAB'],
  },
  {
    group: 'Infrastructure',
    items: ['AWS', 'Docker', 'CI/CD', 'Linux', 'Django', 'React', 'WebGL'],
  },
];

export const social = [
  { label: 'GitHub', href: 'https://github.com/vanandrew' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-n-van' },
];
