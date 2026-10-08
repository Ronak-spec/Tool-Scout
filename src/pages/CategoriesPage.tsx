import React from 'react';
import { categories, tools } from '../data';
import { ToolCard } from '../components/ToolCard';

interface CategoriesPageProps {
  currentCategorySlug?: string;
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ currentCategorySlug, onNavigate }) => {
  const currentCategory = currentCategorySlug
    ? categories.find(c => c.id === currentCategorySlug)
    : null;

  if (currentCategory) {
    const matchingTools = tools.filter(
      t =>
        t.categoryKey === currentCategory.id ||
        (t.extraCategories || []).includes(currentCategory.id)
    );

    return (
      <main id="main">
        <section className="category-hero">
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
              <a
                href="/categories/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/categories');
                }}
              >
                Categories
              </a>
              <span aria-hidden="true">/</span>
              <span>{currentCategory.label}</span>
            </nav>

            <div className="eyebrow">Category field guide / {currentCategory.id}</div>
            <h1>{currentCategory.headline}</h1>
            <p className="lede">{currentCategory.description}</p>
          </div>
        </section>

        <section className="wrap category-tools" style={{ paddingBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span className="mono" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {matchingTools.length} {matchingTools.length === 1 ? 'tool' : 'tools'} listed in this category
            </span>
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

          <div className="tool-grid">
            {matchingTools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }

  // All categories view
  return (
    <main id="main">
      <section className="category-hero">
        <div className="wrap">
          <div className="eyebrow">Browse the directory</div>
          <h1>Choose your lane.</h1>
          <p className="lede">Start with the job you want done, then compare the tools that fit.</p>
        </div>
      </section>

      <section className="wrap category-tools" style={{ paddingBottom: '60px' }}>
        <div className="category-rail">
          {categories.map((cat, idx) => (
            <a
              key={cat.id}
              className={`category-tile category-tile--${cat.id}`}
              href={`/category/${cat.id}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/category/${cat.id}`);
              }}
            >
              <span className="category-code mono">CATEGORY 0{idx + 1}</span>
              <span className="category-arrow" aria-hidden="true">↗</span>
              <span className="category-title">{cat.label}</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '54px' }}>
          <h2 style={{ marginBottom: '24px' }}>Explore tools by category</h2>
          {categories.map(cat => {
            const catTools = tools.filter(
              t => t.categoryKey === cat.id || (t.extraCategories || []).includes(cat.id)
            );
            if (catTools.length === 0) return null;

            return (
              <div key={cat.id} style={{ marginBottom: '44px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '22px' }}>
                    <a
                      href={`/category/${cat.id}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/category/${cat.id}`);
                      }}
                    >
                      {cat.label}
                    </a>
                  </h3>
                  <a
                    className="text-link"
                    href={`/category/${cat.id}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/category/${cat.id}`);
                    }}
                  >
                    View category ({catTools.length}) →
                  </a>
                </div>
                <div className="tool-grid">
                  {catTools.map((tool, idx) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      index={idx}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
