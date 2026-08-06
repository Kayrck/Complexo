import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Modal } from "../../../../components/dashboard/Modal";
import { useAppContext } from "../../../../context";
import { calculateDiscountByPercent, calculateDiscountByValue, formatBRL } from "../../../../inventory";

const todayISO = () => new Date().toISOString().slice(0, 10);
const inTwoWeeksISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
};

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

export const PromotionModal = ({ open, onClose, productId }: PromotionModalProps) => {
  const { products, currentEmployee, updateProductPromotion } = useAppContext();
  const product = productId ? products.find((p) => p.id === productId) : undefined;
  const isAdminMaster = currentEmployee?.roleId === "admin_master";

  const [mode, setMode] = useState<"percent" | "value">("percent");
  const [discountPercent, setDiscountPercent] = useState("15");
  const [promoPrice, setPromoPrice] = useState("");
  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(inTwoWeeksISO());
  const [reason, setReason] = useState("");
  const [confirmBelowCost, setConfirmBelowCost] = useState(false);

  useEffect(() => {
    if (!open || !product) return;
    if (product.promotion) {
      setDiscountPercent(String(product.promotion.discountPercent));
      setPromoPrice(String(product.promotion.promoPrice));
      setStartDate(product.promotion.startDate);
      setEndDate(product.promotion.endDate);
      setReason(product.promotion.reason ?? "");
    } else {
      setDiscountPercent("15");
      setPromoPrice(product.price > 0 ? String(Math.round(product.price * 0.85 * 100) / 100) : "");
      setStartDate(todayISO());
      setEndDate(inTwoWeeksISO());
      setReason("");
    }
    setConfirmBelowCost(false);
    setMode("percent");
  }, [open, product]);

  if (!product) return null;

  const calc =
    mode === "percent"
      ? calculateDiscountByPercent(product.price, product.costPrice, Number(discountPercent) || 0)
      : calculateDiscountByValue(product.price, product.costPrice, product.price - (Number(promoPrice) || 0));
  const effectiveDiscountPercent = product.price > 0 ? Math.round((1 - calc.finalPrice / product.price) * 1000) / 10 : 0;

  const canConfirm = !calc.belowCost || (isAdminMaster && confirmBelowCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canConfirm || !startDate || !endDate) return;
    updateProductPromotion(product.id, {
      active: true,
      discountPercent: effectiveDiscountPercent,
      promoPrice: calc.finalPrice,
      startDate,
      endDate,
      reason: reason.trim() || undefined,
    });
    onClose();
  };

  const handleEndPromotion = () => {
    updateProductPromotion(product.id, undefined);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Promoção" subtitle={product.name} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-2">
          <button type="button" onClick={() => setMode("percent")} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${mode === "percent" ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted"}`}>
            Por percentual
          </button>
          <button type="button" onClick={() => setMode("value")} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${mode === "value" ? "border-complexo-red bg-complexo-red/10 text-complexo-red" : "border-complexo-light/10 text-complexo-muted"}`}>
            Por preço final
          </button>
        </div>

        {mode === "percent" ? (
          <Field label="Percentual de desconto (%)">
            <input type="number" min={0} max={100} step="0.1" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className={inputCls} />
          </Field>
        ) : (
          <Field label="Preço promocional (R$)">
            <input type="number" min={0} step="0.01" value={promoPrice} onChange={(e) => setPromoPrice(e.target.value)} className={inputCls} />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-4 rounded-xl border border-complexo-light/10 bg-complexo-panel p-4 text-center">
          <div>
            <p className="text-[10px] uppercase text-complexo-muted">Preço original</p>
            <p className="font-rajdhani text-lg font-bold text-complexo-muted line-through">{formatBRL(product.price)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-complexo-muted">Preço promocional</p>
            <p className={`font-rajdhani text-lg font-bold ${calc.belowCost ? "text-red-400" : "text-complexo-red"}`}>{formatBRL(calc.finalPrice)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-complexo-muted">Cliente economiza</p>
            <p className="font-semibold text-complexo-light">{formatBRL(calc.savedAmount)} ({effectiveDiscountPercent}%)</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-complexo-muted">Margem restante</p>
            <p className={`font-semibold ${calc.belowCost ? "text-red-400" : "text-emerald-500"}`}>{calc.marginAfter}%</p>
          </div>
        </div>

        {calc.belowCost && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-red-400">
              <AlertTriangle className="h-4 w-4" /> Esse preço fica abaixo do custo (prejuízo de {formatBRL(product.costPrice - calc.finalPrice)} por unidade).
            </p>
            {isAdminMaster ? (
              <label className="mt-3 flex items-center gap-2 text-sm text-complexo-light">
                <input type="checkbox" checked={confirmBelowCost} onChange={(e) => setConfirmBelowCost(e.target.checked)} className="h-4 w-4 accent-complexo-red" />
                Confirmo a promoção mesmo com prejuízo.
              </label>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-complexo-muted">
                <ShieldAlert className="h-3.5 w-3.5" /> Apenas o Admin Master pode autorizar uma promoção abaixo do custo.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field label="Início">
            <input required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Término">
            <input required type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className={inputCls} />
          </Field>
        </div>
        <Field label="Motivo (opcional)">
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex.: giro de estoque, aniversário da loja..." className={inputCls} />
        </Field>

        <div className="flex justify-between gap-3">
          {product.promotion ? (
            <button type="button" onClick={handleEndPromotion} className="rounded-full border border-complexo-light/10 px-5 py-3 text-sm font-semibold text-complexo-muted hover:text-complexo-light">
              Encerrar promoção
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={!canConfirm} className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright disabled:cursor-not-allowed disabled:opacity-40">
            Ativar promoção
          </button>
        </div>
      </form>
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
