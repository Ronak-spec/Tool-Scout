import React, { useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedIds } = useCompare();
  const { user, isSigningIn, authError, signInWithGoogle, signOut, clearAuthError } = useAuth();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrent = (pathPrefix: string) => {
    if (pathPrefix === '/' && currentPath === '/') return true;
    if (pathPrefix !== '/' && currentPath.startsWith(pathPrefix)) return true;
    return false;
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap nav-wrap">
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

          <nav
            className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}
            data-main-nav
            aria-label="Main navigation"
          >
            <a
              href="/tools/"
              onClick={(e) => handleLinkClick(e, '/tools')}
              aria-current={isCurrent('/tools') ? 'page' : undefined}
            >
              Explore tools
            </a>
            <a
              href="/categories/"
              onClick={(e) => handleLinkClick(e, '/categories')}
              aria-current={isCurrent('/category') ? 'page' : undefined}
            >
              Categories
            </a>
            <a
              href="/use-cases/"
              onClick={(e) => handleLinkClick(e, '/use-cases')}
              aria-current={isCurrent('/use-case') ? 'page' : undefined}
            >
              By workflow
            </a>
            <a
              href="/guides/"
              onClick={(e) => handleLinkClick(e, '/guides')}
              aria-current={isCurrent('/guides') ? 'page' : undefined}
            >
              Guides
            </a>
            <a
              href="/submit/"
              onClick={(e) => handleLinkClick(e, '/submit')}
              aria-current={isCurrent('/submit') ? 'page' : undefined}
            >
              Submit a tool
            </a>
          </nav>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--line)',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'var(--signal)',
                      color: 'var(--signal-ink)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '11px',
                      fontFamily: 'var(--mono)',
                      fontWeight: 600,
                    }}
                  >
                    {(user.displayName || user.email || 'U').slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  className="hide-mobile"
                >
                  {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-link"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--muted)',
                  }}
                  title="Sign out of account"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={isSigningIn}
                className="btn btn-outline btn-small"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  cursor: isSigningIn ? 'wait' : 'pointer',
                }}
              >
                {/* Google G Icon */}
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isSigningIn ? 'Connecting...' : 'Sign in'}</span>
              </button>
            )}

            <a
              className="nav-compare"
              href="/compare/"
              onClick={(e) => handleLinkClick(e, '/compare')}
              aria-label="Open tool comparison"
            >
              <span aria-hidden="true">⇄</span>
              <span className="nav-compare-text">Compare</span>
              {selectedIds.length > 0 && (
                <span className="nav-count" data-compare-count>
                  {selectedIds.length}
                </span>
              )}
            </a>

            <button
              className="menu-toggle"
              data-menu-toggle
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Auth Error Banner / Guidance */}
      {authError && (
        <div
          style={{
            background: '#fef2f2',
            borderBottom: '1px solid #fecaca',
            color: '#991b1b',
            padding: '12px 20px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span>{authError}</span>
          </div>
          <button
            type="button"
            onClick={clearAuthError}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#991b1b',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
