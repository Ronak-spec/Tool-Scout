import React, { createContext, useContext, useState, useEffect } from 'react';
import { tools } from '../data';
import type { Tool } from '../types';

interface CompareContextType {
  selectedIds: string[];
  selectedTools: Tool[];
  toggleCompare: (id: string, forceState?: boolean) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  feedback: string | null;
  setFeedback: (msg: string | null) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const COMPARE_STORAGE_KEY = 'toolscout:compare';

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(id => tools.some(t => t.id === id)).slice(0, 3);
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selectedIds));
    } catch {
      // ignore
    }
  }, [selectedIds]);

  const toggleCompare = (id: string, forceState?: boolean) => {
    setSelectedIds(prev => {
      const isCurrentlySelected = prev.includes(id);
      const shouldSelect = forceState !== undefined ? forceState : !isCurrentlySelected;

      if (shouldSelect) {
        if (isCurrentlySelected) return prev;
        if (prev.length >= 3) {
          setFeedback('Compare up to three tools at a time. Remove one to add another.');
          return prev;
        }
        const updated = [...prev, id];
        setFeedback(
          `${updated.length} ${updated.length === 1 ? 'tool' : 'tools'} selected. Open the comparison to continue.`
        );
        return updated;
      } else {
        if (!isCurrentlySelected) return prev;
        const updated = prev.filter(item => item !== id);
        setFeedback(
          updated.length
            ? `${updated.length} ${updated.length === 1 ? 'tool' : 'tools'} selected. Open the comparison to continue.`
            : 'Choose up to three tools to compare.'
        );
        return updated;
      }
    });
  };

  const removeCompare = (id: string) => {
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const clearCompare = () => {
    setSelectedIds([]);
    setFeedback('Comparison cleared.');
  };

  const selectedTools = selectedIds
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        selectedTools,
        toggleCompare,
        removeCompare,
        clearCompare,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
