import React from 'react';

interface DisclosurePageProps {
  onNavigate: (path: string) => void;
}

export const DisclosurePage: React.FC<DisclosurePageProps> = ({ onNavigate }) => {
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
            <span>Disclosure</span>
          </nav>

          <div className="eyebrow">How the directory may be funded</div>
          <h1>Our disclosure policy.</h1>
          <p className="lede">
            Trust is part of the product. Here is how ToolScout plans to support itself without disguising advertising as advice.
          </p>
        </div>
      </section>

      <article className="wrap guide-body" style={{ maxWidth: '820px', margin: '40px auto 60px' }}>
        <h2>Sponsored placements</h2>
        <p>
          Paid placements will always carry a visible sponsored label directly on or next to the placement itself. A paid placement will never be represented as an independent editorial pick or organic ranking.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some outbound vendor links may include referral tracking parameters that earn ToolScout a commission if you make a purchase or subscribe to a paid tier. Where active, these are explicitly labeled as affiliate links. Current launch-edition profile buttons link directly to official vendors without tracking unless noted.
        </p>

        <h2>Editorial independence</h2>
        <p>
          ToolScout is organized around real workflows, not pay-to-play rankings or opaque scoring algorithms. Inclusion in the directory, editor picks, and field guide recommendations are chosen for variety, capability, and relevance to everyday work.
        </p>

        <h2>Pricing &amp; feature accuracy</h2>
        <p>
          AI software evolves rapidly. Pricing models, usage tiers, trial limits, and model access are subject to frequent updates by vendors. ToolScout summarizes the terms published at the time of review, but we strongly encourage all users to verify details directly on the maker’s official pricing page before purchasing.
        </p>

        <div style={{ padding: '24px', background: 'var(--card)', borderRadius: 'var(--radius)', marginTop: '40px' }}>
          <h3 style={{ margin: '0 0 10px' }}>Notice an outdated listing?</h3>
          <p style={{ margin: '0 0 16px', fontSize: '15px' }}>
            Vendors and users can suggest updates, report broken links, or submit corrections at any time.
          </p>
          <a
            className="btn btn-outline btn-small"
            href="/submit/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/submit');
            }}
          >
            Submit an update →
          </a>
        </div>
      </article>
    </main>
  );
};
