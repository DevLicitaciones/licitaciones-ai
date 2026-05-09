import React, { useEffect, useState } from 'react';

interface Props {
  /** Path al MP4 dentro de /public. Default: /hero-bg.mp4 */
  src?: string;
  /** Clase extra para overrides puntuales. */
  className?: string;
  /** Opacidad del overlay oscuro (0-1). Subila si el copy queda poco legible. */
  overlayOpacity?: number;
}

/**
 * Background video para el hero del landing.
 *
 * Comportamiento:
 *  - Intenta cargar /hero-bg.mp4 (autoplay, loop, muted, playsInline).
 *  - Si el archivo no existe (404 / error de carga), cae automáticamente
 *    a un gradient mesh CSS para que el sitio no se rompa antes de tener
 *    el video real.
 *  - Aplica un overlay oscuro encima para garantizar legibilidad del copy.
 *
 * Mientras no exista /public/hero-bg.mp4, ves el gradient. Apenas lo agregás,
 * se reemplaza solo (sin tocar este componente).
 */
const HeroVideo: React.FC<Props> = ({
  src = '/hero-bg.mp4',
  className = '',
  overlayOpacity = 0.55,
}) => {
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    // Probe defensivo: si el archivo no existe en el servidor, ocultamos el video
    // antes de que el browser intente reproducirlo y muestre un cuadro negro.
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) setVideoOk(false);
      })
      .catch(() => {
        if (!cancelled) setVideoOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {videoOk ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setVideoOk(false)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      ) : (
        // Fallback: gradient mesh + grid sutil. No requiere archivos binarios.
        <FallbackGradient />
      )}

      {/* Overlay oscuro para legibilidad del copy */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/60 to-navy-950"
        style={{ opacity: overlayOpacity + 0.25 }}
        aria-hidden="true"
      />
    </div>
  );
};

const FallbackGradient: React.FC = () => (
  <div className="absolute inset-0 bg-navy-950">
    {/* Gradient mesh estilo aurora */}
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
    {/* Dot grid encima */}
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

export default HeroVideo;
