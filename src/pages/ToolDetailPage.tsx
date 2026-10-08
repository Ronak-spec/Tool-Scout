import React from 'react';
import { tools } from '../data';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { ToolCard } from '../components/ToolCard';

interface ToolDetailPageProps {
  toolId: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ toolId, onNavigate }) => {
  const { selectedIds, toggleCompare } = useCompare();

  const toolIndex = tools.findIndex(t => t.id === toolId);
  const tool: Tool | undefined = tools[toolIndex];

  if (!tool) {
    return (
      <main id="main">
        <section className="section wrap">
          <h2>Tool not found</h2>
          <p>The requested tool listing could not be found.</p>
          <a
            className="btn btn-dark"
            href="/tools/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/tools');
            }}
          >
            Browse all tools
          </a>
        </section>
      </main>
    );
  }

  const isSelected = selectedIds.includes(tool.id);
  const glyphClasses = ['', 'tool-glyph--orange', 'tool-glyph--blue', 'tool-glyph--green'];
  const glyphStyle = glyphClasses[toolIndex % 4];
  const glyphText = tool.mark || tool.name.slice(0, 2).toUpperCase();

  const isAffiliate = Boolean(tool.affiliateUrl);
  const vendorLink = tool.affiliateUrl || tool.url;
  const rel = isAffiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';

  // Similar tools
  const similarTools = tools
    .filter(
      t =>
        t.id !== tool.id &&
        (t.categoryKey === tool.categoryKey ||
          (t.extraCategories || []).includes(tool.categoryKey) ||
          (tool.extraCategories || []).includes(t.categoryKey))
    )
    .slice(0, 3);

  return (
    <main id="main">
      <section className="profile-hero">
        <div className="wrap profile-hero-grid">
          <div className="profile-hero-copy">
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
                href="/tools/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/tools');
                }}
              >
                Tools
              </a>
              <span aria-hidden="true">/</span>
              <span>{tool.name}</span>
            </nav>

            <div className="profile-title-row">
              <span className={`tool-glyph ${glyphStyle}`} aria-hidden="true">
                {glyphText}
              </span>
              <div>
                <div className="eyebrow">{tool.category}</div>
                <h1>{tool.name}</h1>
                <div className="tool-category">A practical profile for a more informed first look</div>
              </div>
            </div>

            <p className="lede" style={{ margin: '17px 0 0' }}>
              {tool.summary}
            </p>

            <div className="profile-actions">
              <a
                className="btn btn-dark"
                href={vendorLink}
                target="_blank"
                rel={rel}
              >
                Visit {tool.name} <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
              {tool.pricingUrl && (
                <a
                  className="btn btn-outline"
                  href={tool.pricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check pricing <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>
              )}
              <label className="compare-check pill pill-soft" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => toggleCompare(tool.id, e.target.checked)}
                  aria-label={`Compare ${tool.name}`}
                />
                <span>{isSelected ? 'In comparison' : 'Add to compare'}</span>
              </label>
            </div>

            <p className="affiliate-disclosure">
              {isAffiliate
                ? 'Affiliate link disclosure: ToolScout may earn a referral commission if you subscribe.'
                : 'Direct official-vendor link. No affiliate tracking is active for this listing.'}
            </p>
          </div>

          <div className="profile-hero-visual">
            {tool.screenshotUrl ? (
              <figure className="vendor-screenshot">
                <img
                  src={tool.screenshotUrl}
                  alt={tool.screenshotAlt || `${tool.name} interface`}
                  loading="lazy"
                />
                <figcaption>
                  Screenshot from official documentation.{' '}
                  {tool.screenshotSource && (
                    <a
                      href={tool.screenshotSource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source ↗
                    </a>
                  )}
                </figcaption>
              </figure>
            ) : (
              <figure className="profile-snapshot">
                <div className="snapshot-kicker">
                  <span className="mono">AT A GLANCE / {glyphText}</span>
                  <span className="pill pill-lime">{tool.category}</span>
                </div>
                <div
                  className="snapshot-frame"
                  role="img"
                  aria-label={`Illustrative directory visual summarizing the ${tool.name} workflow; not a screenshot of the vendor’s interface`}
                >
                  <div className="snapshot-bar">
                    <i></i><i></i><i></i>
                    <span className="label" style={{ marginLeft: '8px' }}>
                      workflow snapshot · illustrative
                    </span>
                  </div>
                  <div className="snapshot-workspace">
                    <div className="snapshot-side">
                      <div className="snapshot-line"></div>
                      <div className="snapshot-line short"></div>
                      <div className="snapshot-line"></div>
                      <div className="snapshot-line short"></div>
                    </div>
                    <div className="snapshot-main">
                      <div className="snapshot-cell"><i></i></div>
                      <div className="snapshot-cell"><i></i></div>
                      <div className="snapshot-cell"><i></i></div>
                      <div className="snapshot-cell"><i></i></div>
                    </div>
                  </div>
                </div>
                <figcaption className="snapshot-caption">
                  Illustrative capability preview; it is not a product screenshot.
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className="wrap profile-body">
        <div className="profile-main">
          <h2>What it helps with</h2>
          <p>
            {tool.summary} It may be a fit for {tool.bestFor.toLowerCase()}
          </p>

          <h2>Key capabilities</h2>
          <ul className="feature-list">
            {tool.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>

          <h2>Consider it for</h2>
          <div className="detail-tags">
            {tool.tags.map(tag => (
              <a
                key={tag}
                className="pill pill-soft"
                href={`/tools/?q=${encodeURIComponent(tag)}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/tools?q=${encodeURIComponent(tag)}`);
                }}
              >
                {tag}
              </a>
            ))}
          </div>

          <h2>Before you sign up</h2>
          <p>
            {tool.pricingNote} Plans, usage limits, data handling, and integrations can change. Confirm current terms with {tool.name} before relying on a feature or committing to a plan.
          </p>

          <aside className="disclosure">
            <strong>Commercial transparency:</strong> this profile currently uses a direct vendor link. If a tracked referral link is added later, it will be labeled as an affiliate link.
          </aside>
        </div>

        <aside className="profile-rail">
          <section className="detail-card">
            <h3>Pricing snapshot</h3>
            <p>{tool.pricingModel}</p>
            <p style={{ marginTop: '9px' }}>{tool.pricingNote}</p>
            {tool.pricingUrl && (
              <a
                className="btn btn-outline btn-small"
                href={tool.pricingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View vendor pricing ↗
              </a>
            )}
          </section>

          <section className="detail-card">
            <h3>Best suited for</h3>
            <p>{tool.bestFor}</p>
          </section>

          <section className="detail-card">
            <h3>Where it works</h3>
            <div className="detail-tags">
              {(tool.platforms || ['Web']).map(plat => (
                <span key={plat} className="pill">
                  {plat}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-card">
            <h3>Compare this tool</h3>
            <p>Pair it with one or two alternatives to see the differences side by side.</p>
            <label className="compare-check" style={{ marginTop: '13px' }}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => toggleCompare(tool.id, e.target.checked)}
              />
              <span>{isSelected ? 'Selected for comparison' : 'Add to comparison'}</span>
            </label>
          </section>
        </aside>
      </section>

      {similarTools.length > 0 && (
        <section className="section-tight">
          <div className="wrap">
            <h2>Explore similar work</h2>
            <div className="tool-grid" style={{ marginTop: '18px' }}>
              {similarTools.map((sTool, idx) => (
                <ToolCard
                  key={sTool.id}
                  tool={sTool}
                  index={idx}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
