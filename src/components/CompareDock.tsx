import React from 'react';
import { useCompare } from '../context/CompareContext';

interface CompareDockProps {
  onNavigate: (path: string) => void;
}

export const CompareDock: React.FC<CompareDockProps> = ({ onNavigate }) => {
  const { selectedTools, clearCompare, removeCompare, feedback } = useCompare();

  if (selectedTools.length === 0) return null;

  const handleCompareClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="compare-dock" data-compare-dock>
      <div className="dock-inner wrap">
        <div className="dock-copy">
          <strong>
            <span>{selectedTools.length}</span> selected
          </strong>
          <div className="dock-items">
            {selectedTools.map(tool => (
              <span
                key={tool.id}
                className="pill pill-soft"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {tool.name}
                <button
                  type="button"
                  onClick={() => removeCompare(tool.id)}
                  aria-label={`Remove ${tool.name} from comparison`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    lineHeight: 1,
                    padding: 0,
                    color: 'inherit',
                    opacity: 0.7,
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          {feedback && <p>{feedback}</p>}
        </div>
        <div className="dock-actions">
          <button className="text-link" type="button" onClick={clearCompare}>
            Clear
          </button>
          <a
            className="btn btn-dark btn-small"
            href="/compare/"
            onClick={handleCompareClick}
          >
            Compare tools <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
