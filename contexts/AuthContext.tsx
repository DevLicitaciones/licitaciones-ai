import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  type Session,
  type User,
  type Profile,
  type SignInResult,
  type SignUpInput,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  subscribe,
  updateProfile as authUpdateProfile,
  mapProfile,
} from '../lib/auth';
import { supabase } from '../lib/supabase';
import type { PlanName } from '../lib/plans';

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  /** Conveniencia: plan del perfil actual. */
  plan: PlanName | null;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signUp: (input: SignUpInput) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
  /** Re-lee el profile desde la DB. Útil después de un UPDATE manual. */
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    const unsub = subscribe((s) => {
      setSession(s);
      // Cerramos el loading en cuanto recibimos el primer estado (sea sesión o null).
      if (!initialized.current) {
        initialized.current = true;
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    return authSignIn(email, password);
  }, []);

  const signUp = useCallback((input: SignUpInput) => {
    return authSignUp(input);
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
  }, []);

  const updateProfile = useCallback(async (patch: Partial<Profile>) => {
    const updated = await authUpdateProfile(patch);
    if (updated) {
      // Actualización optimista local; la próxima onAuthStateChange (si la hay) re-validará.
      setSession((prev) => (prev ? { ...prev, profile: updated } : prev));
    }
  }, []);

  const refresh = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const supaUser = sessionData.session?.user;
    if (!supaUser) {
      setSession(null);
      return;
    }
    const { data: profileRow, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supaUser.id)
      .maybeSingle();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[auth] refresh: error leyendo profile:', error.message);
      return;
    }
    if (profileRow) {
      setSession({
        user: {
          id: supaUser.id,
          email: supaUser.email ?? '',
          createdAt: supaUser.created_at,
        },
        profile: mapProfile(profileRow),
      });
    }
  }, []);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    profile: session?.profile ?? null,
    plan: session?.profile.plan ?? null,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
