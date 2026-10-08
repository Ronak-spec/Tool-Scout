import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { tools } from '../data';
import type { Tool } from '../types';

interface BookmarkContextType {
  bookmarkedIds: string[];
  bookmarkedTools: Tool[];
  toggleBookmark: (id: string) => Promise<void>;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
const BOOKMARKS_STORAGE_KEY = 'toolscout:bookmarks';

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(id => tools.some(t => t.id === id));
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Load from Firebase when user logs in
  useEffect(() => {
    if (!user) return;
    const fetchRemoteBookmarks = async () => {
      try {
        const snap = await getDocs(collection(db, 'users', user.uid, 'savedTools'));
        const remoteIds = snap.docs.map(d => d.id).filter(id => tools.some(t => t.id === id));
        if (remoteIds.length > 0) {
          setBookmarkedIds(prev => Array.from(new Set([...prev, ...remoteIds])));
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/savedTools`);
      }
    };
    fetchRemoteBookmarks();
  }, [user]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = async (id: string) => {
    const isCurrently = bookmarkedIds.includes(id);
    const updated = isCurrently
      ? bookmarkedIds.filter(item => item !== id)
      : [...bookmarkedIds, id];

    setBookmarkedIds(updated);

    // Sync to Firestore if authenticated
    if (user) {
      const path = `users/${user.uid}/savedTools/${id}`;
      try {
        if (isCurrently) {
          await deleteDoc(doc(db, 'users', user.uid, 'savedTools', id));
        } else {
          await setDoc(doc(db, 'users', user.uid, 'savedTools', id), {
            toolId: id,
            savedAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, isCurrently ? OperationType.DELETE : OperationType.WRITE, path);
      }
    }
  };

  const clearBookmarks = async () => {
    setBookmarkedIds([]);
    if (user) {
      try {
        const snap = await getDocs(collection(db, 'users', user.uid, 'savedTools'));
        for (const docSnap of snap.docs) {
          await deleteDoc(docSnap.ref);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/savedTools`);
      }
    }
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  const bookmarkedTools = bookmarkedIds
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedTools,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
