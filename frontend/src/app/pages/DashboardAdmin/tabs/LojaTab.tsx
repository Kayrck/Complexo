import { Package, ShoppingCart, AlertTriangle, Truck } from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { PRODUCTS } from "../../../data";

const STOCK_LEVELS = [18, 6, 24, 3, 40, 12, 9, 2, 27];

const PEDIDOS = [
  { id: "#CPLX-4021", customer: "Marcos Andrade", items: "Whey Isolate ×2", total: "R$378", status: "Confirmado" },
  { id: "#CPLX-4020", customer: "Julia Santos", items: "Creatina, BCAA", total: "R$218", status: "Pendente" },
  { id: "#CPLX-4019", customer: "Roberto Lima", items: "Hipercalórico Mass", total: "R$159", status: "Confirmado" },
  { id: "#CPLX-4018", customer: "Camila Souza", items: "Ômega 3, Multivitamínico", total: "R$168", status: "Cancelado" },
];

const FORNECEDORES = [
  { name: "Growth Supplements", category: "Proteínas e creatina", contact: "comercial@growth.com.br" },
  { name: "Max Titanium", category: "Pré-treino e energéticos", contact: "vendas@maxtitanium.com.br" },
  { name: "Vitafor", category: "Vitaminas e bem-estar", contact: "atacado@vitafor.com.br" },
];

export const LojaTab = () => {
  const lowStock = PRODUCTS.filter((_, i) => STOCK_LEVELS[i] <= 6);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Loja de suplementos</h2>
        <p className="text-complexo-muted">Estoque, pedidos e fornecedores da Complexo Suplementos.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={ShoppingCart} label="Vendas no mês" value="R$24.000" trend="+18%" trendPositive />
        <StatCard icon={Package} label="Produtos cadastrados" value={`${PRODUCTS.length}`} />
        <StatCard icon={AlertTriangle} label="Estoque baixo" value={`${lowStock.length}`} suffix="produtos" />
      </div>

      <SectionCard title="Estoque de produtos">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-complexo-muted">
              <tr className="border-b border-complexo-light/10">
                <th className="py-3 pr-4 font-medium">Produto</th>
                <th className="py-3 pr-4 font-medium">Categoria</th>
                <th className="py-3 pr-4 font-medium">Preço</th>
                <th className="py-3 pr-0 font-medium">Em estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-complexo-light/10">
              {PRODUCTS.map((p, i) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 font-medium text-complexo-light">{p.name}</td>
                  <td className="py-3 pr-4 text-complexo-muted">{p.category}</td>
                  <td className="py-3 pr-4 text-complexo-muted">R${p.price}</td>
                  <td className="py-3 pr-0">
                    <span className={STOCK_LEVELS[i] <= 6 ? "font-semibold text-red-400" : "text-complexo-light"}>
                      {STOCK_LEVELS[i]} un.
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Pedidos recentes">
          <div className="divide-y divide-complexo-light/10">
            {PEDIDOS.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate font-medium text-complexo-light">{pedido.customer}</p>
                  <p className="truncate text-xs text-complexo-muted">{pedido.id} · {pedido.items}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-semibold text-complexo-light">{pedido.total}</span>
                  <StatusBadge status={pedido.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Fornecedores">
          <div className="space-y-3">
            {FORNECEDORES.map((f) => (
              <div key={f.name} className="flex items-start gap-3 rounded-lg bg-complexo-panel p-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-complexo-red" />
                <div>
                  <p className="font-medium text-complexo-light">{f.name}</p>
                  <p className="text-xs text-complexo-muted">{f.category} · {f.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
