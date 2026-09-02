import type { Metadata } from 'next';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { social } from '@/data/cv';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Andrew Van.',
};

export default function Contact() {
  return (
    <>
      <header className="wrap page-head">
        <span className="label">Contact</span>
        <h1 className="serif page-title">Say hello.</h1>
        <p className="page-lede">
          Collaborations, questions about the papers or the code, or anything at the intersection of imaging
          and machine learning. I read everything.
        </p>
      </header>

      <Section index="01" title="Message">
        <ContactForm />
      </Section>

      <Section index="02" title="Elsewhere">
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
        </ul>
      </Section>
    </>
  );
}
