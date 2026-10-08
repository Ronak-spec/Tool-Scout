import React, { useState, useMemo, useEffect } from 'react';
import { tools, categories, useCases } from '../data';
import type { Tool } from '../types';
import { ToolCard } from '../components/ToolCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useBookmarks } from '../context/BookmarkContext';

interface ToolsPageProps {
  initialQuery?: string;
  initialCategory?: string;
  initialWorkflow?: string;
  initialPrice?: string;
  onNavigate: (path: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  initialQuery = '',
  initialCategory = '',
  initialWorkflow = '',
  initialPrice = '',
  onNavigate,
}) => {
  const { bookmarkedIds } = useBookmarks();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [pricing, setPricing] = useState(initialPrice);
  const [workflow, setWorkflow] = useState(initialWorkflow);
  const [platform, setPlatform] = useState('');
  const [sort, setSort] = useState('recommended');
  const [onlySaved, setOnlySaved] = useState(false);
  const [quickViewTool, setQuickViewTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (initialQuery !== undefined) setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (initialCategory !== undefined) setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialWorkflow !== undefined) setWorkflow(initialWorkflow);
  }, [initialWorkflow]);

  useEffect(() => {
    if (initialPrice !== undefined) setPricing(initialPrice);
  }, [initialPrice]);

  // Sync URL query parameters
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set('q', query.trim());
    if (category) next.set('category', category);
    if (pricing) next.set('price', pricing);
    if (workflow) next.set('use', workflow);
    if (platform) next.set('platform', platform);
    const suffix = next.toString() ? `?${next.toString()}` : '';
    window.history.replaceState(null, '', `/tools/${suffix}`);
  }, [query, category, pricing, workflow, platform]);

  const hasActiveFilters = Boolean(
    query || category || pricing || workflow || platform || sort !== 'recommended' || onlySaved
  );

  const handleResetFilters = () => {
    setQuery('');
    setCategory('');
    setPricing('');
    setWorkflow('');
    setPlatform('');
    setSort('recommended');
    setOnlySaved(false);
  };

  // Tool counts per category
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    categories.forEach(c => {
      map[c.id] = tools.filter(
        t => t.categoryKey === c.id || (t.extraCategories || []).includes(c.id)
      ).length;
    });
    return map;
  }, []);

  const filteredTools = useMemo(() => {
    const qLower = query.toLowerCase().trim();

    const matched = tools.filter(tool => {
      if (onlySaved && !bookmarkedIds.includes(tool.id)) {
        return false;
      }

      const catOk =
        !category ||
        tool.categoryKey === category ||
        (tool.extraCategories || []).includes(category);

      const priceOk = !pricing || tool.priceKey === pricing;

      const workflowOk = !workflow || (tool.useCases || []).includes(workflow);

      const platformOk = !platform || (tool.platforms || []).includes(platform);

      const queryOk =
        !qLower ||
        tool.name.toLowerCase().includes(qLower) ||
        tool.summary.toLowerCase().includes(qLower) ||
        tool.category.toLowerCase().includes(qLower) ||
        (tool.tags || []).some(t => t.toLowerCase().includes(qLower)) ||
        (tool.features || []).some(f => f.toLowerCase().includes(qLower)) ||
        tool.bestFor.toLowerCase().includes(qLower);

      return catOk && priceOk && workflowOk && platformOk && queryOk;
    });

    const sorted = [...matched];
    if (sort === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'price') {
      sorted.sort((a, b) => a.priceSort - b.priceSort || a.name.localeCompare(b.name));
    }

    return sorted;
  }, [query, category, pricing, workflow, platform, sort, onlySaved, bookmarkedIds]);

  return (
    <main id="main">
      <section className="directory-intro">
        <div className="wrap">
          <div className="eyebrow">Explore the field guide</div>
          <h1>Find your next tool.</h1>
          <p className="lede">
            Search the launch edition by what you do, how you work, and how a tool charges. Listings link to their makers.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              type="button"
              className={`pill ${!onlySaved ? 'pill-lime' : 'pill-soft'}`}
              onClick={() => setOnlySaved(false)}
              style={{ cursor: 'pointer', border: '1px solid var(--line)' }}
            >
              All tools ({tools.length})
            </button>
            <button
              type="button"
              className={`pill ${onlySaved ? 'pill-lime' : 'pill-soft'}`}
              onClick={() => setOnlySaved(true)}
              style={{ cursor: 'pointer', border: '1px solid var(--line)' }}
            >
              ★ Saved shortlist ({bookmarkedIds.length})
            </button>
          </div>
        </div>
      </section>

      <section className="wrap directory-layout">
        <div
          className="directory-toolbar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          {/* Search box with instant clear */}
          <div className="search-box" style={{ flex: '1 1 260px', position: 'relative' }}>
            <label className="sr-only" htmlFor="directory-search">Filter tools</label>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.3 4.3" />
            </svg>
            <input
              id="directory-search"
              className="search-input"
              placeholder="Filter by tool name, tag, or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                  fontSize: '14px',
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category filter */}
          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'var(--white)',
              fontSize: '14px',
            }}
          >
            <option value="">All categories ({tools.length})</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.label} ({categoryCounts[cat.id] || 0})
              </option>
            ))}
          </select>

          {/* Price filter */}
          <select
            className="filter-select"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            aria-label="Filter by pricing model"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'var(--white)',
              fontSize: '14px',
            }}
          >
            <option value="">All pricing models</option>
            <option value="free">Free / Freemium</option>
            <option value="paid">Paid subscription</option>
          </select>

          {/* Workflow filter */}
          <select
            className="filter-select"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            aria-label="Filter by workflow"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'var(--white)',
              fontSize: '14px',
            }}
          >
            <option value="">All workflows</option>
            {useCases.map(uc => (
              <option key={uc.id} value={uc.id}>
                {uc.label}
              </option>
            ))}
          </select>

          {/* Platform filter */}
          <select
            className="filter-select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            aria-label="Filter by platform"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'var(--white)',
              fontSize: '14px',
            }}
          >
            <option value="">All platforms</option>
            <option value="Web">Web</option>
          </select>

          {/* Sort */}
          <select
            className="filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort tools"
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: 'var(--white)',
              fontSize: '14px',
            }}
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="price">Sort: Price model</option>
          </select>

          {/* Counter and clear */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
            <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                className="text-link"
                onClick={handleResetFilters}
                style={{ fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Active filter badges / chips */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
            {query && (
              <span className="pill pill-soft" style={{ fontSize: '12px' }}>
                Search: "{query}"{' '}
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            )}
            {category && (
              <span className="pill pill-soft" style={{ fontSize: '12px' }}>
                Category: {categories.find(c => c.id === category)?.label}{' '}
                <button
                  type="button"
                  onClick={() => setCategory('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            )}
            {pricing && (
              <span className="pill pill-soft" style={{ fontSize: '12px' }}>
                Price: {pricing === 'free' ? 'Free / Freemium' : 'Paid'}{' '}
                <button
                  type="button"
                  onClick={() => setPricing('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            )}
            {workflow && (
              <span className="pill pill-soft" style={{ fontSize: '12px' }}>
                Workflow: {useCases.find(u => u.id === workflow)?.label}{' '}
                <button
                  type="button"
                  onClick={() => setWorkflow('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            )}
            {onlySaved && (
              <span className="pill pill-soft" style={{ fontSize: '12px' }}>
                Filter: Saved shortlist only{' '}
                <button
                  type="button"
                  onClick={() => setOnlySaved(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {filteredTools.length > 0 ? (
          <div className="tool-grid">
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                onNavigate={onNavigate}
                onQuickView={setQuickViewTool}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" data-empty-state>
            <div className="empty-icon" aria-hidden="true">⌕</div>
            <h3>No match on this pass.</h3>
            <p>
              {onlySaved
                ? "You haven't bookmarked any tools matching these criteria yet. Star a tool to add it to your shortlist!"
                : "Try another keyword or clear a filter. A useful list starts with the work you actually need done."}
            </p>
            <button
              className="btn btn-outline btn-small"
              type="button"
              onClick={handleResetFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        tool={quickViewTool}
        onClose={() => setQuickViewTool(null)}
        onNavigate={onNavigate}
      />

      {/* Disclosure Aside */}
      <section className="section-tight">
        <div className="wrap">
          <aside className="disclosure" role="note">
            <strong>How ToolScout may earn:</strong> Some placements may be sponsored, and a future tracked link may earn a commission. We label paid placements. Current listing buttons link directly to the vendor unless the page explicitly says otherwise; no earnings are promised.
          </aside>
        </div>
      </section>
    </main>
  );
};
