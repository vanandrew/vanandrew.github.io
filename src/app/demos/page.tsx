import type { Metadata } from 'next';
import Section from '@/components/Section';
import DemoList from '@/components/DemoList';
import { demos } from '@/data/demos';

export const metadata: Metadata = {
  title: 'Teaching',
  description:
    'Interactive MRI physics demos built for teaching: k-space, Larmor precession, spatial frequency and reconstruction.',
};

export default function Demos() {
  return (
    <>
      <header className="wrap page-head">
        <span className="label">Teaching</span>
        <h1 className="serif page-title">MRI physics you can poke at.</h1>
        <p className="page-lede">
          Small, self-contained pages I built for teaching how MR images come to be. Each one runs entirely
          in the browser; nothing to install, nothing tracked.
        </p>
      </header>

      <Section index="01" title="Interactive">
        <DemoList items={demos.filter((d) => d.kind === 'Interactive')} />
      </Section>

      <Section index="02" title="Slides">
        <DemoList items={demos.filter((d) => d.kind === 'Slides')} />
      </Section>
    </>
  );
}
