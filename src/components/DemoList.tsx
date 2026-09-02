import type { Demo } from '@/data/demos';

export default function DemoList({ items }: { items: Demo[] }) {
  return (
    <ol className="rows">
      {items.map((d, i) => (
        <li key={d.slug} className="row">
          <span className="label row-idx">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="serif row-title">
              <a href={d.path}>{d.title}</a>
            </h3>
            <p className="row-desc">{d.blurb}</p>
            <ul className="row-links">
              <li>
                <a className="label arrow-link" href={d.path}>
                  Open
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="row-meta">
            <span className="label">{d.kind}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
