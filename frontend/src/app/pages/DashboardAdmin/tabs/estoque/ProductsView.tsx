import { Fragment, useMemo, useState } from "react";
import {
  Search,
  PlusCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Tag,
  PackagePlus,
  History,
  Download,
  X,
} from "lucide-react";
import { SectionCard } from "../../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../../components/dashboard/StatusBadge";
import { Modal } from "../../../../components/dashboard/Modal";
import { useAppContext } from "../../../../context";
import { getEffectivePrice, isPromotionActive, formatBRL } from "../../../../inventory";
import type { Product } from "../../../../data";

type SortKey = "name" | "price" | "stock" | "margin" | "category";
const PAGE_SIZE = 8;

interface ProductsViewProps {
  onNewProduct: () => void;
  onEditProduct: (productId: string) => void;
  onPromote: (productId: string) => void;
}

export const ProductsView = ({ onNewProduct, onEditProduct, onPromote }: ProductsViewProps) => {
  const { products, updateProductStock, sales } = useAppContext();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [restockingId, setRestockingId] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState("10");
  const [historyId, setHistoryId] = useState<string | null>(null);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.brand ?? "").toLowerCase().includes(q))
      .filter((p) => categoryFilter === "Todas" || p.category === categoryFilter)
      .filter((p) => statusFilter === "Todos" || p.status === statusFilter);
  }, [products, query, categoryFilter, statusFilter]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const marginOf = (p: Product) => (p.price > 0 ? (p.price - p.costPrice) / p.price : 0);
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "price":
          return (a.price - b.price) * dir;
        case "stock":
          return (a.stock - b.stock) * dir;
        case "margin":
          return (marginOf(a) - marginOf(b)) * dir;
        case "category":
          return a.category.localeCompare(b.category) * dir;
        default:
          return a.name.localeCompare(b.name) * dir;
      }
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleConfirmRestock = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const amount = Number(restockAmount) || 0;
    if (product && amount > 0) updateProductStock(productId, product.stock + amount);
    setRestockingId(null);
    setRestockAmount("10");
  };

  const historyProduct = products.find((p) => p.id === historyId);
  const historySales = historyId
    ? sales.filter((s) => s.productId === historyId).sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 20)
    : [];

  const SortHeader = ({ label, sortableKey }: { label: string; sortableKey: SortKey }) => (
    <button onClick={() => toggleSort(sortableKey)} className="flex items-center gap-1 hover:text-complexo-light">
      {label} <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Produtos</h2>
          <p className="text-complexo-muted">{sorted.length} produto{sorted.length === 1 ? "" : "s"} encontrado{sorted.length === 1 ? "" : "s"}.</p>
        </div>
        <div className="flex gap-2">
          <button
            disabled
            title="Em breve"
            className="flex items-center gap-2 rounded-lg border border-complexo-light/10 px-4 py-2.5 text-sm font-semibold text-complexo-muted opacity-50"
          >
            <Download className="h-4 w-4" /> Exportar
          </button>
          <button
            onClick={onNewProduct}
            className="flex items-center gap-2 rounded-lg bg-complexo-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-complexo-red-bright"
          >
            <PlusCircle className="h-4 w-4" /> Novo produto
          </button>
        </div>
      </div>

      <SectionCard>
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-complexo-muted" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por nome, SKU ou marca..."
              className="h-10 w-full rounded-lg border border-complexo-light/10 bg-complexo-panel pl-9 pr-4 text-sm text-complexo-light placeholder:text-complexo-muted focus:border-complexo-red focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-complexo-light/10 bg-complexo-panel px-3 py-2 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
          >
            <option value="Todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-complexo-muted">
              <tr className="border-b border-complexo-light/10">
                <th className="py-3 pr-4 font-medium"><SortHeader label="Produto" sortableKey="name" /></th>
                <th className="py-3 pr-4 font-medium"><SortHeader label="Categoria" sortableKey="category" /></th>
                <th className="py-3 pr-4 font-medium"><SortHeader label="Preço" sortableKey="price" /></th>
                <th className="py-3 pr-4 font-medium"><SortHeader label="Margem" sortableKey="margin" /></th>
                <th className="py-3 pr-4 font-medium"><SortHeader label="Estoque" sortableKey="stock" /></th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-0 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-complexo-light/10">
              {pageItems.map((p) => {
                const promoActive = isPromotionActive(p);
                const margin = p.price > 0 ? Math.round(((p.price - p.costPrice) / p.price) * 1000) / 10 : 0;
                const stockStatus = p.stock === 0 ? "Em falta" : p.stock <= p.minStock ? "Estoque baixo" : "Em estoque";
                return (
                  <Fragment key={p.id}>
                    <tr>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-complexo-light">{p.name}</p>
                        <p className="text-xs text-complexo-muted">{p.sku}{p.brand ? ` · ${p.brand}` : ""}</p>
                      </td>
                      <td className="py-3 pr-4 text-complexo-muted">{p.category}</td>
                      <td className="py-3 pr-4">
                        {promoActive ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-complexo-muted line-through">{formatBRL(p.price)}</span>
                            <span className="font-semibold text-complexo-red">{formatBRL(getEffectivePrice(p))}</span>
                          </div>
                        ) : (
                          <span className="text-complexo-light">{formatBRL(p.price)}</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-complexo-muted">{margin}%</td>
                      <td className="py-3 pr-4 text-complexo-muted">{p.stock} un.</td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-col gap-1">
                          <StatusBadge status={stockStatus} tone={stockStatus === "Em falta" ? "negative" : stockStatus === "Estoque baixo" ? "warning" : "positive"} />
                          {promoActive && <StatusBadge status="Promoção" tone="negative" />}
                        </div>
                      </td>
                      <td className="py-3 pr-0">
                        <div className="flex gap-1">
                          <button onClick={() => onEditProduct(p.id)} title="Editar" className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => onPromote(p.id)} title="Promover" className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-red">
                            <Tag className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setRestockingId(restockingId === p.id ? null : p.id)}
                            title="Repor estoque"
                            className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-emerald-500"
                          >
                            <PackagePlus className="h-4 w-4" />
                          </button>
                          <button onClick={() => setHistoryId(p.id)} title="Histórico" className="rounded-lg p-1.5 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light">
                            <History className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {restockingId === p.id && (
                      <tr>
                        <td colSpan={7} className="bg-complexo-panel/60 px-4 py-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm text-complexo-muted">Adicionar ao estoque de {p.name}:</span>
                            <input
                              type="number"
                              min={1}
                              value={restockAmount}
                              onChange={(e) => setRestockAmount(e.target.value)}
                              className="w-24 rounded-lg border border-complexo-light/10 bg-complexo-surface px-3 py-1.5 text-sm text-complexo-light focus:border-complexo-red focus:outline-none"
                            />
                            <button
                              onClick={() => handleConfirmRestock(p.id)}
                              className="rounded-full bg-complexo-red px-4 py-1.5 text-xs font-semibold text-white hover:bg-complexo-red-bright"
                            >
                              Confirmar
                            </button>
                            <button onClick={() => setRestockingId(null)} className="text-xs font-semibold text-complexo-muted hover:text-complexo-light">
                              Cancelar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          {pageItems.length === 0 && <p className="py-8 text-center text-sm text-complexo-muted">Nenhum produto encontrado com os filtros atuais.</p>}
        </div>

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-complexo-muted">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-complexo-light/10 p-2 text-complexo-muted hover:text-complexo-light disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-complexo-light/10 p-2 text-complexo-muted hover:text-complexo-light disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </SectionCard>

      <Modal open={!!historyId} onClose={() => setHistoryId(null)} title="Histórico de vendas" subtitle={historyProduct?.name}>
        {historySales.length === 0 ? (
          <p className="text-sm text-complexo-muted">Nenhuma venda registrada para este produto.</p>
        ) : (
          <div className="max-h-96 space-y-1 overflow-y-auto">
            {historySales.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-complexo-light/5">
                <span className="text-complexo-muted">{s.date.split("-").reverse().join("/")}</span>
                <span className="text-complexo-light">{s.quantity} un.</span>
                <span className="font-semibold text-complexo-light">{formatBRL(s.quantity * s.unitPrice)}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
