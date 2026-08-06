import { useEffect, useState } from "react";
import { Modal } from "../../../../components/dashboard/Modal";
import { useAppContext } from "../../../../context";
import { calculatePriceFromMargin, formatBRL } from "../../../../inventory";
import type { Product } from "../../../../data";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1775199603318-7f8a9a63b40d?w=600&h=750&fit=crop&auto=format";
const ACCENTS = ["#E10600", "#2b6fff", "#16a34a", "#ff7a00", "#9333ea", "#0891b2", "#db2777", "#ca8a04", "#65a30d"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const emptyForm = {
  name: "",
  category: "",
  brand: "",
  sku: "",
  barcode: "",
  costPrice: "",
  marginPercent: "60",
  stock: "0",
  minStock: "8",
  supplier: "",
  status: "ativo" as Product["status"],
  blurb: "",
  description: "",
  image: "",
};

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

export const ProductFormModal = ({ open, onClose, productId }: ProductFormModalProps) => {
  const { products, addProduct, updateProductDetails, updateProductPricing, updateProductStock } = useAppContext();
  const [form, setForm] = useState(emptyForm);
  const editing = productId ? products.find((p) => p.id === productId) : undefined;

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        name: editing.name,
        category: editing.category,
        brand: editing.brand ?? "",
        sku: editing.sku,
        barcode: editing.barcode ?? "",
        costPrice: String(editing.costPrice),
        marginPercent: String(editing.marginPercent),
        stock: String(editing.stock),
        minStock: String(editing.minStock),
        supplier: editing.supplier ?? "",
        status: editing.status,
        blurb: editing.blurb,
        description: editing.description,
        image: editing.image,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, editing]);

  const costPrice = Number(form.costPrice) || 0;
  const marginPercent = Number(form.marginPercent) || 0;
  const preview = calculatePriceFromMargin(costPrice, marginPercent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || costPrice <= 0) return;

    if (editing) {
      updateProductDetails(editing.id, {
        name: form.name.trim(),
        category: form.category.trim(),
        brand: form.brand.trim() || undefined,
        sku: form.sku.trim() || editing.sku,
        barcode: form.barcode.trim() || undefined,
        minStock: Number(form.minStock) || 0,
        supplier: form.supplier.trim() || undefined,
        status: form.status,
        blurb: form.blurb.trim() || editing.blurb,
        description: form.description.trim() || editing.description,
        image: form.image.trim() || editing.image,
      });
      if (costPrice !== editing.costPrice || marginPercent !== editing.marginPercent) {
        updateProductPricing(editing.id, costPrice, marginPercent);
      }
      const newStock = Number(form.stock);
      if (!Number.isNaN(newStock) && newStock !== editing.stock) {
        updateProductStock(editing.id, newStock);
      }
    } else {
      const id = `${slugify(form.name)}-${Date.now().toString(36).slice(-4)}`;
      const newProduct: Product = {
        id,
        name: form.name.trim(),
        category: form.category.trim(),
        brand: form.brand.trim() || undefined,
        sku: form.sku.trim() || `CPLX-${slugify(form.name).slice(0, 4).toUpperCase()}-001`,
        barcode: form.barcode.trim() || undefined,
        price: preview.price,
        costPrice,
        marginPercent,
        accent: ACCENTS[products.length % ACCENTS.length],
        image: form.image.trim() || DEFAULT_IMAGE,
        blurb: form.blurb.trim() || form.description.trim().slice(0, 80) || "Novo produto na loja Complexo.",
        description: form.description.trim() || "Descrição completa em breve.",
        stock: Number(form.stock) || 0,
        minStock: Number(form.minStock) || 5,
        supplier: form.supplier.trim() || undefined,
        status: form.status,
      };
      addProduct(newProduct);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Editar produto" : "Cadastrar produto"} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nome do produto">
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ex.: Albumina em Pó" className={inputCls} />
          </Field>
          <Field label="Categoria">
            <input required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Ex.: Proteína" className={inputCls} />
          </Field>
          <Field label="Marca">
            <input value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} placeholder="Ex.: Growth Supplements" className={inputCls} />
          </Field>
          <Field label="Fornecedor">
            <input value={form.supplier} onChange={(e) => setForm((f) => ({ ...f, supplier: e.target.value }))} placeholder="Ex.: Growth Supplements" className={inputCls} />
          </Field>
          <Field label="SKU">
            <input value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} placeholder="Gerado automaticamente se vazio" className={inputCls} />
          </Field>
          <Field label="Código de barras (opcional)">
            <input value={form.barcode} onChange={(e) => setForm((f) => ({ ...f, barcode: e.target.value }))} placeholder="Estrutura preparada p/ leitor" className={inputCls} />
          </Field>
        </div>

        <div className="rounded-xl border border-complexo-light/10 bg-complexo-panel p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-complexo-muted">Precificação</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Preço de custo (R$)">
              <input required type="number" min={0} step="0.01" value={form.costPrice} onChange={(e) => setForm((f) => ({ ...f, costPrice: e.target.value }))} className={inputCls} />
            </Field>
            <Field label="Margem de lucro (%)">
              <input required type="number" min={0} step="0.1" value={form.marginPercent} onChange={(e) => setForm((f) => ({ ...f, marginPercent: e.target.value }))} className={inputCls} />
            </Field>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Preço de venda</p>
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{formatBRL(preview.price)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Lucro por unidade</p>
              <p className="font-rajdhani text-xl font-bold text-emerald-500">{formatBRL(preview.profit)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-complexo-muted">Lucro percentual</p>
              <p className="font-rajdhani text-xl font-bold text-complexo-light">{preview.profitPercent}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Estoque atual">
            <input required type="number" min={0} value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Estoque mínimo">
            <input required type="number" min={0} value={form.minStock} onChange={(e) => setForm((f) => ({ ...f, minStock: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Product["status"] }))} className={inputCls}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </Field>
        </div>

        <Field label="URL da imagem (opcional)">
          <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="Usa uma imagem padrão se vazio" className={inputCls} />
        </Field>
        <Field label="Descrição curta (aparece nos cards)">
          <input value={form.blurb} onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))} placeholder="Uma frase curta sobre o produto" className={inputCls} />
        </Field>
        <Field label="Descrição completa (aparece na página do produto)">
          <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Descreva o produto, benefícios e diferenciais." className={`${inputCls} resize-none`} />
        </Field>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full border border-complexo-light/10 px-6 py-3 font-semibold text-complexo-muted hover:text-complexo-light">
            Cancelar
          </button>
          <button type="submit" className="rounded-full bg-complexo-red px-7 py-3 font-semibold text-white hover:bg-complexo-red-bright">
            {editing ? "Salvar alterações" : "Cadastrar produto"}
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
