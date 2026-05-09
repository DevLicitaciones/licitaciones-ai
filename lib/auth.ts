// Capa de auth para el panel de cliente — implementación REAL contra Supabase.
//
// Mantiene la misma interfaz pública que la versión mock previa (`User`, `Profile`,
// `Session`, `getCurrentSession`, `signIn`, `signOut`, `subscribe`, `updateProfile`)
// para que `AuthContext` no necesite cambiar.

import type { Session as SupabaseSession, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, type ProfileRow } from './supabase';
import type { PlanName } from './plans';

// ---- Tipos públicos ----
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  rut: string;
  industry: string;
  region: string;
  email: string;
  phone: string;
  fiscalAddress: string;
  plan: PlanName;
  subscriptionStatus: string;
  creditsApi: number;
  billingCycle: 'monthly' | 'annual';
  createdAt: string;
}

export interface Session {
  user: User;
  profile: Profile;
}

// ---- Mapeos DB <-> tipos públicos ----
function mapUser(u: SupabaseUser): User {
  return {
    id: u.id,
    email: u.email ?? '',
    createdAt: u.created_at,
  };
}

function normalizePlan(raw: string | null | undefined): PlanName {
  // Acepta 'Básico'/'Pro'/'Enterprise' y variantes comunes.
  const v = (raw ?? '').trim();
  if (!v) return 'Básico';
  const lower = v.toLowerCase();
  if (lower.startsWith('enter')) return 'Enterprise';
  if (lower === 'pro' || lower.startsWith('plan pro')) return 'Pro';
  return 'Básico';
}

function mapProfile(row: ProfileRow): Profile {
  return {
    userId: row.id,
    firstName: row.first_name ?? '',
    lastName: row.last_name ?? '',
    companyName: row.company_name ?? '',
    rut: row.rut ?? '',
    industry: row.industry ?? '',
    region: row.location ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    fiscalAddress: row.fiscal_address ?? '',
    plan: normalizePlan(row.plan),
    subscriptionStatus: row.subscription_status ?? 'trial',
    creditsApi: row.credits_api ?? 0,
    billingCycle: 'annual',
    createdAt: row.created_at,
  };
}

// ---- Carga de profile + ensamblado de sesión ----
const PROFILE_FETCH_TIMEOUT_MS = 5000;

async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  // Timeout defensivo: si la red está caída, RLS bloquea o Supabase no responde,
  // no queremos que el panel se cuelgue en un spinner infinito.
  const fetchPromise = supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('[auth] Error cargando profile:', error.message);
        return null;
      }
      return data;
    });

  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn(
        `[auth] Timeout (${PROFILE_FETCH_TIMEOUT_MS}ms) cargando profile. ` +
          'Renderizando con datos mínimos. Verificá conectividad y env vars.'
      );
      resolve(null);
    }, PROFILE_FETCH_TIMEOUT_MS)
  );

  try {
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[auth] Excepción cargando profile:', e);
    return null;
  }
}

function buildMinimalProfile(supaSession: SupabaseSession): Profile {
  return {
    userId: supaSession.user.id,
    firstName: '',
    lastName: '',
    companyName: '',
    rut: '',
    industry: '',
    region: '',
    email: supaSession.user.email ?? '',
    phone: '',
    fiscalAddress: '',
    plan: 'Básico',
    subscriptionStatus: 'trial',
    creditsApi: 0,
    billingCycle: 'annual',
    createdAt: supaSession.user.created_at,
  };
}

async function buildSession(supaSession: SupabaseSession | null): Promise<Session | null> {
  if (!supaSession?.user) return null;
  const profileRow = await fetchProfile(supaSession.user.id);
  if (!profileRow) {
    // Auth ok pero sin fila en profiles (o timeout) → perfil mínimo para no colgar el panel.
    return {
      user: mapUser(supaSession.user),
      profile: buildMinimalProfile(supaSession),
    };
  }
  return {
    user: mapUser(supaSession.user),
    profile: mapProfile(profileRow),
  };
}

// ---- API pública ----

