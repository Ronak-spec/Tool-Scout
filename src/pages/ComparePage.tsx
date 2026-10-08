import React, { useEffect, useState } from 'react';
import { tools } from '../data';
import { useCompare } from '../context/CompareContext';

interface ComparePageProps {
  initialToolsQuery?: string;
  onNavigate: (path: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ initialToolsQuery, onNavigate }) => {
  const { selectedTools, removeCompare, toggleCompare, clearCompare } = useCompare();
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialToolsQuery) {
      const toolIds = initialToolsQuery.split(',').map(s => s.trim()).filter(Boolean);
      toolIds.forEach(id => {
        if (tools.some(t => t.id === id)) {
          toggleCompare(id, true);
        }
      });
    }
  }, [initialToolsQuery]);

  const glyphClasses = ['', 'tool-glyph--orange', 'tool-glyph--blue', 'tool-glyph--green'];

  const rows = [
    { label: 'Best fit', getValue: (t: typeof tools[0]) => t.bestFor },
    { label: 'Category', getValue: (t: typeof tools[0]) => t.category },
    { label: 'Pricing model', getValue: (t: typeof tools[0]) => t.pricingModel },
    { label: 'What to know', getValue: (t: typeof tools[0]) => t.pricingNote },
    { label: 'Key capabilities', getValue: (t: typeof tools[0]) => (t.features || []).join(' · ') },
    { label: 'Platforms', getValue: (t: typeof tools[0]) => (t.platforms || ['Web']).join(', ') },
    { label: 'Tags', getValue: (t: typeof tools[0]) => (t.tags || []).join(' · ') },
  ];

  const handleCopyLink = () => {
    const ids = selectedTools.map(t => t.id).join(',');
    const url = `${window.location.origin}/compare?tools=${encodeURIComponent(ids)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main id="main" className="compare-page" data-compare-page>
      <div className="wrap">
        <div className="eyebrow">Decision desk / side by side</div>
        <h1>Compare the fit.</h1>
        <p className="lede">
          Select two or three tools from the directory. Compare best-fit use cases, pricing summaries, features, and platforms—not unsupported scores.
        </p>

        <aside className="disclosure" role="note" style={{ margin: '24px 0 32px' }}>
          <strong>How ToolScout may earn:</strong> Some placements may be sponsored, and a future tracked link may earn a commission. We label paid placements. Current listing buttons link directly to the vendor unless the page explicitly says otherwise; no earnings are promised.
        </aside>

        {selectedTools.length >= 2 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="pill pill-soft"
                  onClick={handleCopyLink}
                  style={{ cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--white)' }}
                >
                  {copiedLink ? '✓ Link copied!' : '🔗 Share comparison link'}
                </button>
                <button
                  type="button"
                  className="pill pill-soft"
                  onClick={handlePrint}
                  style={{ cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--white)' }}
                >
                  🖨 Print / PDF
                </button>
              </div>

              <button
                type="button"
                className="text-link"
                onClick={clearCompare}
                style={{ fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear all comparisons
              </button>
            </div>

            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '180px' }}>Compare</th>
                    {selectedTools.map((tool) => {
                      const idx = tools.findIndex(t => t.id === tool.id);
                      const glyphStyle = glyphClasses[idx % 4];
                      const glyphText = tool.mark || tool.name.slice(0, 2).toUpperCase();

                      return (
                        <th key={tool.id} scope="col">
                          <span className="tool-heading">
                            <span className={`tool-glyph ${glyphStyle}`} aria-hidden="true">
                              {glyphText}
                            </span>
                            <span>{tool.name}</span>
                          </span>
                          <br />
                          <button
                            type="button"
                            className="compare-remove"
                            onClick={() => removeCompare(tool.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--muted)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              marginTop: '8px',
                              textDecoration: 'underline',
                            }}
                          >
                            Remove
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ label, getValue }) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {selectedTools.map((tool) => (
                        <td key={tool.id}>{getValue(tool) || '—'}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Official site</th>
                    {selectedTools.map((tool) => (
                      <td key={tool.id}>
                        <a
                          className="text-link"
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit {tool.name} ↗
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {selectedTools.length < 3 && (
              <div style={{ marginTop: '36px', padding: '24px', background: 'var(--card)', borderRadius: 'var(--radius)' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '18px' }}>Add a 3rd tool to compare</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tools
                    .filter(t => !selectedTools.some(st => st.id === t.id))
                    .map(t => (
                      <button
                        key={t.id}
                        type="button"
                        className="pill pill-soft"
                        onClick={() => toggleCompare(t.id, true)}
                        style={{ cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--white)' }}
                      >
                        + Add {t.name}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state" data-compare-empty style={{ marginTop: '24px' }}>
            <div className="empty-icon" aria-hidden="true">⇄</div>
            <h3>Choose up to three tools to compare.</h3>
            <p>
              {selectedTools.length === 1
                ? `You have selected ${selectedTools[0].name}. Select at least one more tool to see a side-by-side comparison.`
                : 'Select two or three tools from the directory to see their capabilities, fit, and pricing side by side.'}
            </p>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="mono">
                Quick pick tools:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto 24px' }}>
                {tools.map(tool => {
                  const isChecked = selectedTools.some(st => st.id === tool.id);
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      className={`pill ${isChecked ? 'pill-lime' : 'pill-soft'}`}
                      onClick={() => toggleCompare(tool.id)}
                      style={{ cursor: 'pointer', border: '1px solid var(--line)' }}
                    >
                      {isChecked ? `✓ ${tool.name}` : `+ ${tool.name}`}
                    </button>
                  );
                })}
              </div>

              <a
                className="btn btn-outline"
                href="/tools/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/tools');
                }}
              >
                Browse directory <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
