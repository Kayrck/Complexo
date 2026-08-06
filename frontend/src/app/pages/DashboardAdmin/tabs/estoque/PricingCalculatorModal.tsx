import { useEffect, useState } from "react";
import { AlertTriangle, Calculator } from "lucide-react";
import { Modal } from "../../../../components/dashboard/Modal";
import { useAppContext } from "../../../../context";
import { calculatePriceFromMargin, calculateDiscountByPercent, calculateDiscountByValue, formatBRL } from "../../../../inventory";

type DiscountMode = "none" | "percent" | "value";

interface PricingCalculatorModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

/** Calculadora de margem e desconto — simula livremente; só altera o produto quando "Aplicar ao produto" é confirmado. */
export const PricingCalculatorModal = ({ open, onClose, productId }: PricingCalculatorModalProps) => {
  const { products, updateProductPricing } = useAppContext();
  const product = productId ? products.find((p) => p.id === productId) : undefined;

  const [costPrice, setCostPrice] = useState("100");
  const [marginPercent, setMarginPercent] = useState("50");
  const [discountMode, setDiscountMode] = useState<DiscountMode>("none");
  const [discountPercent, setDiscountPercent] = useState("20");
  const [discountValue, setDiscountValue] = useState("30");

  useEffect(() => {
    if (!open) return;
    if (product) {
      setCostPrice(String(product.costPrice));
      setMarginPercent(String(product.marginPercent));
    } else {
      setCostPrice("100");
      setMarginPercent("50");
    }
    setDiscountMode("none");
  }, [open, product]);

  const cost = Number(costPrice) || 0;
  const margin = Number(marginPercent) || 0;
  const base = calculatePriceFromMargin(cost, margin);

  const discounted =
    discountMode === "percent"
      ? calculateDiscountByPercent(base.price, cost, Number(discountPercent) || 0)
      : discountMode === "value"
        ? calculateDiscountByValue(base.price, cost, Number(discountValue) || 0)
        : null;

  const handleApply = () => {
    if (!product) return;
    updateProductPricing(product.id, cost, margin);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Calculadora de margem e desconto" subtitle={product ? product.name : "Simulação livre — não ligada a um produto"} maxWidth="max-w-xl">
      <div className="space-y-6">
        <div>
          <p className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-complexo-muted">
            <Calculator className="h-3.5 w-3.5" /> Precificação
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Preço de custo (R$)">
              <input type="number" min={0} step="0.01" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Margem de lucro desejada (%)">
              <input type="number" min={0} step="0.1" value={marginPercent} onChange={(e) => setMarginPercent(e.target.value)} className={inputCls} />
            </Field>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-center">
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Preço de venda</p>
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{formatBRL(base.price)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Lucro bruto</p>
              <p className="font-rajdhani text-xl font-bold text-emerald-500">{formatBRL(base.profit)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Lucro líquido*</p>
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{formatBRL(base.profit)}</p>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-complexo-muted">*Estrutura preparada para deduções futuras — igual ao lucro bruto até haver regra definida.</p>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-complexo-muted">Simular desconto sobre esse preço</p>
          <div className="flex gap-2">
            {(["none", "percent", "value"] as DiscountMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setDiscountMode(m)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${
                  discountMode === m ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted"
                }`}
              >
                {m === "none" ? "Sem desconto" : m === "percent" ? "Por percentual" : "Por valor"}
              </button>
            ))}
          </div>

          {discountMode === "percent" && (
            <div className="mt-3">
              <Field label="Percentual de desconto (%)">
                <input type="number" min={0} max={100} step="0.1" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className={inputCls} />
              </Field>
            </div>
          )}
          {discountMode === "value" && (
            <div className="mt-3">
              <Field label="Valor do desconto (R$)">
                <input type="number" min={0} step="0.01" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className={inputCls} />
              </Field>
            </div>
          )}

          {discounted && (
            <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-center sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase text-complexo-muted">Preço final</p>
                <p className={`font-rajdhani text-lg font-bold ${discounted.belowCost ? "text-red-400" : "text-complexo-red"}`}>{formatBRL(discounted.finalPrice)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-complexo-muted">Lucro bruto/líquido*</p>
                <p className={`font-rajdhani text-lg font-bold ${discounted.belowCost ? "text-red-400" : "text-emerald-500"}`}>{formatBRL(discounted.profit)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-complexo-muted">% real de lucro</p>
                <p className="font-semibold text-complexo-light">{discounted.profitPercent}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-complexo-muted">Cliente economiza</p>
                <p className="font-semibold text-complexo-light">{formatBRL(discounted.savedAmount)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-complexo-muted">Margem restante</p>
                <p className={`font-semibold ${discounted.belowCost ? "text-red-400" : "text-emerald-500"}`}>{discounted.marginAfter}%</p>
              </div>
            </div>
          )}

          {discounted?.belowCost && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Esse desconto deixa o preço abaixo do custo — resultaria em prejuízo de {formatBRL(cost - discounted.finalPrice)} por unidade. Para ativar isso como promoção real, use o botão "Promover" (exige confirmação do Admin Master).</span>
            </div>
          )}
          {discountMode !== "none" && (
            <p className="mt-3 text-xs text-complexo-muted">
              Essa simulação é só para referência. Para ativar de fato uma promoção com essas condições, use a ação "Promover" na lista de produtos.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-complexo-light/10 pt-5">
          <button type="button" onClick={onClose} className="rounded-full border border-complexo-light/10 px-6 py-3 font-semibold text-complexo-muted hover:text-complexo-light">
            Fechar
          </button>
          {product && (
            <button type="button" onClick={handleApply} className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright">
              Aplicar precificação ao produto
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

const inputCls =
  "w-full rounded-xl border border-complexo-light/10 bg-complexo-surface px-4 py-2.5 text-complexo-light placeholder:text-complexo-muted/60 focus:border-complexo-red focus:outline-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-complexo-muted">{label}</span>
    {children}
  </label>
);
