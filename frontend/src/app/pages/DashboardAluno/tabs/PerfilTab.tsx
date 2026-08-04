import { User, Target, AlertCircle, Phone, Bell } from "lucide-react";
import { SectionCard } from "../../../components/dashboard/SectionCard";

const inputCls =
  "w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-3 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-complexo-muted">{label}</span>
    {children}
  </label>
);

export const PerfilTab = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Perfil</h2>
      <p className="text-complexo-muted">Seus dados, objetivos e preferências na Complexo.</p>
    </div>

    <SectionCard title="Dados pessoais" action={<User className="h-5 w-5 text-complexo-red" />}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nome completo">
          <input className={inputCls} defaultValue="Rafael Lima" />
        </Field>
        <Field label="Data de nascimento">
          <input className={inputCls} defaultValue="14/03/1994" />
        </Field>
        <Field label="E-mail">
          <input className={inputCls} type="email" defaultValue="rafael.lima@email.com" />
        </Field>
        <Field label="WhatsApp">
          <input className={inputCls} defaultValue="(85) 99123-4567" />
        </Field>
      </div>
    </SectionCard>

    <SectionCard title="Objetivo e restrições" action={<Target className="h-5 w-5 text-complexo-red" />}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Objetivo principal">
          <select className={inputCls} defaultValue="Hipertrofia">
            <option>Emagrecimento</option>
            <option>Hipertrofia</option>
            <option>Condicionamento</option>
            <option>Saúde e bem-estar</option>
            <option>Performance</option>
          </select>
        </Field>
        <Field label="Restrições médicas">
          <input className={inputCls} placeholder="Nenhuma restrição informada" defaultValue="Tendinite no ombro direito" />
        </Field>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs text-complexo-muted">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Essas informações são compartilhadas com seu personal e a nutricionista para ajustar seu acompanhamento.
      </p>
    </SectionCard>

    <SectionCard title="Contato de emergência" action={<Phone className="h-5 w-5 text-complexo-red" />}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nome">
          <input className={inputCls} defaultValue="Camila Lima" />
        </Field>
        <Field label="Telefone">
          <input className={inputCls} defaultValue="(85) 99876-5432" />
        </Field>
      </div>
    </SectionCard>

    <SectionCard title="Preferências de notificação" action={<Bell className="h-5 w-5 text-complexo-red" />}>
      <div className="space-y-3">
        {[
          { label: "Lembretes de treino por WhatsApp", checked: true },
          { label: "Lembretes de hidratação e refeições", checked: true },
          { label: "Novidades e promoções da loja por e-mail", checked: false },
        ].map((pref) => (
          <label key={pref.label} className="flex items-center justify-between gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-3">
            <span className="text-sm text-complexo-light/90">{pref.label}</span>
            <input type="checkbox" defaultChecked={pref.checked} className="h-5 w-5 rounded accent-complexo-red" />
          </label>
        ))}
      </div>
    </SectionCard>

    <div className="flex justify-end">
      <button className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright">
        Salvar alterações
      </button>
    </div>
  </div>
);
