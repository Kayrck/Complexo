import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, AlertCircle, Info } from "lucide-react";
import { BoltMark } from "../components/BoltMark";
import { login, DEMO_CREDENTIALS } from "../auth";

export const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "signup") {
      // Sem cadastro real ainda — a conta de demonstração do aluno serve
      // como o "novo aluno" para efeito de protótipo.
      login("aluno@complexo.com", "123456");
      navigate("/dashboard/aluno");
      return;
    }

    const role = login(email, password);
    if (!role) {
      setError("E-mail ou senha inválidos. Use um dos acessos de demonstração abaixo.");
      return;
    }
    navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/aluno");
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-complexo-panel lg:block">
        <div className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-complexo-red/15 blur-[120px]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-complexo-red">
              <BoltMark className="h-5 w-5 text-white" />
            </span>
            <span className="font-rajdhani text-xl font-bold uppercase tracking-[0.18em]">
              Complexo
            </span>
          </Link>
          <div>
            <BoltMark className="h-20 w-20 text-complexo-red" />
            <h2 className="mt-6 max-w-sm font-rajdhani text-4xl font-bold uppercase leading-tight">
              Sua evolução, em um só lugar
            </h2>
            <p className="mt-3 max-w-sm text-complexo-muted">
              Acompanhe treinos, metas, conquistas e seu acesso à academia.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-complexo-muted">
            Login · Grupo Complexo
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-complexo-dark px-5 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-rajdhani text-3xl font-bold uppercase">
            {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="mt-2 text-sm text-complexo-muted">
            {mode === "login"
              ? "Entre para acessar seu painel."
              : "Comece a acompanhar sua jornada."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-complexo-muted" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full rounded-xl border border-complexo-light/10 bg-complexo-surface py-3.5 pl-12 pr-4 placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-complexo-muted" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full rounded-xl border border-complexo-light/10 bg-complexo-surface py-3.5 pl-12 pr-4 placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none"
              />
            </div>

            {error && (
              <p className="flex items-start gap-2 text-sm text-complexo-red">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-complexo-muted">
            {mode === "login" ? "Ainda não tem conta? " : "Já tem conta? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
              }}
              className="font-semibold text-complexo-red"
            >
              {mode === "login" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>

          {mode === "login" && (
            <div className="mt-8 rounded-xl border border-dashed border-complexo-light/15 bg-complexo-surface p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-complexo-muted">
                <Info className="h-3.5 w-3.5" /> Acessos de demonstração
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {DEMO_CREDENTIALS.map((cred) => (
                  <li key={cred.email} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5">
                    <span className="text-complexo-light/90">
                      {cred.role === "admin" ? "Administrador" : "Aluno"}
                    </span>
                    <span className="font-mono text-xs text-complexo-muted">
                      {cred.email} · {cred.password}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
