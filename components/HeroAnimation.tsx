import React, { useEffect, useState } from 'react';

/**
 * Animación cinematográfica del hero — recreada en código a partir de imágenes
 * estáticas, sin video MP4.
 *
 * Storyboard (loop de 12 segundos):
 *  - 0.0s  → Tierra desde el espacio (frame estable + zoom-in muy lento)
 *  - 2.5s  → fade a Patagonia (continúa el zoom)
 *  - 5.0s  → fade a Santiago metropolitano (rotación visual de oblicua a top-down)
 *  - 7.5s  → fade a Santiago close + aparecen dots verdes pulsantes
 *  - 10.0s → fade-out de los dots, zoom-out, regreso a la Tierra
 *  - 12.0s → frame idéntico al 0.0s (loop perfecto)
 *
 * Imágenes esperadas (poné las que generaste en `public/hero-frames/`):
 *   /hero-frames/01-earth.jpg
 *   /hero-frames/02-patagonia.jpg
 *   /hero-frames/03-central-chile.jpg   (opcional — si no la tenés, se salta)
 *   /hero-frames/04-santiago-metro.jpg
 *   /hero-frames/05-santiago-close.jpg
 *
 * Si alguna imagen no carga, el componente sigue funcionando con las que sí
 * cargaron — no rompe la animación.
 */

interface Props {
  className?: string;
  /** Opacidad del overlay oscuro (0-1). Subila si el copy queda poco legible. */
  overlayOpacity?: number;
}

const FRAMES = [
  { key: 'earth',    src: '/hero-frames/01-earth.jpg',           start: 0,    end: 30 },
  { key: 'patagonia',src: '/hero-frames/02-patagonia.jpg',       start: 18,   end: 48 },
  { key: 'central',  src: '/hero-frames/03-central-chile.jpg',   start: 35,   end: 60 },
  { key: 'metro',    src: '/hero-frames/04-santiago-metro.jpg',  start: 50,   end: 75 },
  { key: 'close',    src: '/hero-frames/05-santiago-close.jpg',  start: 65,   end: 92 },
  { key: 'earth_end',src: '/hero-frames/01-earth.jpg',           start: 88,   end: 100 },
];

