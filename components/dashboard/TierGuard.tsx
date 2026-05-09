import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { hasFeature, type FeatureKey } from '../../lib/plans';
import UpgradeCard from './UpgradeCard';

interface Props {
  feature: FeatureKey;
  title: string;
  description: string;
  benefits: string[];
  children: React.ReactNode;
}

/**
 * Wrappea contenido que requiere una feature específica del plan.
 * Si el plan del usuario no la incluye, muestra <UpgradeCard> en su lugar.
 */
const TierGuard: React.FC<Props> = ({ feature, title, description, benefits, children }) => {
  const { plan } = useAuth();
  const allowed = hasFeature(plan, feature);

  if (!allowed) {
    return (
      <UpgradeCard
        feature={feature}
        title={title}
        description={description}
        benefits={benefits}
      />
    );
  }

  return <>{children}</>;
};

export default TierGuard;
