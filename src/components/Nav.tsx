'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links: { href: string; label: string; external?: boolean }[] = [
  { href: '/projects', label: 'Work' },
  { href: '/demos', label: 'Teaching' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const renderLink = (l: (typeof links)[number]) => {
    const current = !l.external && pathname === l.href;
    if (l.external) {
      return (
        <a className="nav-link" href={l.href} target="_blank" rel="noreferrer">
          {l.label}
          <span className="ext" aria-hidden="true">
            ↗
          </span>
        </a>
      );
    }
    return (
      <Link className="nav-link" href={l.href} aria-current={current ? 'page' : undefined}>
        {l.label}
      </Link>
    );
  };

  return (
    <header className="nav">
      <div className="wrap">
        <div className="nav-inner">
          <Link href="/" className="serif nav-brand" aria-label="Andrew Van, home">
            Andrew Van
          </Link>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>{renderLink(l)}</li>
            ))}
          </ul>
          <button
            type="button"
            className="nav-toggle label"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <ul className="nav-mobile" id="nav-mobile">
            {links.map((l) => (
              <li key={l.href}>{renderLink(l)}</li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
