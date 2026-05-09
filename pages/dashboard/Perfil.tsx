import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const FieldGroup: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 py-8 border-t border-slate-200 dark:border-white/5 first:border-t-0 first:pt-0">
    <div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}> = ({ label, value, onChange, placeholder, type = 'text', disabled }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </label>
);

const Perfil: React.FC = () => {
  const { profile, user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(profile?.firstName ?? '');
  const [lastName, setLastName] = useState(profile?.lastName ?? '');
  const [companyName, setCompanyName] = useState(profile?.companyName ?? '');
  const [rut, setRut] = useState(profile?.rut ?? '');
  const [industry, setIndustry] = useState(profile?.industry ?? '');
  const [region, setRegion] = useState(profile?.region ?? '');
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setCompanyName(profile.companyName);
      setRut(profile.rut);
      setIndustry(profile.industry);
      setRegion(profile.region);
    }
  }, [profile]);

  const dirty =
    profile && (
      firstName !== profile.firstName ||
      lastName !== profile.lastName ||
      companyName !== profile.companyName ||
      rut !== profile.rut ||
      industry !== profile.industry ||
      region !== profile.region
    );

  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    await updateProfile({ firstName, lastName, companyName, rut, industry, region });
    setSavedAt(new Date());
    setSaving(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-navy-900 px-6 lg:px-8">
        <FieldGroup
          title="Datos personales"
          description="Quien actúa en nombre de la empresa frente a Mercado Público."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre" value={firstName} onChange={setFirstName} placeholder="Juan" />
            <Field label="Apellido" value={lastName} onChange={setLastName} placeholder="Pérez" />
          </div>
          <Field
            label="Email de contacto"
            value={user?.email ?? ''}
            onChange={() => {}}
            disabled
            placeholder="—"
          />
        </FieldGroup>

        <FieldGroup
          title="Empresa"
          description="Razón social y datos tributarios usados para la facturación y validación."
        >
          <Field label="Razón social" value={companyName} onChange={setCompanyName} placeholder="Empresa SpA" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="RUT empresa" value={rut} onChange={setRut} placeholder="76.000.000-0" />
            <Field label="Industria" value={industry} onChange={setIndustry} placeholder="Tecnología" />
          </div>
          <Field label="Región principal" value={region} onChange={setRegion} placeholder="Metropolitana" />
        </FieldGroup>

        <div className="flex items-center justify-between gap-4 py-5 border-t border-slate-200 dark:border-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {savedAt
              ? `Cambios guardados a las ${savedAt.toLocaleTimeString()}.`
              : 'Los cambios se aplican al guardar.'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
