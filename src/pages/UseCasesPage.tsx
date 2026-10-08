import React from 'react';
import { useCases, tools } from '../data';
import { ToolCard } from '../components/ToolCard';

interface UseCasesPageProps {
  currentUseCaseSlug?: string;
  onNavigate: (path: string) => void;
}

export const UseCasesPage: React.FC<UseCasesPageProps> = ({ currentUseCaseSlug, onNavigate }) => {
  const currentUseCase = currentUseCaseSlug
    ? useCases.find(u => u.id === currentUseCaseSlug)
    : null;

  if (currentUseCase) {
    const matchingTools = tools.filter(t => (t.useCases || []).includes(currentUseCase.id));

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
                href="/use-cases/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/use-cases');
                }}
              >
                Workflows
              </a>
              <span aria-hidden="true">/</span>
              <span>{currentUseCase.label}</span>
            </nav>

            <div className="eyebrow">Workflow finder</div>
            <h1>{currentUseCase.headline}</h1>
            <p className="lede">{currentUseCase.description}</p>
          </div>
        </section>

        <section className="wrap category-tools" style={{ paddingBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span className="mono" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {matchingTools.length} {matchingTools.length === 1 ? 'tool' : 'tools'} supporting this workflow
            </span>
            <a
              className="text-link"
              href="/use-cases/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/use-cases');
              }}
            >
              All workflows <span aria-hidden="true">→</span>
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

  // All workflows view
  return (
    <main id="main">
      <section className="category-hero">
        <div className="wrap">
          <div className="eyebrow">Browse by workflow</div>
          <h1>Start with the work.</h1>
          <p className="lede">
            Pick a task, explore tools with a relevant starting point, and compare current terms with the maker.
          </p>
        </div>
      </section>

      <section className="wrap category-tools" style={{ paddingBottom: '60px' }}>
        <div className="workflow-list">
          {useCases.map((uc, idx) => (
            <a
              key={uc.id}
              className="workflow-link"
              href={`/use-case/${uc.id}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/use-case/${uc.id}`);
              }}
            >
              <span className="mono">0{idx + 1}</span>
              <span>{uc.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '54px' }}>
          <h2 style={{ marginBottom: '24px' }}>Tools organized by task</h2>
          {useCases.map(uc => {
            const matched = tools.filter(t => (t.useCases || []).includes(uc.id));
            if (matched.length === 0) return null;

            return (
              <div key={uc.id} style={{ marginBottom: '44px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '22px' }}>
                    <a
                      href={`/use-case/${uc.id}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/use-case/${uc.id}`);
                      }}
                    >
                      {uc.label}
                    </a>
                  </h3>
                  <a
                    className="text-link"
                    href={`/use-case/${uc.id}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/use-case/${uc.id}`);
                    }}
                  >
                    View workflow ({matched.length}) →
                  </a>
                </div>
                <div className="tool-grid">
                  {matched.map((tool, idx) => (
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
