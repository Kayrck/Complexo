import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Check, ArrowRight, ArrowLeft, CreditCard, ShieldCheck, QrCode, User, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import { getPlan, PLANS } from "../data";
import { BoltMark } from "../components/BoltMark";
import { useAppContext } from "../context";

const STEPS = ["Identificação", "Dados", "Endereço", "Pagamento", "Confirmação"];

export const Checkout = () => {
  const { planId } = useParams();
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("credit");
  
  const plan = getPlan(planId);
  const supplementsTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = (plan?.price ?? 0) + supplementsTotal;

  useEffect(() => {
    if (step === 4) {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: ["#E10600", "#ffffff"] });
      clearCart();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-complexo-dark pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2">
            {/* Steps Progress */}
            <div className="mb-10 flex items-center justify-between">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        i < step
                          ? "bg-complexo-red text-white"
                          : i === step
                            ? "border-2 border-complexo-red text-complexo-red"
                            : "border border-complexo-light/15 text-complexo-muted"
                      }`}
                    >
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-widest text-complexo-muted sm:block">
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-2 h-px flex-1 ${i < step ? "bg-complexo-red" : "bg-complexo-light/10"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-complexo-light/10 bg-complexo-surface p-7 lg:p-10">
              
              {step === 0 && (
                <div className="animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-complexo-red/10 text-complexo-red">
                      <User className="h-6 w-6" />
                    </div>
                    <h2 className="font-rajdhani text-3xl font-bold uppercase">Identificação</h2>
                  </div>
                  <p className="mt-4 text-complexo-muted">Como você deseja continuar?</p>
                  
                  <div className="mt-8 space-y-4">
                    <button onClick={() => setStep(1)} className="flex w-full items-center justify-between rounded-2xl border border-complexo-red bg-complexo-red/5 p-6 hover:bg-complexo-red/10">
                      <div className="text-left">
                        <h3 className="font-bold text-complexo-light">Continuar como visitante</h3>
                        <p className="text-sm text-complexo-muted">Rápido e prático, sem senha.</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-complexo-red" />
                    </button>
                    
                    <button className="flex w-full items-center justify-between rounded-2xl border border-complexo-light/10 p-6 hover:bg-complexo-light/5">
                      <div className="text-left">
                        <h3 className="font-bold text-complexo-light">Fazer Login</h3>
                        <p className="text-sm text-complexo-muted">Use sua conta Complexo para preencher automaticamente.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h2 className="font-rajdhani text-2xl font-bold uppercase">Dados Pessoais</h2>
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input placeholder="Nome completo" className="sm:col-span-2" />
                    <Input placeholder="CPF" />
                    <Input placeholder="Data de Nascimento" />
                    <Input placeholder="E-mail" type="email" className="sm:col-span-2" />
                    <Input placeholder="Telefone / WhatsApp" className="sm:col-span-2" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-complexo-red/10 text-complexo-red">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h2 className="font-rajdhani text-2xl font-bold uppercase">Endereço de Entrega</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input placeholder="CEP" className="sm:col-span-2" />
                    <Input placeholder="Rua / Avenida" className="sm:col-span-2" />
                    <Input placeholder="Número" />
                    <Input placeholder="Complemento" />
                    <Input placeholder="Cidade" />
                    <Input placeholder="Estado" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h2 className="font-rajdhani text-2xl font-bold uppercase mb-8">Pagamento</h2>
                  
                  <div className="flex gap-4 mb-8">
                    <button 
                      onClick={() => setPaymentMethod("credit")}
                      className={`flex-1 rounded-2xl border p-4 text-center ${paymentMethod === "credit" ? "border-complexo-red bg-complexo-red/10 text-complexo-light" : "border-complexo-light/10 text-complexo-muted hover:border-complexo-light/30"}`}
                    >
                      <CreditCard className="mx-auto mb-2 h-6 w-6" />
                      <span className="font-semibold">Cartão</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod("pix")}
                      className={`flex-1 rounded-2xl border p-4 text-center ${paymentMethod === "pix" ? "border-complexo-red bg-complexo-red/10 text-complexo-light" : "border-complexo-light/10 text-complexo-muted hover:border-complexo-light/30"}`}
                    >
                      <QrCode className="mx-auto mb-2 h-6 w-6" />
                      <span className="font-semibold">PIX</span>
                    </button>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-complexo-muted" />
                        <input
                          placeholder="Número do cartão"
                          className="w-full rounded-xl border border-complexo-light/10 bg-complexo-panel py-4 pl-12 pr-4 placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none"
                        />
                      </div>
                      <Input placeholder="Nome no cartão" />
                      <div className="grid grid-cols-2 gap-5">
                        <Input placeholder="Validade (MM/AA)" />
                        <Input placeholder="CVV" />
                      </div>
                      <select className="w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-4 focus:border-complexo-red focus:outline-none text-complexo-light appearance-none">
                        <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                        <option value="2">2x de R$ {(total/2).toFixed(2)} sem juros</option>
                        <option value="3">3x de R$ {(total/3).toFixed(2)} sem juros</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === "pix" && (
                    <div className="rounded-2xl border border-complexo-light/10 bg-complexo-panel p-8 text-center animate-in fade-in">
                      <QrCode className="mx-auto mb-4 h-24 w-24 text-complexo-red" />
                      <p className="font-bold text-complexo-light mb-2">Pague via PIX para aprovação imediata</p>
                      <p className="text-sm text-complexo-muted mb-6">Abra o app do seu banco e escaneie o QR Code ou copie o código abaixo.</p>
                      <div className="flex items-center gap-2 rounded-xl bg-black/50 p-3">
                        <code className="flex-1 text-sm text-complexo-red truncate">00020126360014BR.GOV.BCB.PIX...</code>
                        <button className="rounded-lg bg-complexo-light/10 px-3 py-1.5 text-xs font-semibold hover:bg-complexo-light/20">Copiar</button>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-center gap-2 text-sm text-complexo-muted">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Pagamento 100% seguro e criptografado
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col items-center py-10 text-center animate-in zoom-in-95">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-complexo-red text-white shadow-[0_0_40px_rgba(225,6,0,0.5)]">
                    <BoltMark className="h-10 w-10" />
                  </span>
                  <h2 className="mt-8 font-rajdhani text-4xl font-bold uppercase text-complexo-light">
                    Pedido Confirmado!
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-complexo-muted">
                    Seu pedido #CPLX-{Math.floor(Math.random() * 10000)} foi processado com sucesso.
                  </p>
                  
                  <div className="mt-8 w-full max-w-sm rounded-2xl bg-complexo-light/5 p-6 text-left">
                    <h3 className="font-bold mb-4">Próximos passos</h3>
                    <ul className="space-y-3 text-sm text-complexo-muted">
                      <li className="flex gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0" /> Você receberá os detalhes no seu email.</li>
                      {plan && <li className="flex gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0" /> Seu acesso à academia já está liberado.</li>}
                      {cart.length > 0 && <li className="flex gap-3"><Check className="h-5 w-5 text-emerald-500 shrink-0" /> Acompanhe a entrega dos seus suplementos.</li>}
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate("/dashboard/aluno")}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-complexo-red px-8 py-4 font-semibold text-white hover:bg-complexo-red-bright"
                  >
                    Acessar meu Dashboard <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Navigation Actions */}
              {step > 0 && step < 4 && (
                <div className="mt-10 flex items-center justify-between border-t border-complexo-light/10 pt-8">
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-complexo-muted hover:text-complexo-light"
                  >
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </button>
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black"
                  >
                    {step === 3 ? "Finalizar Compra" : "Continuar"} <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <div className="sticky top-32 rounded-3xl border border-complexo-light/10 bg-complexo-surface p-7">
                <h3 className="font-rajdhani text-xl font-bold uppercase mb-6">Resumo do Pedido</h3>
                
                <div className="space-y-6">
                  {plan && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-complexo-muted mb-3">Assinatura</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-complexo-light">{plan.name}</p>
                          <p className="text-sm text-complexo-muted">Mensalidade</p>
                        </div>
                        <span className="font-rajdhani text-xl font-bold text-complexo-light">R$ {plan.price}</span>
                      </div>
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-complexo-muted mb-3">Produtos</p>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 shrink-0 rounded-lg bg-black/50 p-1">
                              <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-screen" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                              <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-complexo-muted">Qtd: {item.quantity}</span>
                                <span className="font-rajdhani font-bold">R$ {item.price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-complexo-light/10 pt-6 space-y-3">
                    <div className="flex justify-between text-sm text-complexo-muted">
                      <span>Subtotal</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Descontos</span>
                      <span>- R$ 0.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-complexo-muted">
                      <span>Frete</span>
                      <span>Grátis</span>
                    </div>
                  </div>

                  <div className="border-t border-complexo-light/10 pt-6">
                    <div className="flex justify-between items-end">
                      <span className="font-bold uppercase text-complexo-muted">Total</span>
                      <span className="font-rajdhani text-4xl font-bold text-complexo-red">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-4 placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none text-complexo-light ${className}`}
  />
);
