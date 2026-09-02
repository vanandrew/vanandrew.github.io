import Link from 'next/link';

export default function NotFound() {
  return (
    <header className="wrap page-head" style={{ paddingBlock: 'clamp(4rem, 12vw, 10rem)' }}>
      <span className="label">404</span>
      <h1 className="serif page-title">Signal lost.</h1>
      <p className="page-lede">There is nothing at this address. The centre of k-space is back on the home page.</p>
      <p>
        <Link href="/" className="arrow-link">
          Home
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </p>
    </header>
  );
}
