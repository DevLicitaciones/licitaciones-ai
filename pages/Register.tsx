
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoleculeBackground from '../components/MoleculeBackground';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Completá nombre y apellido');
      return;
    }
    if (!companyName.trim()) {
      setError('Indicá la razón social de tu empresa');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Ingresá un email válido');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setSubmitting(true);
    const result = await signUp({ email, password, firstName, lastName, companyName });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? 'No pudimos crear tu cuenta. Probá de nuevo.');
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center dot-grid-bg py-12 overflow-hidden">
      <MoleculeBackground />

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 size-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl px-6 animate-fade-up">
        <div className="glass-card rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5 flex flex-col md:flex-row">

          {/* Left Info Column */}
          <div className="md:w-5/12 bg-navy-900 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent"></div>

            <div className="relative z-10">
              <div className="size-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="material-symbols-outlined text-white">auto_awesome</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight mb-4">Empieza a ganar con Inteligencia.</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Únete a más de 500 empresas que ya están optimizando sus ofertas en Mercado Público.
              </p>

              <div className="space-y-6">
                {[
                  { icon: 'monitoring', text: 'Análisis de precios históricos' },
                  { icon: 'security', text: 'Semáforo de riesgo contractual' },
                  { icon: 'notifications_active', text: 'Alertas de oportunidades únicas' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-xl">{item.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-xs italic text-slate-300">"El estimador Gausix nos permitió ajustar nuestro margen un 12% y ganar la licitación del MOP."</p>
                <p className="text-[10px] font-bold mt-2 text-emerald-400">— Constructora Aris</p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:w-7/12 p-8 md:p-12 bg-white dark:bg-navy-950/40">
            <div className="mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Registro de Empresa</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Crea tu cuenta profesional en segundos.</p>
            </div>

            {success ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-500 text-2xl">mark_email_read</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Cuenta creada</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Revisá tu casilla para confirmar el email. Te redirigimos al login en un instante.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej: Juan"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Apellido</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej: Pérez"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Razón Social</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Mi Empresa SpA"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Corporativo</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@empresa.cl"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confirmar</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                )}

                <div className="col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Creando cuenta…' : 'Crear Mi Cuenta Pro'}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-8 text-center text-xs text-slate-500 font-medium">
              Al registrarte, aceptas nuestros <a href="#" className="text-emerald-500 hover:underline">Términos de Servicio</a> y <a href="#" className="text-emerald-500 hover:underline">Privacidad</a>.
            </p>
            <p className="mt-4 text-center text-sm font-bold">
              <Link to="/login" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors">¿Ya tienes cuenta? Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
