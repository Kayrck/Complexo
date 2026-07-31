import { useState } from "react";
import { Link } from "react-router";
import { 
  Users, DollarSign, ShoppingBag, HeartPulse, BarChart3, 
  Settings, LogOut, Search, Filter, MoreVertical, ArrowUpRight, ArrowDownRight, Package
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const REVENUE_DATA = [
  { month: "Jan", mensalidades: 45000, suplementos: 12000 },
  { month: "Fev", mensalidades: 48000, suplementos: 14000 },
  { month: "Mar", mensalidades: 51000, suplementos: 13500 },
  { month: "Abr", mensalidades: 50000, suplementos: 15000 },
  { month: "Mai", mensalidades: 54000, suplementos: 18000 },
  { month: "Jun", mensalidades: 58000, suplementos: 22000 },
];

export const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-complexo-dark text-sm">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-complexo-light/10 bg-[#0a0a0a] md:flex">
        <div className="flex h-16 items-center px-6 border-b border-complexo-light/10">
          <Link to="/" className="font-rajdhani text-xl font-bold uppercase tracking-wider text-complexo-light flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-complexo-red"></div>
            Admin
          </Link>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-lg border border-complexo-light/10 bg-complexo-light/5 p-3">
            <div className="h-8 w-8 rounded-full bg-complexo-red/20 flex items-center justify-center text-complexo-red font-bold">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-semibold text-complexo-light">João Diretor</p>
              <p className="truncate text-xs text-complexo-muted">joao@complexo.com</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4 pt-0">
          <NavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon={<BarChart3 />} label="Visão Geral" />
          <NavItem active={activeTab === "alunos"} onClick={() => setActiveTab("alunos")} icon={<Users />} label="Alunos" />
          <NavItem active={activeTab === "financeiro"} onClick={() => setActiveTab("financeiro")} icon={<DollarSign />} label="Financeiro" />
          <NavItem active={activeTab === "loja"} onClick={() => setActiveTab("loja")} icon={<ShoppingBag />} label="Loja & Suplementos" />
          <NavItem active={activeTab === "pilates"} onClick={() => setActiveTab("pilates")} icon={<HeartPulse />} label="Pilates" />
        </nav>
        <div className="border-t border-complexo-light/10 p-4">
          <NavItem active={activeTab === "config"} onClick={() => setActiveTab("config")} icon={<Settings />} label="Configurações" />
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light">
            <LogOut className="h-4 w-4" /> Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-complexo-light/10 bg-[#0a0a0a]/80 px-6 backdrop-blur-md">
          <h1 className="font-semibold text-complexo-light capitalize">{activeTab.replace("-", " ")}</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-complexo-muted" />
              <input 
                type="text" 
                placeholder="Buscar alunos, pedidos..." 
                className="h-9 w-64 rounded-md border border-complexo-light/10 bg-complexo-light/5 pl-9 pr-4 text-sm text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none"
              />
            </div>
            <button className="flex h-9 items-center gap-2 rounded-md bg-complexo-red px-4 text-sm font-semibold text-white hover:bg-complexo-red-bright">
              <span className="hidden sm:inline">Novo Registro</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* KPI Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Receita Mensal" value="R$ 80.000" trend="+12.5%" isPositive={true} />
            <KpiCard title="Alunos Ativos" value="1.248" trend="+4.2%" isPositive={true} />
            <KpiCard title="Vendas Loja" value="R$ 22.000" trend="+18.1%" isPositive={true} />
            <KpiCard title="Churn Rate" value="2.4%" trend="-0.5%" isPositive={true} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            
            {/* Chart */}
            <div className="rounded-xl border border-complexo-light/10 bg-[#0f0f0f] p-5 xl:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-complexo-light">Receita por Categoria</h2>
                <select className="rounded-md border border-complexo-light/10 bg-complexo-light/5 px-2 py-1 text-xs text-complexo-light outline-none">
                  <option>Este Ano</option>
                </select>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="mensalidades" name="Mensalidades" fill="#E10600" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="suplementos" name="Loja" fill="#2b6fff" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-complexo-light/10 bg-[#0f0f0f] p-5">
              <h2 className="mb-4 font-semibold text-complexo-light">Atividade Recente</h2>
              <div className="space-y-4">
                {[
                  { icon: <UserPlus className="text-emerald-500" />, title: "Novo aluno: Carlos Silva", time: "Há 10 min" },
                  { icon: <Package className="text-blue-500" />, title: "Pedido #402 aprovado", time: "Há 25 min" },
                  { icon: <DollarSign className="text-emerald-500" />, title: "Renovação: Plano Elite", time: "Há 1 hora" },
                  { icon: <UserMinus className="text-red-500" />, title: "Cancelamento: Ana Souza", time: "Há 3 horas" },
                  { icon: <HeartPulse className="text-pink-500" />, title: "Agendamento Pilates", time: "Há 4 horas" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-complexo-light/5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-complexo-light">{item.title}</p>
                      <p className="text-xs text-complexo-muted">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-md border border-complexo-light/10 py-2 text-center text-xs font-semibold hover:bg-complexo-light/5">
                Ver tudo
              </button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-complexo-light/10 bg-[#0f0f0f] xl:col-span-3">
              <div className="flex items-center justify-between border-b border-complexo-light/10 p-5">
                <h2 className="font-semibold text-complexo-light">Últimos Cadastros</h2>
                <button className="flex items-center gap-2 rounded-md border border-complexo-light/10 px-3 py-1.5 text-xs font-semibold hover:bg-complexo-light/5">
                  <Filter className="h-3 w-3" /> Filtrar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-complexo-light/5 text-xs uppercase text-complexo-muted">
                    <tr>
                      <th className="px-5 py-3 font-medium">Aluno</th>
                      <th className="px-5 py-3 font-medium">Plano</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Cadastro</th>
                      <th className="px-5 py-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-complexo-light/10">
                    {[
                      { name: "Marcos Andrade", email: "marcos@email.com", plan: "Performance", status: "Ativo", date: "24/06/2026" },
                      { name: "Julia Santos", email: "julia@email.com", plan: "Elite", status: "Ativo", date: "23/06/2026" },
                      { name: "Roberto Lima", email: "roberto@email.com", plan: "Essencial", status: "Pendente", date: "22/06/2026" },
                      { name: "Fernanda Costa", email: "fernanda@email.com", plan: "Performance", status: "Inativo", date: "20/06/2026" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-complexo-light/[0.02] transition-colors">
                        <td className="px-5 py-3">
                          <p className="font-medium text-complexo-light">{row.name}</p>
                          <p className="text-xs text-complexo-muted">{row.email}</p>
                        </td>
                        <td className="px-5 py-3">{row.plan}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            row.status === "Ativo" ? "bg-emerald-500/10 text-emerald-500" :
                            row.status === "Pendente" ? "bg-yellow-500/10 text-yellow-500" :
                            "bg-red-500/10 text-red-500"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-complexo-muted">{row.date}</td>
                        <td className="px-5 py-3 text-right">
                          <button className="text-complexo-muted hover:text-complexo-light"><MoreVertical className="h-4 w-4 inline" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Quick mock icons for the activity list to avoid huge imports
const UserPlus = ({ className }: { className: string }) => <Users className={className} />;
const UserMinus = ({ className }: { className: string }) => <Users className={className} />;

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
      active ? "bg-complexo-light/10 text-complexo-light" : "text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
    }`}
  >
    <span className="h-4 w-4">{icon}</span> {label}
  </button>
);

const KpiCard = ({ title, value, trend, isPositive }: { title: string, value: string, trend: string, isPositive: boolean }) => (
  <div className="rounded-xl border border-complexo-light/10 bg-[#0f0f0f] p-5">
    <p className="text-xs font-medium text-complexo-muted">{title}</p>
    <div className="mt-2 flex items-end justify-between">
      <p className="text-2xl font-bold text-complexo-light">{value}</p>
      <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {trend}
      </div>
    </div>
  </div>
);
