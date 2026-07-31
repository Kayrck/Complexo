import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, ArrowRight, ArrowLeft, Activity, Target, User, Dumbbell, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";
import { PLANS } from "../data";
import { BoltMark } from "../components/BoltMark";

const STEPS = ["Perfil", "Objetivos", "Corpo", "Plano", "Pagamento"];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].id);

  const handleNext = () => {
    if (step === 4) {
      setStep(5);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ["#E10600", "#ffffff"] });
    } else {
      setStep(s => s + 1);
    }
  };

  if (step === 5) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-complexo-dark p-5 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-complexo-red text-white shadow-[0_0_50px_rgba(225,6,0,0.4)]">
          <BoltMark className="h-12 w-12" />
        </span>
        <h1 className="mt-8 font-rajdhani text-5xl font-bold uppercase text-complexo-light">Bem-vindo ao Universo Complexo</h1>
        <p className="mt-4 max-w-md text-lg text-complexo-muted">
          Sua matrícula foi concluída. Apresente o código abaixo na recepção para liberar seu acesso biométrico.
        </p>
        
        <div className="mt-10 rounded-3xl border border-complexo-light/10 bg-complexo-surface p-8">
          <div className="h-48 w-48 mx-auto bg-white p-2 rounded-xl">
            {/* Fake QR Code using CSS grid */}
            <div className="w-full h-full bg-black flex items-center justify-center">
              <span className="text-white text-xs">QR CODE</span>
            </div>
          </div>
          <p className="mt-4 font-mono text-2xl font-bold tracking-widest text-complexo-light">CPLX-8492</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/aluno")}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black"
        >
          Ir para Área do Aluno <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-complexo-dark">
      {/* Left side - Visuals */}
      <div className="hidden w-1/3 flex-col justify-between bg-black p-10 lg:flex relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10">
          <Link to="/" className="font-rajdhani text-3xl font-bold uppercase tracking-widest text-white">
            Complexo
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="font-rajdhani text-5xl font-bold uppercase text-white">
            {step === 0 && "Comece sua evolução."}
            {step === 1 && "Defina seu alvo."}
            {step === 2 && "Conheça seu corpo."}
            {step === 3 && "Escolha seu caminho."}
            {step === 4 && "Confirme sua entrada."}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Junte-se à elite da performance e transforme seus resultados com a melhor estrutura.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-10 lg:px-24">
        
        {/* Progress bar */}
        <div className="mb-12 flex items-center justify-between gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 w-full rounded-full transition-colors ${i <= step ? "bg-complexo-red" : "bg-complexo-light/10"}`} />
              <p className={`mt-2 hidden text-xs font-semibold uppercase tracking-wider sm:block ${i <= step ? "text-complexo-light" : "text-complexo-muted"}`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-xl w-full mx-auto">
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                <User className="h-8 w-8" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Dados Pessoais</h2>
              <p className="mb-8 text-complexo-muted">Precisamos de algumas informações para criar seu perfil.</p>
              
              <div className="space-y-4">
                <Input placeholder="Nome Completo" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="CPF" />
                  <Input placeholder="Data de Nasc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-4 text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none appearance-none">
                    <option value="">Sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                  <Input placeholder="Telefone" />
                </div>
                <Input placeholder="E-mail" type="email" />
                <Input placeholder="Senha" type="password" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Seus Objetivos</h2>
              <p className="mb-8 text-complexo-muted">Selecione o que você busca na Complexo.</p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Emagrecimento", "Hipertrofia", "Condicionamento", "Saúde e Bem-estar", "Performance", "Recuperação"].map(obj => (
                  <label key={obj} className="flex cursor-pointer items-center gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 hover:bg-complexo-light/5 has-[:checked]:border-complexo-red has-[:checked]:bg-complexo-red/5">
                    <input type="checkbox" className="h-5 w-5 accent-complexo-red bg-transparent border-complexo-light/20 rounded" />
                    <span className="font-semibold text-complexo-light">{obj}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                <Activity className="h-8 w-8" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Informações Físicas</h2>
              <p className="mb-8 text-complexo-muted">Isso nos ajudará a personalizar sua experiência.</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Input placeholder="Peso" type="number" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-complexo-muted">kg</span>
                  </div>
                  <div className="relative">
                    <Input placeholder="Altura" type="number" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-complexo-muted">cm</span>
                  </div>
                </div>
                <div className="relative">
                  <Input placeholder="Percentual de Gordura (opcional)" type="number" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-complexo-muted">%</span>
                </div>
                <textarea 
                  placeholder="Possui alguma restrição médica? Descreva aqui."
                  className="w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-4 text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none min-h-[120px] resize-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                <Dumbbell className="h-8 w-8" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Escolha seu Plano</h2>
              <p className="mb-8 text-complexo-muted">Selecione a modalidade ideal para sua rotina.</p>
              
              <div className="space-y-4">
                {PLANS.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left ${selectedPlan === p.id ? "border-complexo-red bg-complexo-red/10" : "border-complexo-light/10 bg-complexo-panel hover:border-complexo-light/30"}`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-rajdhani text-2xl font-bold uppercase text-complexo-light">{p.name}</h3>
                        {p.popular && <span className="rounded bg-complexo-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Popular</span>}
                      </div>
                      <p className="mt-1 text-sm text-complexo-muted">{p.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-rajdhani text-2xl font-bold text-complexo-light">R$ {p.price}</p>
                      <p className="text-xs text-complexo-muted">/mês</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-complexo-red/10 text-complexo-red">
                <CreditCard className="h-8 w-8" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Pagamento</h2>
              <p className="mb-8 text-complexo-muted">Finalize sua assinatura para garantir o acesso.</p>
              
              <div className="rounded-xl border border-complexo-light/10 bg-complexo-surface p-5 mb-8 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-complexo-muted uppercase">Resumo</p>
                  <p className="font-bold text-complexo-light text-lg">{PLANS.find(p=>p.id===selectedPlan)?.name}</p>
                </div>
                <p className="font-rajdhani text-3xl font-bold text-complexo-red">R$ {PLANS.find(p=>p.id===selectedPlan)?.price}</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-complexo-muted" />
                  <input placeholder="Número do cartão" className="w-full rounded-xl border border-complexo-light/10 bg-complexo-panel py-4 pl-12 pr-4 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none" />
                </div>
                <Input placeholder="Nome impresso no cartão" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Validade (MM/AA)" />
                  <Input placeholder="CVV" />
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mt-12 flex items-center justify-between border-t border-complexo-light/10 pt-8">
            <button 
              onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/")}
              className="inline-flex items-center gap-2 font-semibold text-complexo-muted hover:text-complexo-light"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            <button 
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-full bg-complexo-red px-8 py-4 font-semibold text-white hover:bg-complexo-red-bright"
            >
              {step === 4 ? "Finalizar Matrícula" : "Continuar"} <ArrowRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-4 text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none ${className}`}
  />
);
