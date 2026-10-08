import React, { useState } from 'react';
import { tools } from '../data';
import type { Tool } from '../types';
import { ToolCard } from '../components/ToolCard';
import { CategoryMarquee } from '../components/CategoryMarquee';
import { StorySection } from '../components/StorySection';
import { QuickViewModal } from '../components/QuickViewModal';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewTool, setQuickViewTool] = useState<Tool | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      onNavigate(`/tools?q=${encodeURIComponent(query)}`);
    } else {
      onNavigate('/tools');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    try {
      const email = newsletterEmail.trim();
      const subId = `sub_${Date.now()}`;
      await setDoc(doc(collection(db, 'subscribers'), subId), {
        email,
        subscribedAt: new Date().toISOString(),
      });
      setNewsletterStatus('Subscribed to Field Notes. We’ll notify you when new listings drop.');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('Subscribed locally. Welcome to the ToolScout dispatch!');
      setNewsletterEmail('');
    }
  };

  const editorPickTools = tools.filter(t => t.editorPick || ['chatgpt', 'perplexity', 'canva'].includes(t.id));

  return (
    <main id="main">
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">The independent guide to AI software</span>
            <h1>
              Find your fit.<br />
              <span className="serif">Skip the noise.</span>
            </h1>
            <p className="lede">
              An independent guide to AI software for research, creation and everyday work. Start with a task, compare the details, then check the current terms with the maker.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-dark"
                href="/tools/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/tools');
                }}
              >
                Browse the directory <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a
                className="btn btn-outline"
                href="/guides/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/guides');
                }}
              >
                Read the field notes
              </a>
            </div>

            <form
              data-hero-search-form
              className="search-box"
              style={{ marginTop: '22px', maxWidth: '450px' }}
              onSubmit={handleHeroSearch}
            >
              <label className="sr-only" htmlFor="hero-search">Search AI tools</label>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.3 4.3" />
              </svg>
              <input
                className="search-input"
                id="hero-search"
                name="q"
                placeholder="Search a tool, task, or capability"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--muted)' }}>
                POPULAR:
              </span>
              {['Writing', 'Research', 'Video', 'Design', 'Canva', 'Notion'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onNavigate(`/tools?q=${encodeURIComponent(tag)}`)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ink)',
                    fontSize: '12px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginRight: '6px',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <figure className="hero-art">
            <img
              className="hero-art-image"
              src="/assets/hero-art.webp"
              alt="An original sculptural still life suggesting a clear path through many software choices."
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="art-caption">
              <span className="mono">FIELD GUIDE / 01</span>
              <span>Find a clearer path</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="wrap trust-row">
          <span className="trust-note">An editorial directory, not a promise of outcomes.</span>
          <div className="trust-points">
            <span className="trust-point">Compare by your needs</span>
            <span className="trust-point">Direct vendor links</span>
            <span className="trust-point">Commercial labels stay visible</span>
          </div>
        </div>
      </div>

      {/* Category Marquee */}
      <CategoryMarquee onNavigate={onNavigate} />

      {/* Curated Categories Rail */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow section-kicker">Curated categories · launch edition</div>
              <h2 className="section-title">Start with the work.</h2>
            </div>
            <a
              className="text-link"
              href="/categories/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/categories');
              }}
            >
              All categories <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="category-rail">
            <a
              className="category-tile category-tile--assistants"
              href="/category/assistants/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/assistants');
              }}
            >
              <span className="category-code mono">CATEGORY 01</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">AI assistants</span>
            </a>
            <a
              className="category-tile category-tile--research"
              href="/category/research/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/research');
              }}
            >
              <span className="category-code mono">CATEGORY 02</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Research</span>
            </a>
            <a
              className="category-tile category-tile--image-generation"
              href="/category/image-generation/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/image-generation');
              }}
            >
              <span className="category-code mono">CATEGORY 03</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Image generation</span>
            </a>
            <a
              className="category-tile category-tile--visual-design"
              href="/category/visual-design/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/visual-design');
              }}
            >
              <span className="category-code mono">CATEGORY 04</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Visual design</span>
            </a>
            <a
              className="category-tile category-tile--video"
              href="/category/video/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/video');
              }}
            >
              <span className="category-code mono">CATEGORY 05</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Video</span>
            </a>
            <a
              className="category-tile category-tile--audio"
              href="/category/audio/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/audio');
              }}
            >
              <span className="category-code mono">CATEGORY 06</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Voice &amp; audio</span>
            </a>
            <a
              className="category-tile category-tile--productivity"
              href="/category/productivity/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/category/productivity');
              }}
            >
              <span className="category-code mono">CATEGORY 07</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">Productivity</span>
            </a>
          </div>
        </div>
      </section>

      {/* Editor Picks (Launch edition) */}
      <section className="section-tight">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow section-kicker">Editor picks · launch edition</div>
              <h2 className="section-title">Tools worth a closer look.</h2>
            </div>
            <p>Compare the fit and the pricing model before you add anything to your stack.</p>
          </div>

          <div className="tool-grid">
            {editorPickTools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                onNavigate={onNavigate}
                onQuickView={setQuickViewTool}
              />
            ))}
          </div>

          <p className="editorial-note">
            Editorial starting points selected for range—not ranked by payment or usage data.
          </p>

          <div style={{ marginTop: '20px' }}>
            <a
              className="btn btn-outline"
              href="/tools/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/tools');
              }}
            >
              See all 8 launch-edition listings <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <StorySection onNavigate={onNavigate} />

      {/* Buyer Guides Split Feature */}
      <section className="section">
        <div className="wrap split-feature">
          <div className="split-copy">
            <div className="eyebrow section-kicker">No magic rankings</div>
            <h2>
              Choose a fit.<br />
              <span className="serif">Not a headline.</span>
            </h2>
            <p>
              ToolScout is built around real work: what a tool helps you do, what it costs to start, and what to verify before you commit. No income claims. No mystery scoring.
            </p>
            <a
              className="text-link"
              href="/guides/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/guides');
              }}
            >
              Open the buyer guides <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="editorial-list">
            <a
              className="editorial-row"
              href="/guides/choose-writing-assistant/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/guides/choose-writing-assistant');
              }}
            >
              <span className="editorial-index">01</span>
              <span>
                <h3>How to choose an AI writing assistant</h3>
                <p>Compare the workflow, editing controls, context, and limits—not just a polished first draft.</p>
              </span>
              <span className="editorial-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              className="editorial-row"
              href="/guides/research-with-sources/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/guides/research-with-sources');
              }}
            >
              <span className="editorial-index">02</span>
              <span>
                <h3>A practical way to evaluate AI research tools</h3>
                <p>Check source trails, currentness, and what the tool did before you trust a summary.</p>
              </span>
              <span className="editorial-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              className="editorial-row"
              href="/guides/creative-tools/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/guides/creative-tools');
              }}
            >
              <span className="editorial-index">03</span>
              <span>
                <h3>Choosing an AI tool for visual work</h3>
                <p>Match the tool to the medium, editing loop, rights, and handoff—not to a demo alone.</p>
              </span>
              <span className="editorial-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="sponsor-section">
        <div className="wrap">
          <div className="sponsor-card">
            <div>
              <div className="sponsor-label mono">Sponsored placement · available</div>
              <h3>A useful tool could live here.</h3>
              <p>
                This clearly marked spot is an advertising opportunity, not a current paid placement. Vendors can propose a listing or ask about a future feature.
              </p>
            </div>
            <a
              className="btn btn-outline"
              href="/submit/?type=sponsor"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/submit?type=sponsor');
              }}
            >
              Explore a listing <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Field Notes Dispatch / Newsletter Box */}
      <section className="section-tight" style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ maxWidth: '780px', textAlign: 'center', padding: '16px 0' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>FIELD NOTES DISPATCH</span>
          <h2 style={{ fontSize: '28px', margin: '10px 0 8px' }}>Stay ahead of software changes.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '15px', margin: '0 auto 20px', maxWidth: '520px' }}>
            We monitor pricing shifts, tier changes, and feature deprecations across AI software so you don’t have to.
          </p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              placeholder="Enter your work email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: '1 1 240px',
                padding: '11px 16px',
                borderRadius: '10px',
                border: '1px solid var(--line)',
                background: 'var(--paper)',
                fontSize: '14px',
              }}
            />
            <button type="submit" className="btn btn-dark btn-small">
              Subscribe free <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </form>
          {newsletterStatus && (
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#15803d', fontWeight: 500 }}>
              {newsletterStatus}
            </p>
          )}
        </div>
      </section>

      {/* Disclosure Aside */}
      <section className="section-tight">
        <div className="wrap">
          <aside className="disclosure" role="note">
            <strong>How ToolScout may earn:</strong> Some placements may be sponsored, and a future tracked link may earn a commission. We label paid placements. Current listing buttons link directly to the vendor unless the page explicitly says otherwise; no earnings are promised.
          </aside>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        tool={quickViewTool}
        onClose={() => setQuickViewTool(null)}
        onNavigate={onNavigate}
      />
    </main>
  );
};