const HeroAnimation: React.FC<Props> = ({ className = '', overlayOpacity = 0.5 }) => {
  const [missingImages, setMissingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Probe cada imagen — las que falten quedan registradas y el fallback CSS
    // (gradient mesh) cubre la animación.
    const unique = Array.from(new Set(FRAMES.map((f) => f.src)));
    let cancelled = false;
    Promise.all(
      unique.map((src) =>
        fetch(src, { method: 'HEAD' })
          .then((r) => ({ src, ok: r.ok }))
          .catch(() => ({ src, ok: false }))
      )
    ).then((results) => {
      if (cancelled) return;
      const missing = new Set<string>();
      results.forEach((r) => {
        if (!r.ok) missing.add(r.src);
      });
      setMissingImages(missing);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allMissing = FRAMES.every((f) => missingImages.has(f.src));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {allMissing ? (
        <FallbackGradient />
      ) : (
        <>
          {FRAMES.map((frame, idx) => {
            if (missingImages.has(frame.src)) return null;
            return (
              <div
                key={`${frame.key}-${idx}`}
                className="hero-frame absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${frame.src})`,
                  animation: `heroFrame${idx} 12s linear infinite`,
                }}
              />
            );
          })}
          {/* Overlay de dots verdes pulsantes (aparecen en la fase Santiago close) */}
          <div className="hero-dots absolute inset-0">
            {DOTS.map((dot, i) => (
              <span
                key={i}
                className="hero-dot absolute rounded-full"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  animationDelay: `${dot.delay}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Overlay oscuro para legibilidad del copy */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/60 to-navy-950 pointer-events-none"
        style={{ opacity: overlayOpacity + 0.25 }}
        aria-hidden="true"
      />

      <style>{styles}</style>
    </div>
  );
};

// Posiciones aleatorias pero estéticas para los dots sobre la zona de Santiago.
// Concentrados en el centro del frame (donde Santiago aparece top-down).
const DOTS = [
  { x: 48, y: 52, size: 6, delay: 0.0 },
  { x: 52, y: 48, size: 5, delay: 0.3 },
  { x: 45, y: 55, size: 7, delay: 0.6 },
  { x: 55, y: 53, size: 5, delay: 0.2 },
  { x: 50, y: 50, size: 8, delay: 0.4 },
  { x: 47, y: 48, size: 4, delay: 0.8 },
  { x: 53, y: 56, size: 6, delay: 0.1 },
  { x: 49, y: 45, size: 5, delay: 0.5 },
  { x: 51, y: 58, size: 6, delay: 0.7 },
  { x: 56, y: 49, size: 4, delay: 0.9 },
  { x: 44, y: 51, size: 5, delay: 0.35 },
  { x: 58, y: 54, size: 4, delay: 0.65 },
  { x: 46, y: 58, size: 5, delay: 0.15 },
  { x: 54, y: 46, size: 4, delay: 0.45 },
];

const FallbackGradient: React.FC = () => (
  <div className="absolute inset-0 bg-navy-950">
    <div
      className="absolute -top-40 -left-40 size-[800px] rounded-full opacity-50 blur-[140px]"
      style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 60%)' }}
    />
    <div
      className="absolute top-1/4 right-0 size-[700px] rounded-full opacity-40 blur-[140px]"
      style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 60%)' }}
    />
    <div
      className="absolute -bottom-40 left-1/3 size-[700px] rounded-full opacity-30 blur-[140px]"
      style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 60%)' }}
    />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  </div>
);

// Keyframes generadas a mano para que cada capa entre, escale y salga en su ventana.
// La curva de zoom acompaña la narrativa: Tierra (1.0 → 1.15), Patagonia (1.05 → 1.25),
// Central (1.05 → 1.2), Metro (1.0 → 1.15), Close (1.05 → 1.0 zoom-in lento), Earth_end
// (1.15 → 1.0 zoom-out volviendo al frame inicial).
const styles = `
  @keyframes heroFrame0 {
    0%   { opacity: 1; transform: scale(1.00); }
    18%  { opacity: 1; transform: scale(1.08); }
    25%  { opacity: 0; transform: scale(1.15); }
    100% { opacity: 0; transform: scale(1.00); }
  }
  @keyframes heroFrame1 {
    0%, 15%   { opacity: 0; transform: scale(1.05); }
    22%       { opacity: 1; transform: scale(1.10); }
    38%       { opacity: 1; transform: scale(1.20); }
    44%       { opacity: 0; transform: scale(1.25); }
    100%      { opacity: 0; transform: scale(1.05); }
  }
  @keyframes heroFrame2 {
    0%, 32%   { opacity: 0; transform: scale(1.05); }
    40%       { opacity: 1; transform: scale(1.10); }
    52%       { opacity: 1; transform: scale(1.18); }
    58%       { opacity: 0; transform: scale(1.20); }
    100%      { opacity: 0; transform: scale(1.05); }
  }
  @keyframes heroFrame3 {
    0%, 47%   { opacity: 0; transform: scale(1.00); }
    55%       { opacity: 1; transform: scale(1.05); }
    66%       { opacity: 1; transform: scale(1.10); }
    72%       { opacity: 0; transform: scale(1.15); }
    100%      { opacity: 0; transform: scale(1.00); }
  }
  @keyframes heroFrame4 {
    0%, 62%   { opacity: 0; transform: scale(1.05); }
    68%       { opacity: 1; transform: scale(1.02); }
    82%       { opacity: 1; transform: scale(1.00); }
    88%       { opacity: 0; transform: scale(1.05); }
    100%      { opacity: 0; transform: scale(1.05); }
  }
  @keyframes heroFrame5 {
    0%, 85%   { opacity: 0; transform: scale(1.20); }
    92%       { opacity: 1; transform: scale(1.08); }
    100%      { opacity: 1; transform: scale(1.00); }
  }

  /* Dots verdes pulsantes — visibles solo durante la fase Santiago close (~62-88% del loop) */
  .hero-dots {
    animation: dotsVisibility 12s linear infinite;
  }
  @keyframes dotsVisibility {
    0%, 60%   { opacity: 0; }
    66%       { opacity: 1; }
    82%       { opacity: 1; }
    88%       { opacity: 0; }
    100%      { opacity: 0; }
  }
  .hero-dot {
    background: #10B981;
    box-shadow:
      0 0 12px rgba(16, 185, 129, 0.8),
      0 0 24px rgba(16, 185, 129, 0.4);
    animation: dotPulse 1.4s ease-in-out infinite;
    transform: translate(-50%, -50%);
  }
  @keyframes dotPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow:
        0 0 12px rgba(16, 185, 129, 0.8),
        0 0 24px rgba(16, 185, 129, 0.4);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.6);
      box-shadow:
        0 0 20px rgba(16, 185, 129, 1),
        0 0 40px rgba(16, 185, 129, 0.6);
    }
  }

  /* Respeta usuarios con preferencia de "reduced motion" — pausa la animación */
  @media (prefers-reduced-motion: reduce) {
    .hero-frame, .hero-dots, .hero-dot {
      animation: none !important;
    }
  }
`;

export default HeroAnimation;
