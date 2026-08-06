import { useState } from "react";
import { Calculator } from "lucide-react";
import { DashboardView } from "./estoque/DashboardView";
import { ProductsView } from "./estoque/ProductsView";
import { ProductFormModal } from "./estoque/ProductFormModal";
import { PromotionModal } from "./estoque/PromotionModal";
import { PricingCalculatorModal } from "./estoque/PricingCalculatorModal";

const SUB_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "produtos", label: "Produtos" },
] as const;
type SubTab = (typeof SUB_TABS)[number]["id"];

export const EstoqueTab = () => {
  const [subTab, setSubTab] = useState<SubTab>("dashboard");

  const [formOpen, setFormOpen] = useState(false);
  const [formProductId, setFormProductId] = useState<string | null>(null);
  const [promotionOpen, setPromotionOpen] = useState(false);
  const [promotionProductId, setPromotionProductId] = useState<string | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorProductId, setCalculatorProductId] = useState<string | null>(null);

  const openCreateForm = () => {
    setFormProductId(null);
    setFormOpen(true);
  };
  const openEditForm = (id: string) => {
    setFormProductId(id);
    setFormOpen(true);
  };
  const openPromotion = (id: string) => {
    setPromotionProductId(id);
    setPromotionOpen(true);
  };
  const openCalculator = (id: string | null = null) => {
    setCalculatorProductId(id);
    setCalculatorOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">Estoque</h2>
          <p className="text-complexo-muted">Indicadores, precificação, promoções e gestão completa de produtos.</p>
        </div>
        <button
          onClick={() => openCalculator(null)}
          className="flex items-center gap-2 rounded-lg border border-complexo-light/10 px-4 py-2.5 text-sm font-semibold text-complexo-light hover:border-complexo-red hover:text-complexo-red"
        >
          <Calculator className="h-4 w-4" /> Calculadora de margem
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              subTab === t.id
                ? "border-complexo-red bg-complexo-red/10 text-complexo-red"
                : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "dashboard" ? (
        <DashboardView onPromote={openPromotion} />
      ) : (
        <ProductsView onNewProduct={openCreateForm} onEditProduct={openEditForm} onPromote={openPromotion} />
      )}

      <ProductFormModal open={formOpen} onClose={() => setFormOpen(false)} productId={formProductId} />
      <PromotionModal open={promotionOpen} onClose={() => setPromotionOpen(false)} productId={promotionProductId} />
      <PricingCalculatorModal open={calculatorOpen} onClose={() => setCalculatorOpen(false)} productId={calculatorProductId} />
    </div>
  );
};
