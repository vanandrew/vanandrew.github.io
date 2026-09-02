import Link from 'next/link';
import { social } from '@/data/cv';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <h4 className="serif" style={{ fontSize: '1.35rem', color: 'var(--fg)' }}>
            Andrew Van
          </h4>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div>
          <h4 className="label">Elsewhere</h4>
          <ul>
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
      </div>
    </footer>
  );
}
