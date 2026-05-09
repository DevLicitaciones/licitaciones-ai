// Cliente Supabase tipado para el panel de cliente.
// Las credenciales vienen de variables de entorno Vite (VITE_SUPABASE_*).
// Definí esos valores en `licitaciones.ai-platform/.env.local` (gitignoreado).
//
// La anon key es pública por diseño — la seguridad real vive en las RLS policies
// de la DB, no en ocultar la key.

import { createClient } from '@supabase/supabase-js';
import type { PlanName } from './plans';

// ---- Tipos del schema ----
// Generados a mano en base al schema de la DB (tabla `public.profiles`).
// Si el schema cambia, regenerar con:
//   npx supabase gen types typescript --project-id xeozokmctvgvcbvmifbl
export interface ProfileRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  company_name: string | null;
  rut: string | null;
  industry: string | null;
  fiscal_address: string | null;
  plan: PlanName | string | null;
  subscription_status: string | null;
  credits_api: number | null;
  created_at: string;
  updated_at: string | null;
}

// Nota: en lugar de pasar un Database type al createClient (que requiere una shape
// muy específica que Supabase v2 valida estrictamente), tipamos los resultados a
// mano en la capa lib/auth.ts. Mantenemos `ProfileRow` exportada como contrato
// del schema. Cuando quieras tipos generados, corré:
//   npx supabase gen types typescript --project-id xeozokmctvgvcbvmifbl > lib/database.types.ts

// ---- Cliente ----
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Mensaje útil en consola — no rompe el build, solo guía cuando faltan envs en dev.
  // eslint-disable-next-line no-console
  console.error(
    '[Licitaciones.ai] Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY en .env.local. ' +
      'Copiá las credenciales desde keys.env / src/config/env.js a licitaciones.ai-platform/.env.local'
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Lo desactivamos: usamos email/password (no OAuth ni magic links).
      // Activarlo con HashRouter puede generar parsing erróneo del hash.
      detectSessionInUrl: false,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
);
