import { useMemo, useState } from "react";
import {
  Package,
  PackageX,
  AlertTriangle,
  TrendingUp,
  PlusCircle,
  X,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { useAppContext } from "../../../context";
import type { Product } from "../../../data";

const LOW_STOCK_THRESHOLD = 8;
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1775199603318-7f8a9a63b40d?w=600&h=750&fit=crop&auto=format";
const ACCENTS = ["#E10600", "#2b6fff", "#16a34a", "#ff7a00", "#9333ea", "#0891b2"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // strip accents after decomposition
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const emptyForm = { name: "", category: "", price: "", stock: "", blurb: "", description: "" };

export const EstoqueTab = () => {
  const { products, addProduct, updateProductStock } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const outOfStock = useMemo(() => products.filter((p) => p.stock === 0), [products]);
  const lowStock = useMemo(
    () => products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD),
    [products],
  );
  const bestSellers = useMemo(
    () => [...products].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 7),
    [products],
  );
  const topSeller = bestSellers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;

    const id = `${slugify(form.name)}-${Date.now().toString(36).slice(-4)}`;
    const newProduct: Product = {
      id,
      name: form.name.trim(),
      category: form.category.trim() || "Geral",
      price: Number(form.price) || 0,
      accent: ACCENTS[products.length % ACCENTS.length],
      image: DEFAULT_IMAGE,
      blurb: form.blurb.trim() || form.description.trim().slice(0, 80) || "Novo produto na loja Complexo.",
      description: form.description.trim() || form.blurb.trim() || "Descrição completa em breve.",
      stock: Number(form.stock) || 0,
      unitsSold: 0,
    };

    addProduct(newProduct);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Estoque</h2>
          <p className="text-complexo-muted">Publique produtos, acompanhe níveis de estoque e o que mais vende.</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-lg bg-complexo-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-complexo-red-bright"
        >
          {showForm ? <X className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
          {showForm ? "Cancelar" : "Publicar produto"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Package} label="Produtos cadastrados" value={`${products.length}`} />
        <StatCard icon={PackageX} label="Em falta" value={`${outOfStock.length}`} />
        <StatCard icon={AlertTriangle} label="Estoque baixo" value={`${lowStock.length}`} />
        <StatCard icon={TrendingUp} label="Mais vendido" value={topSeller ? topSeller.name : "—"} />
      </div>

      {showForm && (
        <SectionCard title="Publicar novo produto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nome do produto">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex.: Albumina em Pó"
                  className={inputCls}
                />
              </Field>
              <Field label="Categoria">
                <input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="Ex.: Proteína"
                  list="categorias-existentes"
                  className={inputCls}
                />
                <datalist id="categorias-existentes">
                  {Array.from(new Set(products.map((p) => p.category))).map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field label="Preço (R$)">
                <input
                  required
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="99"
                  className={inputCls}
                />
              </Field>
              <Field label="Estoque inicial">
                <input
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  placeholder="20"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Descrição curta (aparece nos cards)">
              <input
                value={form.blurb}
                onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
                placeholder="Uma frase curta sobre o produto"
                className={inputCls}
              />
            </Field>
            <Field label="Descrição completa (aparece na página do produto)">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Descreva o produto, benefícios e diferenciais."
                className={`${inputCls} resize-none`}
              />
            </Field>
            <p className="text-xs text-complexo-muted">
              Foto, tabela nutricional e modo de uso podem ser adicionados depois — o produto já fica visível na
              loja assim que publicado.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright"
              >
                Publicar produto
              </button>
            </div>
          </form>
        </SectionCard>
      )}

      {(outOfStock.length > 0 || lowStock.length > 0) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {outOfStock.length > 0 && (
            <SectionCard title="Em falta">
              <div className="space-y-2">
                {outOfStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg bg-red-500/5 px-4 py-3">
                    <div>
                      <p className="font-medium text-complexo-light">{p.name}</p>
                      <p className="text-xs text-complexo-muted">{p.category}</p>
                    </div>
                    <StatusBadge status="Em falta" tone="negative" />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {lowStock.length > 0 && (
            <SectionCard title="Prestes a acabar">
              <div className="space-y-2">
                {lowStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg bg-yellow-500/5 px-4 py-3">
                    <div>
                      <p className="font-medium text-complexo-light">{p.name}</p>
                      <p className="text-xs text-complexo-muted">{p.category}</p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-yellow-500">{p.stock} un.</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      )}

      <SectionCard title="Mais vendidos este mês">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bestSellers} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value: number) => [`${value} un.`, "Vendidos"]}
              />
              <Bar dataKey="unitsSold" radius={[0, 4, 4, 0]}>
                {bestSellers.map((p) => (
                  <Cell key={p.id} fill={p.accent} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Estoque de produtos">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-complexo-muted">
              <tr className="border-b border-complexo-light/10">
                <th className="py-3 pr-4 font-medium">Produto</th>
                <th className="py-3 pr-4 font-medium">Categoria</th>
                <th className="py-3 pr-4 font-medium">Preço</th>
                <th className="py-3 pr-4 font-medium">Vendidos</th>
                <th className="py-3 pr-4 font-medium">Estoque</th>
                <th className="py-3 pr-0 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-complexo-light/10">
              {products.map((p) => {
                const status = p.stock === 0 ? "Em falta" : p.stock <= LOW_STOCK_THRESHOLD ? "Estoque baixo" : "Em estoque";
                return (
                  <tr key={p.id}>
                    <td className="py-3 pr-4 font-medium text-complexo-light">{p.name}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{p.category}</td>
                    <td className="py-3 pr-4 text-complexo-muted">R${p.price}</td>
                    <td className="py-3 pr-4 text-complexo-muted">{p.unitsSold}</td>
                    <td className="py-3 pr-4">
                      <input
                        type="number"
                        min={0}
                        value={p.stock}
                        onChange={(e) => updateProductStock(p.id, Number(e.target.value))}
                        className="w-20 rounded-lg border border-complexo-light/10 bg-complexo-panel px-2 py-1.5 text-complexo-light focus:border-complexo-red focus:outline-none"
                        aria-label={`Estoque de ${p.name}`}
                      />
                    </td>
                    <td className="py-3 pr-0">
                      <StatusBadge status={status} tone={status === "Em falta" ? "negative" : status === "Estoque baixo" ? "warning" : "positive"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

const inputCls =
  "w-full rounded-xl border border-complexo-light/10 bg-complexo-panel px-4 py-2.5 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-complexo-muted">{label}</span>
    {children}
  </label>
);
