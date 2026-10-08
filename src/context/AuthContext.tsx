import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSigningIn: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const signInWithGoogle = async () => {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      setAuthError(null);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.warn('Firebase Auth error:', firebaseError);

      if (firebaseError?.code === 'auth/operation-not-allowed') {
        setAuthError(
          'Google Sign-In is not enabled yet in your Firebase console. Please go to Firebase Console > Authentication > Sign-in method, select Google, toggle Enable, and click Save.'
        );
      } else if (firebaseError?.code === 'auth/unauthorized-domain') {
        const currentDomain = window.location.hostname;
        setAuthError(
          `Domain "${currentDomain}" is not authorized. Please add "${currentDomain}" in Firebase Console > Authentication > Settings > Authorized domains.`
        );
      } else if (firebaseError?.code === 'auth/popup-blocked') {
        setAuthError(
          'The sign-in popup was blocked by your browser. Please allow popups for this page and try clicking Sign In again.'
        );
      } else if (firebaseError?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed before completing. Click Sign In again when ready.');
      } else if (firebaseError?.code === 'auth/cancelled-popup-request') {
        // Ignorable conflict
      } else {
        setAuthError(
          firebaseError?.message || 'Failed to complete Google Sign-In. Please check your Firebase configuration.'
        );
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setAuthError(null);
    } catch (err) {
      console.warn('Sign out failed:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSigningIn,
        authError,
        signInWithGoogle,
        signOut,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
