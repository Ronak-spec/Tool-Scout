import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              className="brand"
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              aria-label="ToolScout home"
            >
              <span className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="8" cy="16" r="3.2" stroke="#171a1e" strokeWidth="1.7" />
                  <path
                    d="M8 16 16.7 7.3M11.5 7.3h5.2v5.2"
                    stroke="#171a1e"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8" cy="16" r="1" fill="#171a1e" />
                </svg>
              </span>
              <span className="brand-word">
                tool<span>scout</span>
              </span>
            </a>
            <p>A practical field guide to AI software. Compare what matters; check the details with the maker.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="/tools/" onClick={(e) => handleLinkClick(e, '/tools')}>
              All tools
            </a>
            <a href="/categories/" onClick={(e) => handleLinkClick(e, '/categories')}>
              Categories
            </a>
            <a href="/use-cases/" onClick={(e) => handleLinkClick(e, '/use-cases')}>
              By workflow
            </a>
            <a href="/guides/" onClick={(e) => handleLinkClick(e, '/guides')}>
              Buyer guides
            </a>
            <a href="/submit/" onClick={(e) => handleLinkClick(e, '/submit')}>
              Submit a listing
            </a>
            <a href="/disclosure/" onClick={(e) => handleLinkClick(e, '/disclosure')}>
              Disclosure
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© <span data-year>{currentYear}</span> ToolScout. Independent directory concept.</span>
          <span>Pricing and features can change. Confirm directly with each vendor.</span>
        </div>
      </div>
    </footer>
  );
};
