import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompareDock } from './components/CompareDock';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { ComparePage } from './pages/ComparePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { GuidesPage } from './pages/GuidesPage';
import { SubmitPage } from './pages/SubmitPage';
import { DisclosurePage } from './pages/DisclosurePage';

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(() => {
    return window.location.pathname + window.location.search;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    let target = to;
    if (!target.startsWith('/')) {
      target = '/' + target;
    }
    window.history.pushState(null, '', target);
    setCurrentUrl(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path and query
  const [path, queryString] = currentUrl.split('?');
  const cleanPath = path.replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(queryString || '');

  let pageContent: React.ReactNode = null;

  if (cleanPath === '/') {
    pageContent = <HomePage onNavigate={navigate} />;
  } else if (cleanPath === '/tools') {
    pageContent = (
      <ToolsPage
        initialQuery={searchParams.get('q') || ''}
        initialCategory={searchParams.get('category') || ''}
        initialWorkflow={searchParams.get('use') || ''}
        initialPrice={searchParams.get('price') || ''}
        onNavigate={navigate}
      />
    );
  } else if (cleanPath.startsWith('/tools/')) {
    const toolId = cleanPath.replace('/tools/', '').split('/')[0];
    pageContent = <ToolDetailPage toolId={toolId} onNavigate={navigate} />;
  } else if (cleanPath === '/compare') {
    pageContent = (
      <ComparePage
        initialToolsQuery={searchParams.get('tools') || undefined}
        onNavigate={navigate}
      />
    );
  } else if (cleanPath === '/categories') {
    pageContent = <CategoriesPage onNavigate={navigate} />;
  } else if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '').split('/')[0];
    pageContent = <CategoriesPage currentCategorySlug={slug} onNavigate={navigate} />;
  } else if (cleanPath === '/use-cases') {
    pageContent = <UseCasesPage onNavigate={navigate} />;
  } else if (cleanPath.startsWith('/use-case/')) {
    const slug = cleanPath.replace('/use-case/', '').split('/')[0];
    pageContent = <UseCasesPage currentUseCaseSlug={slug} onNavigate={navigate} />;
  } else if (cleanPath === '/guides') {
    pageContent = <GuidesPage onNavigate={navigate} />;
  } else if (cleanPath.startsWith('/guides/')) {
    const guideId = cleanPath.replace('/guides/', '').split('/')[0];
    pageContent = <GuidesPage currentGuideId={guideId} onNavigate={navigate} />;
  } else if (cleanPath === '/submit') {
    pageContent = (
      <SubmitPage
        initialType={searchParams.get('type') || 'editorial'}
        onNavigate={navigate}
      />
    );
  } else if (cleanPath === '/disclosure') {
    pageContent = <DisclosurePage onNavigate={navigate} />;
  } else {
    // Default fallback
    pageContent = <HomePage onNavigate={navigate} />;
  }

  return (
    <AuthProvider>
      <BookmarkProvider>
        <CompareProvider>
          <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <a href="#main" className="skip-link">
              Skip to main content
            </a>
            <Header currentPath={cleanPath} onNavigate={navigate} />
            <div style={{ flex: '1 0 auto' }}>{pageContent}</div>
            <Footer onNavigate={navigate} />
            <CompareDock onNavigate={navigate} />
          </div>
        </CompareProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}
