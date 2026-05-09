import React from 'react';
import { PLAN_TONE, type PlanName } from '../../lib/plans';

interface Props {
  plan: PlanName;
  size?: 'sm' | 'md';
  className?: string;
}

const PlanBadge: React.FC<Props> = ({ plan, size = 'sm', className = '' }) => {
  const tone = PLAN_TONE[plan];
  const sizeCls =
    size === 'sm'
      ? 'text-[10px] px-2 py-0.5'
      : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-semibold uppercase tracking-wide ${tone.bg} ${tone.text} ${tone.border} ${sizeCls} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {plan}
    </span>
  );
};

export default PlanBadge;
