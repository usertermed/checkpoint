'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider, useAuth } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from './non-blocking-login';
import { Auth, onAuthStateChanged } from 'firebase/auth';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

function AuthHandler({ auth }: { auth: Auth }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        initiateAnonymousSignIn(auth);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return null;
}

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    return initializeFirebase();
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      <AuthHandler auth={firebaseServices.auth} />
      {children}
    </FirebaseProvider>
  );
}
