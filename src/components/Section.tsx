import Link from 'next/link';

type Props = {
  index: string;
  title: string;
  more?: { href: string; label: string };
  children: React.ReactNode;
  id?: string;
};

export default function Section({ index, title, more, children, id }: Props) {
  return (
    <section className="section" id={id}>
      <div className="wrap section-grid">
        <header className="section-head">
          <span className="label">{index}</span>
          <h2 className="serif section-title">{title}</h2>
          {more && (
            <Link href={more.href} className="arrow-link section-more">
              {more.label}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </header>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}
