# Licitaciones.ai — Plataforma

App React + Vite + TypeScript + Supabase. Frontend del panel de cliente y páginas de marketing.

## Setup local

**Prerrequisitos:** Node.js 18+

1. Instalar dependencias:
   ```
   npm install
   ```

2. Configurar variables de entorno: copiá `.env.example` a `.env.local` y completá con las credenciales reales de Supabase.

3. Correr el dev server:
   ```
   npm run dev
   ```

   Abre en `http://localhost:3000`.

## Scripts

- `npm run dev` — dev server con HMR
- `npm run build` — build de producción a `dist/`
- `npm run preview` — preview del build de producción

## Estructura

- `pages/` — páginas marketing y dashboard (`pages/dashboard/*`)
- `components/` — componentes compartidos y dashboard shell (`components/dashboard/*`)
- `contexts/` — `AuthContext`, `ThemeContext`
- `lib/` — `supabase.ts` (cliente), `auth.ts` (capa auth), `plans.ts` (planes y features)
