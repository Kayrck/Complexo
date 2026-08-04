import { ShoppingCart, Package, Truck } from "lucide-react";
import { StatCard } from "../../../components/dashboard/StatCard";
import { SectionCard } from "../../../components/dashboard/SectionCard";
import { StatusBadge } from "../../../components/dashboard/StatusBadge";
import { useAppContext } from "../../../context";

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
  const { products } = useAppContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Loja de suplementos</h2>
        <p className="text-complexo-muted">
          Vendas, pedidos e fornecedores da Complexo Suplementos — estoque e publicação de produtos ficam na aba
          Estoque.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard icon={ShoppingCart} label="Vendas no mês" value="R$24.000" trend="+18%" trendPositive />
        <StatCard icon={Package} label="Produtos cadastrados" value={`${products.length}`} />
      </div>

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
