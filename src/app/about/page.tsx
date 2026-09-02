import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import { education, experience, skills, social } from '@/data/cv';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Andrew Van is a machine learning scientist working on neuroimaging: processing pipelines, deep learning for medical images, and clinical tooling.',
};

export default function About() {
  return (
    <>
      <header className="wrap page-head">
        <span className="label">About</span>
        <h1 className="serif page-title">
          Raw scans in, <em>usable</em> data out.
        </h1>
        <p className="page-lede">
          I’m a machine learning scientist specialising in neuroimaging: the processing that turns raw MRI into
          analysis-ready data, and the models that learn from it.
        </p>
      </header>

      <Section index="01" title="Background">
        <div className="prose">
          <p>
            I trained as a biomedical engineer and spent two years as a neuroimaging research technician at
            Washington University School of Medicine before starting a Ph.D. there. Watching scan after scan
            degraded by head motion pulled me toward processing problems, above all correcting the distortion
            that motion leaves in echo-planar images.
          </p>
          <p>
            My doctoral work produced MEDIC, a frame-wise distortion correction for multi-echo fMRI, released
            as the open-source warpkit library. Alongside it I maintain brainextractor and wbsurfer2 for
            neuroimaging, and jamb and difftrace for the engineering side: requirements traceability for
            regulated software, and change detection for monorepos.
          </p>
          <p>
            Since then the work has been neuroimaging processing and machine learning: pipelines that take raw
            MRI to analysis-ready data, and deep-learning models for medical images, built to run reliably in
            clinical settings. The common thread is turning imaging research into software people can depend
            on.
          </p>
          <p>
            The MRI physics demos on this site come from teaching rather than the day job. They are how I
            explain to newcomers where the images come from.
          </p>
        </div>
      </Section>

      <Section index="02" title="Experience">
        <ol className="cv">
          {experience.map((e) => (
            <li key={`${e.when}-${e.what}`}>
              <span className="mono when">{e.when}</span>
              <span>
                <span className="what">{e.what}</span>
                <br />
                <span className="where">{e.where}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="03" title="Education">
        <ol className="cv">
          {education.map((e) => (
            <li key={e.what}>
              <span className="mono when">{e.when}</span>
              <span>
                <span className="what">{e.what}</span>
                <br />
                <span className="where">{e.where}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="04" title="Toolkit">
        <div className="skills">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="label">{g.group}</h3>
              <p>{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="05" title="Elsewhere">
        <ul className="hero-links label">
          {social.map((s) => (
            <li key={s.href}>
              <a className="arrow-link" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
                <span className="arrow ne" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <Link className="arrow-link" href="/contact">
              Contact
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
