import { useMemo, useState } from "react";
import {
  Package,
  PackageX,
  AlertTriangle,
  Wallet,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Medal,
  Gauge,
  Tag,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { StatCard } from "../../../../components/dashboard/StatCard";
import { SectionCard } from "../../../../components/dashboard/SectionCard";
import { useAppContext } from "../../../../context";
import {
  PERIOD_LABELS,
  resolvePeriodRange,
  rankProducts,
  turnoverByCategory,
  salesSeries,
  salesInRange,
  isPromotionActive,
  formatBRL,
  type PeriodFilter,
  type ProductRankingEntry,
} from "../../../../inventory";

const COLORS = ["#E10600", "#2b6fff", "#16a34a", "#ff7a00", "#9333ea", "#0891b2", "#db2777", "#ca8a04"];
const HISTORY_MONTHS = ["2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08"];
const HISTORY_LABELS: Record<string, string> = { "2026-03": "Mar", "2026-04": "Abr", "2026-05": "Mai", "2026-06": "Jun", "2026-07": "Jul", "2026-08": "Ago" };

const PERIOD_OPTIONS: PeriodFilter[] = ["hoje", "semana", "mes", "trimestre", "ano", "personalizado"];

const TrendBadge = ({ value }: { value: number }) => (
  <span
    className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
      value > 0 ? "text-emerald-500" : value < 0 ? "text-red-400" : "text-complexo-muted"
    }`}
  >
    {value > 0 ? <ArrowUpRight className="h-3 w-3" /> : value < 0 ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
    {value > 0 ? "+" : ""}
    {value}%
  </span>
);

interface DashboardViewProps {
  onPromote: (productId: string) => void;
}

export const DashboardView = ({ onPromote }: DashboardViewProps) => {
  const { products, sales } = useAppContext();
  const [period, setPeriod] = useState<PeriodFilter>("mes");
  const [customRange, setCustomRange] = useState({ start: "2026-07-01", end: "2026-08-06" });

  const range = useMemo(
    () => resolvePeriodRange(period, period === "personalizado" ? customRange : null),
    [period, customRange],
  );
  const ranking = useMemo(() => rankProducts(products, sales, range), [products, sales, range]);
  const bestSellers = useMemo(() => [...ranking].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 6), [ranking]);
  const worstSellers = useMemo(
    () =>
      [...ranking]
        .filter((r) => r.product.status === "ativo")
        .sort((a, b) => a.quantitySold - b.quantitySold)
        .slice(0, 6),
    [ranking],
  );

  const activeProducts = products.filter((p) => p.status === "ativo");
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStock);
  const outOfStock = products.filter((p) => p.stock === 0);
  const investedValue = products.reduce((sum, p) => sum + p.costPrice * p.stock, 0);
  const potentialValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const potentialProfit = potentialValue - investedValue;

  const marginRanked = useMemo(
    () =>
      [...products]
        .filter((p) => p.status === "ativo")
        .map((p) => ({ ...p, profitPercent: p.price > 0 ? Math.round(((p.price - p.costPrice) / p.price) * 1000) / 10 : 0 }))
        .sort((a, b) => b.profitPercent - a.profitPercent),
    [products],
  );
  const topMargin = marginRanked.slice(0, 4);
  const bottomMargin = marginRanked.slice(-4).reverse();

  const investedByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + p.costPrice * p.stock);
    return Array.from(map.entries()).map(([category, total]) => ({ category, total })).sort((a, b) => b.total - a.total);
  }, [products]);

  const turnover = useMemo(() => turnoverByCategory(products, sales, range), [products, sales, range]);
  const evolution = useMemo(
    () => salesSeries(sales, HISTORY_MONTHS).map((m) => ({ ...m, label: HISTORY_LABELS[m.month] })),
    [sales],
  );

  const promoComparison = useMemo(() => {
    const inRange = salesInRange(sales, range);
    let promoUnits = 0, promoRevenue = 0, regularUnits = 0, regularRevenue = 0;
    for (const s of inRange) {
      const product = products.find((p) => p.id === s.productId);
      if (!product) continue;
      if (isPromotionActive(product)) {
        promoUnits += s.quantity;
        promoRevenue += s.quantity * s.unitPrice;
      } else {
        regularUnits += s.quantity;
        regularRevenue += s.quantity * s.unitPrice;
      }
    }
    return { promoUnits, promoRevenue, regularUnits, regularRevenue };
  }, [sales, products, range]);

  const rankingRow = (entry: ProductRankingEntry, position: number) => (
    <div key={entry.product.id} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-complexo-light/[0.03]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-complexo-panel font-mono text-xs font-bold text-complexo-muted">
        {position}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-complexo-light">{entry.product.name}</p>
        <p className="text-xs text-complexo-muted">
          {entry.quantitySold} un. · {formatBRL(entry.revenue)} · lucro {formatBRL(entry.profit)}
        </p>
      </div>
      <TrendBadge value={entry.growthPercent} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Package} label="Produtos cadastrados" value={`${products.length}`} />
        <StatCard icon={Package} label="Produtos ativos" value={`${activeProducts.length}`} />
        <StatCard icon={AlertTriangle} label="Estoque baixo" value={`${lowStock.length}`} />
        <StatCard icon={PackageX} label="Sem estoque" value={`${outOfStock.length}`} />
        <StatCard icon={Wallet} label="Valor investido" value={formatBRL(investedValue)} />
        <StatCard icon={DollarSign} label="Valor potencial de venda" value={formatBRL(potentialValue)} />
        <StatCard icon={TrendingUp} label="Lucro potencial" value={formatBRL(potentialProfit)} />
        <StatCard icon={Tag} label="Em promoção" value={`${products.filter((p) => isPromotionActive(p)).length}`} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-complexo-muted">Período dos rankings:</span>
        {PERIOD_OPTIONS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              period === p ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
            }`}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
        {period === "personalizado" && (
          <span className="flex items-center gap-2">
            <input
              type="date"
              value={customRange.start}
              onChange={(e) => setCustomRange((c) => ({ ...c, start: e.target.value }))}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-2.5 py-1.5 text-xs text-complexo-light focus:border-complexo-red focus:outline-none"
            />
            <span className="text-xs text-complexo-muted">até</span>
            <input
              type="date"
              value={customRange.end}
              onChange={(e) => setCustomRange((c) => ({ ...c, end: e.target.value }))}
              className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-2.5 py-1.5 text-xs text-complexo-light focus:border-complexo-red focus:outline-none"
            />
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Mais vendidos">
          {bestSellers.length > 0 ? (
            <div className="space-y-1">{bestSellers.map((entry, i) => rankingRow(entry, i + 1))}</div>
          ) : (
            <p className="text-sm text-complexo-muted">Nenhuma venda no período selecionado.</p>
          )}
        </SectionCard>

        <SectionCard title="Menos vendidos">
          <div className="space-y-1">
            {worstSellers.map((entry, i) => (
              <div key={entry.product.id} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-complexo-light/[0.03]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-complexo-panel font-mono text-xs font-bold text-complexo-muted">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-complexo-light">{entry.product.name}</p>
                  <p className="text-xs text-complexo-muted">
                    {entry.quantitySold} un. no período · estoque {entry.product.stock} ·{" "}
                    {entry.daysSinceLastSale === null ? "sem vendas registradas" : `última venda há ${entry.daysSinceLastSale}d`}
                  </p>
                </div>
                {entry.suggestPromotion && (
                  <button
                    onClick={() => onPromote(entry.product.id)}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-complexo-red/10 px-2.5 py-1 text-[10px] font-bold uppercase text-complexo-red hover:bg-complexo-red/20"
                  >
                    <Tag className="h-3 w-3" /> Promover
                  </button>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard title="Evolução das vendas — últimos 6 meses" className="xl:col-span-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolution} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="units" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                <Line yAxisId="units" type="monotone" dataKey="units" name="Unidades vendidas" stroke="#E10600" strokeWidth={3} dot={{ fill: "#E10600", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Promocional × regular (período)">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-complexo-light">Em promoção</span>
                <span className="font-semibold text-complexo-red">{promoComparison.promoUnits} un. · {formatBRL(promoComparison.promoRevenue)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-complexo-panel">
                <div
                  className="h-full rounded-full bg-complexo-red"
                  style={{
                    width: `${
                      promoComparison.promoUnits + promoComparison.regularUnits > 0
                        ? (promoComparison.promoUnits / (promoComparison.promoUnits + promoComparison.regularUnits)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-complexo-light">Preço regular</span>
                <span className="font-semibold text-complexo-light">{promoComparison.regularUnits} un. · {formatBRL(promoComparison.regularRevenue)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-complexo-panel">
                <div
                  className="h-full rounded-full bg-complexo-light/40"
                  style={{
                    width: `${
                      promoComparison.promoUnits + promoComparison.regularUnits > 0
                        ? (promoComparison.regularUnits / (promoComparison.promoUnits + promoComparison.regularUnits)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-complexo-muted">Com base no status de promoção atual dos produtos vendidos no período.</p>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Maior e menor margem">
          <div className="space-y-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500">
                <Medal className="h-3.5 w-3.5" /> Maior margem
              </p>
              {topMargin.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="truncate text-complexo-light">{p.name}</span>
                  <span className="font-mono font-semibold text-emerald-500">{p.profitPercent}%</span>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-red-400">
                <Medal className="h-3.5 w-3.5" /> Menor margem
              </p>
              {bottomMargin.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="truncate text-complexo-light">{p.name}</span>
                  <span className="font-mono font-semibold text-red-400">{p.profitPercent}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Giro de estoque por categoria">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnover} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  formatter={(value: number) => [value, "Giro (unid. vendidas / estoque)"]}
                  contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="turnoverRate" radius={[0, 4, 4, 0]}>
                  {turnover.map((entry, i) => (
                    <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Valor investido por categoria">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investedByCategory} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip formatter={(value: number) => formatBRL(value)} contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                  {investedByCategory.map((entry, i) => (
                    <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Próximos da ruptura de estoque">
          <div className="space-y-2">
            {[...outOfStock, ...lowStock].length === 0 && <p className="text-sm text-complexo-muted">Nenhum produto em alerta.</p>}
            {outOfStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-red-500/5 px-3 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-complexo-light">
                  <Gauge className="h-3.5 w-3.5 text-red-400" /> {p.name}
                </span>
                <span className="font-mono font-semibold text-red-400">0 un.</span>
              </div>
            ))}
            {lowStock
              .sort((a, b) => a.stock / a.minStock - b.stock / b.minStock)
              .map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg bg-yellow-500/5 px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-complexo-light">
                    <Gauge className="h-3.5 w-3.5 text-yellow-500" /> {p.name}
                  </span>
                  <span className="font-mono font-semibold text-yellow-500">
                    {p.stock} / {p.minStock} un.
                  </span>
                </div>
              ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
