import { useState } from "react";
import { Link } from "react-router";
import { 
  Dumbbell, Calendar, HeartPulse, ShoppingBag, Settings, 
  LogOut, ChevronRight, Award, Flame, Activity, Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EVOLUTION_DATA = [
  { month: "Jan", weight: 82, bodyFat: 18 },
  { month: "Fev", weight: 81, bodyFat: 17 },
  { month: "Mar", weight: 81, bodyFat: 16 },
  { month: "Abr", weight: 80, bodyFat: 15 },
  { month: "Mai", weight: 79, bodyFat: 14 },
  { month: "Jun", weight: 78, bodyFat: 13 },
];

export const DashboardAluno = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-complexo-dark">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-complexo-surface md:flex">
        <div className="flex h-20 items-center px-6">
          <Link to="/" className="font-rajdhani text-2xl font-bold uppercase tracking-wider text-white">
            Complexo
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <NavItem active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<Activity />} label="Dashboard" />
          <NavItem active={activeTab === "treinos"} onClick={() => setActiveTab("treinos")} icon={<Dumbbell />} label="Treinos" />
          <NavItem active={activeTab === "agenda"} onClick={() => setActiveTab("agenda")} icon={<Calendar />} label="Agenda" />
          <NavItem active={activeTab === "compras"} onClick={() => setActiveTab("compras")} icon={<ShoppingBag />} label="Minhas Compras" />
        </nav>
        <div className="border-t border-white/10 p-4">
          <NavItem active={activeTab === "config"} onClick={() => setActiveTab("config")} icon={<Settings />} label="Configurações" />
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-complexo-muted hover:bg-white/5 hover:text-white transition-colors">
            <LogOut className="h-5 w-5" /> Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="p-6 md:p-10">
          
          <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-rajdhani text-4xl font-bold uppercase text-white">Olá, Atleta</h1>
              <p className="text-complexo-muted">Acompanhe sua evolução e gerencie seus treinos.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Plano Performance</p>
                <p className="text-xs text-emerald-500">Ativo até 12/2026</p>
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-complexo-red bg-white/10">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Avatar" className="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Stats Row */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard icon={<Flame className="text-orange-500" />} label="Dias Seguidos" value="12" suffix="dias" />
              <StatCard icon={<Dumbbell className="text-complexo-red" />} label="Treinos no Mês" value="18" suffix="treinos" />
              <StatCard icon={<Clock className="text-blue-500" />} label="Tempo Médio" value="55" suffix="min" />
              <StatCard icon={<HeartPulse className="text-pink-500" />} label="Calorias" value="8.5" suffix="kcal/k" />
            </div>

            {/* Evolution Chart */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-complexo-surface p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-rajdhani text-2xl font-bold uppercase">Evolução</h2>
                <select className="rounded-lg border border-white/10 bg-complexo-panel px-3 py-1.5 text-sm text-white focus:outline-none">
                  <option>Últimos 6 meses</option>
                  <option>Este ano</option>
                </select>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={EVOLUTION_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="weight" name="Peso (kg)" stroke="#E10600" strokeWidth={3} dot={{ fill: "#E10600", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="bodyFat" name="BF (%)" stroke="#2b6fff" strokeWidth={3} dot={{ fill: "#2b6fff", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gamification / Achievements */}
            <div className="rounded-2xl border border-white/10 bg-complexo-surface p-6 flex flex-col">
              <h2 className="font-rajdhani text-2xl font-bold uppercase mb-6">Nível Atual</h2>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-complexo-surface">
                    <Award className="h-12 w-12 text-yellow-500" />
                  </div>
                </div>
                <h3 className="font-rajdhani text-3xl font-bold uppercase text-yellow-500">Ouro</h3>
                <p className="mt-2 text-sm text-complexo-muted">Faltam 12 treinos para o nível Diamante.</p>
                
                <div className="mt-6 w-full">
                  <div className="flex justify-between text-xs font-bold text-complexo-muted mb-2">
                    <span>Ouro</span>
                    <span>Diamante</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[70%] bg-yellow-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-complexo-surface p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-rajdhani text-2xl font-bold uppercase">Últimos Treinos</h2>
                <button className="text-sm font-semibold text-complexo-red hover:text-white transition-colors">Ver todos</button>
              </div>
              
              <div className="divide-y divide-white/10">
                {[
                  { title: "Treino A - Peito e Tríceps", date: "Hoje, 07:30", duration: "55 min", calories: "420 kcal" },
                  { title: "Treino B - Costas e Bíceps", date: "Ontem, 18:45", duration: "62 min", calories: "480 kcal" },
                  { title: "Pilates Avançado", date: "22/06/2026", duration: "45 min", calories: "210 kcal" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-complexo-muted">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{t.title}</p>
                        <p className="text-sm text-complexo-muted">{t.date}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-mono text-sm text-white">{t.duration}</p>
                      <p className="text-xs text-complexo-muted">{t.calories}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-complexo-muted sm:hidden" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-complexo-red/10 text-complexo-red" : "text-complexo-muted hover:bg-white/5 hover:text-white"
    }`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ icon, label, value, suffix }: { icon: React.ReactNode, label: string, value: string, suffix: string }) => (
  <div className="rounded-2xl border border-white/10 bg-complexo-surface p-5">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
      {icon}
    </div>
    <p className="text-sm text-complexo-muted">{label}</p>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="font-rajdhani text-3xl font-bold text-white">{value}</span>
      <span className="text-sm font-bold text-complexo-muted">{suffix}</span>
    </div>
  </div>
);
