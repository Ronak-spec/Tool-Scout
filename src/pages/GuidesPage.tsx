import React from 'react';
import { guides, tools } from '../data';
import { ToolCard } from '../components/ToolCard';

interface GuidesPageProps {
  currentGuideId?: string;
  onNavigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ currentGuideId, onNavigate }) => {
  const currentGuide = currentGuideId
    ? guides.find(g => g.id === currentGuideId)
    : null;

  if (currentGuide) {
    // Recommend related tools depending on guide
    let relatedTools = tools;
    if (currentGuide.id === 'choose-writing-assistant') {
      relatedTools = tools.filter(t => (t.useCases || []).includes('writing'));
    } else if (currentGuide.id === 'research-with-sources') {
      relatedTools = tools.filter(t => (t.useCases || []).includes('research'));
    } else if (currentGuide.id === 'creative-tools') {
      relatedTools = tools.filter(t => ['midjourney', 'canva', 'runway'].includes(t.id));
    } else {
      relatedTools = tools.slice(0, 3);
    }

    return (
      <main id="main">
        <section className="guide-hero">
          <div className="wrap">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
              >
                Home
              </a>
              <span aria-hidden="true">/</span>
              <a
                href="/guides/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/guides');
                }}
              >
                Field guides
              </a>
              <span aria-hidden="true">/</span>
              <span>{currentGuide.title}</span>
            </nav>

            <div className="eyebrow">Field note / buyer's guide</div>
            <h1>{currentGuide.title}</h1>
            <p className="lede">{currentGuide.description}</p>
            <div className="guide-meta" style={{ display: 'flex', gap: '8px', color: 'var(--muted)', fontSize: '13px', marginTop: '12px' }}>
              <span>ToolScout editorial</span>
              <span>·</span>
              <span>About 4 min read</span>
              <span>·</span>
              <span>Updated 6 Oct 2026</span>
            </div>
          </div>
        </section>

        <article className="wrap guide-body" style={{ maxWidth: '820px', margin: '40px auto 60px' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.6', marginBottom: '32px' }}>
            {currentGuide.intro}
          </p>

          <h2>Key questions to ask before deciding</h2>
          <div style={{ display: 'grid', gap: '16px', margin: '24px 0 40px' }}>
            {currentGuide.points.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '18px 20px',
                  background: 'var(--white)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <span className="mono" style={{ color: 'var(--muted)', fontWeight: 600 }}>
                  0{idx + 1}
                </span>
                <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{pt}</span>
              </div>
            ))}
          </div>

          <h2>Relevant tools to explore</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
            Tools in our launch directory that relate directly to this guide's workflow:
          </p>
          <div className="tool-grid" style={{ marginBottom: '48px' }}>
            {relatedTools.map((tool, idx) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={idx}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <div style={{ padding: '24px', background: 'var(--card)', borderRadius: 'var(--radius)', marginTop: '32px' }}>
            <h3 style={{ margin: '0 0 10px' }}>Read more field notes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {guides
                .filter(g => g.id !== currentGuide.id)
                .map(g => (
                  <a
                    key={g.id}
                    href={`/guides/${g.id}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/guides/${g.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ textDecoration: 'underline', color: 'var(--ink)' }}
                  >
                    {g.title} →
                  </a>
                ))}
            </div>
          </div>
        </article>
      </main>
    );
  }

  // All guides view
  return (
    <main id="main">
      <section className="guide-hero">
        <div className="wrap">
          <div className="eyebrow">ToolScout field notes</div>
          <h1>
            Better questions.<br />
            <span className="serif">Better tool choices.</span>
          </h1>
          <p className="lede">
            Practical buyer guides for choosing software around your actual work.
          </p>
        </div>
      </section>

      <section className="wrap guide-list" style={{ paddingBottom: '60px' }}>
        <div className="editorial-list" style={{ marginTop: '20px' }}>
          {guides.map((guide, idx) => (
            <a
              key={guide.id}
              className="editorial-row"
              href={`/guides/${guide.id}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/guides/${guide.id}`);
              }}
            >
              <span className="editorial-index">0{idx + 1}</span>
              <span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </span>
              <span className="editorial-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};
