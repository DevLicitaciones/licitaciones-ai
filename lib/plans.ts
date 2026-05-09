// Single source of truth para los planes de Licitaciones.ai.
// Consumido por la página /planes (marketing) y el panel de cliente (/dashboard).
// Si necesitás agregar/remover features o ajustar precios, hacelo SOLO acá.

export type PlanId = 'basico' | 'pro' | 'enterprise';
export type PlanName = 'Básico' | 'Pro' | 'Enterprise';

export type FeatureKey =
  | 'semaforo'
  | 'filtroSemantico'
  | 'alertas'
  | 'gauss'
  | 'gaussPro'
  | 'competencia'
  | 'renovaciones';

export interface PlanFeature {
  key: FeatureKey;
  name: string;
  included: boolean;
  /** Etiqueta opcional para diferenciar variantes (ej: "10/día", "Ilimitadas", "Pro") */
  variant?: string;
}

export interface Plan {
  id: PlanId;
  name: PlanName;
  monthly: string;
  annual: string;
  desc: string;
  cta: string;
  recommended?: boolean;
  features: PlanFeature[];
}

export const PLANS: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    monthly: '1.50 UF',
    annual: '1.25 UF',
    desc: 'Ideal para autónomos y pequeñas agencias.',
    cta: 'Empezar Básico',
    features: [
      { key: 'semaforo', name: 'Semáforo de Riesgo IA', included: true },
      { key: 'filtroSemantico', name: 'Filtro Semántico', included: true },
      { key: 'alertas', name: 'Alertas diarias', included: true, variant: '10/día' },
      { key: 'gauss', name: 'Estimador Gausix', included: false },
      { key: 'competencia', name: 'Análisis Competencia', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: '3.52 UF',
    annual: '2.95 UF',
    desc: 'El estándar para equipos comerciales modernos.',
    cta: 'Seleccionar Pro',
    recommended: true,
    features: [
      { key: 'semaforo', name: 'Semáforo de Riesgo IA', included: true },
      { key: 'filtroSemantico', name: 'Filtro Semántico', included: true },
      { key: 'alertas', name: 'Alertas Ilimitadas', included: true, variant: 'Ilimitadas' },
      { key: 'gauss', name: 'Estimador Gausix', included: true },
      { key: 'competencia', name: 'Análisis Competencia', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: '5.03 UF',
    annual: '4.20 UF',
    desc: 'Analítica profunda para grandes corporaciones.',
    cta: 'Contactar Ventas',
    features: [
      { key: 'semaforo', name: 'Semáforo de Riesgo IA', included: true },
      { key: 'filtroSemantico', name: 'Filtro Semántico', included: true },
      { key: 'alertas', name: 'Alertas Ilimitadas', included: true, variant: 'Ilimitadas' },
      { key: 'gaussPro', name: 'Estimador Gausix Pro', included: true, variant: 'Pro' },
      { key: 'competencia', name: 'Análisis Competencia', included: true },
      { key: 'renovaciones', name: 'Radar Renovaciones', included: true },
    ],
  },
];

export const PLAN_BY_ID: Record<PlanId, Plan> = {
  basico: PLANS[0],
  pro: PLANS[1],
  enterprise: PLANS[2],
};

export const PLAN_BY_NAME: Record<PlanName, Plan> = {
  'Básico': PLANS[0],
  'Pro': PLANS[1],
  'Enterprise': PLANS[2],
};

/** Devuelve true si el plan tiene la feature habilitada. Acepta plan por id o por nombre. */
export function hasFeature(plan: Plan | PlanId | PlanName | null | undefined, feature: FeatureKey): boolean {
  if (!plan) return false;
  const resolved: Plan | undefined =
    typeof plan === 'string'
      ? (PLAN_BY_ID[plan as PlanId] ?? PLAN_BY_NAME[plan as PlanName])
      : plan;
  if (!resolved) return false;

  // Caso especial: 'gauss' considera tanto el plan Pro (gauss) como Enterprise (gaussPro).
  if (feature === 'gauss') {
    return resolved.features.some(f => (f.key === 'gauss' || f.key === 'gaussPro') && f.included);
  }
  return resolved.features.some(f => f.key === feature && f.included);
}

/** Mínimo plan requerido para una feature. Útil para mensajes de upgrade. */
export const MIN_PLAN_FOR_FEATURE: Record<FeatureKey, PlanName> = {
  semaforo: 'Básico',
  filtroSemantico: 'Básico',
  alertas: 'Básico',
  gauss: 'Pro',
  gaussPro: 'Enterprise',
  competencia: 'Enterprise',
  renovaciones: 'Enterprise',
};

/** Color tag por plan, usado por <PlanBadge>. */
export const PLAN_TONE: Record<PlanName, { bg: string; text: string; border: string }> = {
  'Básico': {
    bg: 'bg-slate-100 dark:bg-white/5',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-white/10',
  },
  'Pro': {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
  },
  'Enterprise': {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
  },
};
