import type { Work } from '@/data/work';

export default function WorkList({ items }: { items: Work[] }) {
  return (
    <ol className="rows">
      {items.map((w, i) => (
        <li key={w.slug} className="row">
          <span className="label row-idx">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="serif row-title">{w.title}</h3>
            <p className="row-desc">{w.blurb}</p>
            {w.links.length > 0 && (
              <ul className="row-links">
                {w.links.map((l) => (
                  <li key={l.href}>
                    <a className="label arrow-link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                      <span className="arrow ne" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="row-meta">
            <span className="label">{w.kind}</span>
            <span className="label tags">{w.tags.join(' · ')}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