/** Obtiene la sesión actual de forma síncrona (puede no estar lista todavía). */
export function getCurrentSessionSync(): null {
  // Mantenida para compatibilidad. El AuthContext consume `subscribe` que sí es asíncrono.
  return null;
}

type Listener = (session: Session | null) => void;

/**
 * Suscribe a cambios de sesión. Dispara el listener:
 *  - una vez con el estado inicial (puede ser null si no hay sesión)
 *  - cada vez que el usuario se loguea, desloguea o se refresca el token
 *
 * Devuelve la función de unsubscribe.
 */
export function subscribe(listener: Listener): () => void {
  let cancelled = false;

  // Estrategia: disparamos al listener INMEDIATAMENTE con una sesión mínima
  // (solo user, sin profile) en cuanto sabemos que hay auth, y refire con la
  // sesión completa cuando llega el profile. Esto evita que ProtectedRoute se
  // quede colgado si la query a `profiles` tarda.
  const fireFor = async (supaSession: SupabaseSession | null) => {
    if (cancelled) return;
    if (!supaSession?.user) {
      listener(null);
      return;
    }
    // 1) Sesión mínima inmediata — desbloquea el spinner.
    listener({
      user: mapUser(supaSession.user),
      profile: buildMinimalProfile(supaSession),
    });
    // 2) Profile real (con timeout interno).
    const profileRow = await fetchProfile(supaSession.user.id);
    if (cancelled) return;
    if (profileRow) {
      listener({
        user: mapUser(supaSession.user),
        profile: mapProfile(profileRow),
      });
    }
  };

  // Disparo inicial
  supabase.auth.getSession().then(({ data }) => {
    fireFor(data.session);
  });

  // Suscripción a cambios
  const { data: sub } = supabase.auth.onAuthStateChange((_event, supaSession) => {
    fireFor(supaSession);
  });

  return () => {
    cancelled = true;
    sub.subscription.unsubscribe();
  };
}

export interface SignInResult {
  ok: boolean;
  error?: string;
}

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export interface SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
}

export async function signUp(input: SignUpInput): Promise<SignInResult> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        first_name: input.firstName,
        last_name: input.lastName,
        company_name: input.companyName,
      },
    },
  });
  if (error) return { ok: false, error: error.message };

  // Si Supabase no creó automáticamente la fila en `profiles` (depende de tu trigger
  // `handle_new_user`), la creamos acá. Es idempotente: si ya existe por trigger, falla
  // silenciosamente y seguimos.
  if (data.user) {
    await supabase.from('profiles').upsert(
      {
        id: data.user.id,
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
        company_name: input.companyName,
        plan: 'Básico',
        subscription_status: 'trial',
      },
      { onConflict: 'id' }
    );
  }

  return { ok: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function updateProfile(patch: Partial<Profile>): Promise<Profile | null> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  // Convertir a column names de la DB
  const dbPatch: Partial<ProfileRow> = {
    first_name: patch.firstName,
    last_name: patch.lastName,
    company_name: patch.companyName,
    rut: patch.rut,
    industry: patch.industry,
    location: patch.region,
    phone: patch.phone,
    fiscal_address: patch.fiscalAddress,
  };

  // Eliminar undefined para no machacar columnas con null accidentalmente
  Object.keys(dbPatch).forEach((k) => {
    const key = k as keyof ProfileRow;
    if (dbPatch[key] === undefined) delete dbPatch[key];
  });

  const { data, error } = await supabase
    .from('profiles')
    .update(dbPatch)
    .eq('id', userId)
    .select()
    .single();

  if (error || !data) {
    // eslint-disable-next-line no-console
    console.error('[auth] Error actualizando profile:', error?.message);
    return null;
  }
  return mapProfile(data);
}

/**
 * Helper de desarrollo. Con RLS activo, un usuario solo puede modificar su propio plan.
 * Para cambiar plan de OTRO usuario, hay que hacerlo desde el SQL Editor con service_role.
 */
export async function setPlan(plan: PlanName): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return;
  await supabase.from('profiles').update({ plan }).eq('id', userId);
}
