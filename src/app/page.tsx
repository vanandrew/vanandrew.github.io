import Link from 'next/link';
import KSpaceHero from '@/components/kspace/KSpaceHero';
import Section from '@/components/Section';
import WorkList from '@/components/WorkList';
import DemoList from '@/components/DemoList';
import { work } from '@/data/work';
import { demos } from '@/data/demos';
import { social } from '@/data/cv';

export default function Home() {
  const featured = work.filter((w) => w.featured).slice(0, 5);
  const featuredDemos = demos.filter((d) => d.kind === 'Interactive').slice(0, 4);

  return (
    <>
      <section className="wrap hero" aria-labelledby="hero-name">
        <h1 id="hero-name" className="serif hero-name">
          Andrew Van
        </h1>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="lede">
              Machine learning engineer working on neuroimaging. I build the{' '}
              <em className="serif">pipelines and models</em> that turn raw brain scans into data people
              can trust.
            </p>
            <p className="muted" style={{ margin: 0 }}>
              Senior Machine Learning Engineer at Centile Bioscience. Image processing for MRI and fMRI, deep
              learning for medical images, and the cloud infrastructure that runs them for clinical use.
              Ph.D. in Biomedical Engineering, Washington University in St. Louis.
            </p>
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
          </div>

          <KSpaceHero />
        </div>
      </section>

      <Section index="01" title="Selected work" more={{ href: '/projects', label: 'All work' }}>
        <WorkList items={featured} />
      </Section>

      <Section index="02" title="About">
        <div className="prose">
          <p className="lead">
            I came to machine learning through <em className="serif">neuroimaging</em>: first as a research
            technician watching scans get ruined by head motion, then as a Ph.D. student building the
            processing methods that fix what motion leaves behind.
          </p>
          <p className="muted">
            These days the work is neuroimaging processing and machine learning: pipelines that take raw MRI
            to analysis-ready data, and deep-learning models that segment and correct it. Most of it ends up
            in front of clinicians, so it has to be right, fast and boring to run.
          </p>
          <p>
            <Link href="/about" className="arrow-link">
              More about me
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </p>
        </div>
      </Section>

      <Section index="03" title="Teaching" more={{ href: '/demos', label: 'All demos' }}>
        <p className="muted" style={{ margin: '0 0 1.5rem', maxWidth: '44rem' }}>
          Interactive MRI physics demos I built for teaching. Not the day job, but the fastest way I know to
          explain where the images come from.
        </p>
        <DemoList items={featuredDemos} />
      </Section>

      <Section index="04" title="Contact">
        <div className="prose">
          <p className="lead">
            Working on something in neuroimaging or machine learning?{' '}
            <Link href="/contact" className="u">
              Say hello
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
