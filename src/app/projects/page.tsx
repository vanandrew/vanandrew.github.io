import type { Metadata } from 'next';
import Section from '@/components/Section';
import WorkList from '@/components/WorkList';
import { work } from '@/data/work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Open-source neuroimaging and developer tools by Andrew Van: warpkit (MEDIC), brainextractor, wbsurfer2, jamb and difftrace.',
};

export default function Projects() {
  return (
    <>
      <header className="wrap page-head">
        <span className="label">Work</span>
        <h1 className="serif page-title">Research, software, and the bits in between.</h1>
        <p className="page-lede">
          Open-source tools and the research behind them, from a decade in neuroimaging: distortion
          correction, brain extraction, surface visualisation, and the developer tooling that keeps regulated
          software testable.
        </p>
      </header>

      <Section
        index="01"
        title="Projects"
        more={{ href: 'https://github.com/vanandrew', label: 'Everything on GitHub' }}
      >
        <WorkList items={work} />
      </Section>
    </>
  );
}
