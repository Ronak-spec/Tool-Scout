import React, { useEffect } from 'react';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { useBookmarks } from '../context/BookmarkContext';

interface QuickViewModalProps {
  tool: Tool | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ tool, onClose, onNavigate }) => {
  const { selectedIds, toggleCompare } = useCompare();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (tool) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tool, onClose]);

  if (!tool) return null;

  const isSelected = selectedIds.includes(tool.id);
  const bookmarked = isBookmarked(tool.id);
  const vendorLink = tool.affiliateUrl || tool.url;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(23, 26, 30, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '28px 32px',
          boxShadow: '0 24px 50px rgba(0,0,0,0.22)',
          border: '1px solid var(--line)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <span
            className="tool-glyph"
            style={{ width: '48px', height: '48px', fontSize: '15px' }}
            aria-hidden="true"
          >
            {tool.mark || tool.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="eyebrow" style={{ fontSize: '11px', color: 'var(--muted)' }}>
              {tool.category}
            </div>
            <h2 style={{ margin: '2px 0 0', fontSize: '24px' }}>{tool.name}</h2>
          </div>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--ink)', marginBottom: '20px' }}>
          {tool.summary}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h4 className="mono" style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
            KEY CAPABILITIES
          </h4>
          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            {tool.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '11px', color: 'var(--muted)' }}>
              PRICING MODEL
            </span>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>{tool.pricingModel}</span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--muted)', lineHeight: '1.5' }}>
            {tool.pricingNote}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <a
            className="btn btn-dark btn-small"
            href={vendorLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit official vendor ↗
          </a>
          <button
            type="button"
            className="btn btn-outline btn-small"
            onClick={() => {
              onClose();
              onNavigate(`/tools/${tool.id}`);
            }}
          >
            Full profile page
          </button>
          <label className="compare-check pill pill-soft" style={{ cursor: 'pointer', margin: 0 }}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => toggleCompare(tool.id, e.target.checked)}
            />
            <span>{isSelected ? 'In comparison' : 'Compare'}</span>
          </label>
          <button
            type="button"
            className={`pill ${bookmarked ? 'pill-lime' : 'pill-soft'}`}
            onClick={() => toggleBookmark(tool.id)}
            style={{ cursor: 'pointer', border: '1px solid var(--line)' }}
          >
            {bookmarked ? '★ Saved to shortlist' : '☆ Save to shortlist'}
          </button>
        </div>
      </div>
    </div>
  );
};
