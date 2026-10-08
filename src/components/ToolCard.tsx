import React from 'react';
import type { Tool } from '../types';
import { useCompare } from '../context/CompareContext';
import { useBookmarks } from '../context/BookmarkContext';

interface ToolCardProps {
  tool: Tool;
  index: number;
  compact?: boolean;
  onNavigate: (path: string) => void;
  onQuickView?: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  index,
  compact = false,
  onNavigate,
  onQuickView,
}) => {
  const { selectedIds, toggleCompare } = useCompare();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const isSelected = selectedIds.includes(tool.id);
  const bookmarked = isBookmarked(tool.id);

  const glyphClasses = ['', 'tool-glyph--orange', 'tool-glyph--blue', 'tool-glyph--green'];
  const glyphStyle = glyphClasses[index % 4];
  const glyphText = tool.mark || tool.name.slice(0, 2).toUpperCase();

  const tagsToShow = (tool.tags || []).slice(0, compact ? 2 : 3);
  const vendorUrl = tool.affiliateUrl || tool.url;
  const isAffiliate = Boolean(tool.affiliateUrl);
  const rel = isAffiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';
  const disclosureText = isAffiliate ? 'Affiliate link' : 'Direct link';

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(`/tools/${tool.id}`);
  };

  return (
    <article
      className="tool-card"
      data-tool-card
      data-id={tool.id}
      data-category={tool.categoryKey || 'other'}
    >
      <div className="tool-card-top">
        <div className="tool-heading">
          <span className={`tool-glyph ${glyphStyle}`} aria-hidden="true">
            {glyphText}
          </span>
          <div>
            <h3>
              <a href={`/tools/${tool.id}/`} onClick={handleProfileClick}>
                {tool.name}
              </a>
            </h3>
            <div className="tool-category">{tool.category}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {tool.sponsored && tool.sponsorshipLabel && (
            <span className="sponsor-tag">{tool.sponsorshipLabel}</span>
          )}
          <button
            type="button"
            onClick={() => toggleBookmark(tool.id)}
            title={bookmarked ? 'Remove from saved shortlist' : 'Save to shortlist'}
            aria-label={bookmarked ? `Remove ${tool.name} from saved` : `Save ${tool.name}`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '2px 4px',
              color: bookmarked ? '#d97706' : 'var(--muted)',
              lineHeight: 1,
            }}
          >
            {bookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      <p className="tool-description">{tool.summary}</p>

      <div className="tool-tags">
        {tagsToShow.map(tag => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="tool-card-footer">
        <span className="pricing-note">
          {tool.pricingModel} · {tool.platforms?.[0] || 'Web'}
        </span>
        <label className="compare-check">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => toggleCompare(tool.id, e.target.checked)}
            aria-label={`Compare ${tool.name}`}
          />
          <span>Compare</span>
        </label>
      </div>

      <div className="tool-card-actions">
        <a href={`/tools/${tool.id}/`} onClick={handleProfileClick}>
          View profile <span aria-hidden="true">↗</span>
        </a>
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(tool)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              fontSize: '13px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Quick view
          </button>
        )}
        <a href={vendorUrl} target="_blank" rel={rel}>
          Visit vendor
        </a>
        <span className="affiliate-mini">{disclosureText}</span>
      </div>
    </article>
  );
};
