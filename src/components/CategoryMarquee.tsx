import React, { useState } from 'react';
import { categories } from '../data';

interface CategoryMarqueeProps {
  onNavigate: (path: string) => void;
}

export const CategoryMarquee: React.FC<CategoryMarqueeProps> = ({ onNavigate }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(`/category/${id}`);
  };

  const renderItems = (isAriaHidden = false) => (
    <div className="marquee-group" aria-hidden={isAriaHidden ? 'true' : undefined}>
      {categories.map((cat, idx) => (
        <React.Fragment key={`${cat.id}-${idx}`}>
          <a
            className="marquee-item"
            href={`/category/${cat.id}/`}
            onClick={(e) => handleCategoryClick(e, cat.id)}
            tabIndex={isAriaHidden ? -1 : undefined}
          >
            {cat.label}
          </a>
          <span className="marquee-mark" aria-hidden="true">
            ✳
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`category-marquee ${isPaused ? 'is-paused' : ''}`}>
      <div className="marquee-heading">
        <span className="marquee-label mono" aria-hidden="true">
          BROWSE BY CATEGORY
        </span>
        <button
          type="button"
          className="marquee-toggle"
          aria-pressed={isPaused}
          aria-label="Toggle category ribbon motion"
          onClick={() => setIsPaused(prev => !prev)}
        >
          <span className="marquee-toggle-icon" aria-hidden="true">
            {isPaused ? '▶' : 'Ⅱ'}
          </span>
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>
      </div>

      <nav className="marquee-window" aria-label="Browse AI categories">
        <div className="marquee-track">
          {renderItems(false)}
          {renderItems(true)}
        </div>
      </nav>
    </div>
  );
};
