import type { Product } from "./data";

/**
 * Domínio de gestão de estoque: precificação, promoções, vendas e as
 * agregações que alimentam o dashboard do Estoque.
 *
 * Prototype note: mesma ressalva dos demais módulos (rbac.ts, hr.ts,
 * finance.ts) — dados e cálculos vivem em memória, sem back-end real ainda.
 * As funções de cálculo abaixo (preço a partir de margem, desconto,
 * detecção de prejuízo) são as regras de negócio reais e devem ser
 * espelhadas num serviço de back-end quando ele existir — a UI nunca decide
 * um preço sozinha, só chama estas funções.
 */

export interface Promotion {
  active: boolean;
  discountPercent: number;
  promoPrice: number;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface ProductSale {
  id: string;
  productId: string;
  date: string;
  quantity: number;
  unitPrice: number;
}

/* ------------------------------------------------------------------------ */
/* Precificação: custo, margem, preço                                       */
/* ------------------------------------------------------------------------ */

export interface PriceCalculation {
  price: number;
  profit: number;
  profitPercent: number;
}

const round2 = (value: number) => Math.round(value * 100) / 100;
const round1 = (value: number) => Math.round(value * 10) / 10;

export const formatBRL = (value: number) =>
  `R$${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * A partir do custo e da margem desejada, calcula o preço de venda.
 * Convenção adotada (igual ao exemplo do spec: custo R$80, margem 40% →
 * venda R$112): margem = lucro / custo (markup sobre o custo).
 */
export function calculatePriceFromMargin(costPrice: number, marginPercent: number): PriceCalculation {
  const price = round2(costPrice * (1 + marginPercent / 100));
  const profit = round2(price - costPrice);
  const profitPercent = price > 0 ? round1((profit / price) * 100) : 0;
  return { price, profit, profitPercent };
}

/** A partir do custo e do preço de venda já definido, calcula a margem efetiva. */
export function calculateMarginFromPrice(costPrice: number, price: number): { marginPercent: number; profit: number; profitPercent: number } {
  const profit = round2(price - costPrice);
  const marginPercent = costPrice > 0 ? round1((profit / costPrice) * 100) : 0;
  const profitPercent = price > 0 ? round1((profit / price) * 100) : 0;
  return { marginPercent, profit, profitPercent };
}

/* ------------------------------------------------------------------------ */
/* Promoções e desconto                                                     */
/* ------------------------------------------------------------------------ */

export interface DiscountCalculation {
  finalPrice: number;
  /** Lucro líquido — estrutura preparada para deduções futuras (taxas de venda etc.), igual ao bruto por ora. */
  profit: number;
  /** Percentual real de lucro após o desconto, sobre o preço final. */
  profitPercent: number;
  savedAmount: number;
  /** Margem restante após a promoção, sobre o custo (mesma convenção de calculatePriceFromMargin). */
  marginAfter: number;
  belowCost: boolean;
}

function buildDiscountResult(price: number, costPrice: number, finalPrice: number): DiscountCalculation {
  const clampedFinal = round2(finalPrice);
  const profit = round2(clampedFinal - costPrice);
  const profitPercent = clampedFinal > 0 ? round1((profit / clampedFinal) * 100) : 0;
  const savedAmount = round2(price - clampedFinal);
  const marginAfter = costPrice > 0 ? round1((profit / costPrice) * 100) : 0;
  return { finalPrice: clampedFinal, profit, profitPercent, savedAmount, marginAfter, belowCost: clampedFinal < costPrice };
}

export function calculateDiscountByPercent(price: number, costPrice: number, discountPercent: number): DiscountCalculation {
  return buildDiscountResult(price, costPrice, price * (1 - discountPercent / 100));
}

export function calculateDiscountByValue(price: number, costPrice: number, discountValue: number): DiscountCalculation {
  return buildDiscountResult(price, costPrice, price - discountValue);
}

export function isPromotionActive(product: Product, reference: Date = new Date()): boolean {
  const promo = product.promotion;
  if (!promo || !promo.active) return false;
  const today = reference.toISOString().slice(0, 10);
  return today >= promo.startDate && today <= promo.endDate;
}

/** Preço que o cliente paga agora — promocional se houver promoção ativa hoje, senão o preço de tabela. */
export function getEffectivePrice(product: Product, reference: Date = new Date()): number {
  return isPromotionActive(product, reference) ? product.promotion!.promoPrice : product.price;
}

/* ------------------------------------------------------------------------ */
/* Períodos                                                                 */
/* ------------------------------------------------------------------------ */

export type PeriodFilter = "hoje" | "semana" | "mes" | "trimestre" | "ano" | "personalizado";

export const PERIOD_LABELS: Record<PeriodFilter, string> = {
  hoje: "Hoje",
  semana: "Última semana",
  mes: "Último mês",
  trimestre: "Último trimestre",
  ano: "Último ano",
  personalizado: "Personalizado",
};

export interface PeriodRange {
  start: Date;
  end: Date;
}

export function resolvePeriodRange(
  filter: PeriodFilter,
  custom: { start: string; end: string } | null = null,
  reference: Date = new Date(),
): PeriodRange {
  if (filter === "personalizado" && custom?.start && custom?.end) {
    return { start: new Date(`${custom.start}T00:00:00`), end: new Date(`${custom.end}T23:59:59`) };
  }
  const end = new Date(reference);
  end.setHours(23, 59, 59, 999);
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);

  const daysBack: Record<Exclude<PeriodFilter, "personalizado">, number> = {
    hoje: 0,
    semana: 6,
    mes: 29,
    trimestre: 89,
    ano: 364,
  };
  const back = daysBack[filter as Exclude<PeriodFilter, "personalizado">] ?? 0;
  start.setDate(start.getDate() - back);
  return { start, end };
}

/** Período imediatamente anterior, com a mesma duração — base da comparação de tendência. */
export function previousPeriodRange(range: PeriodRange): PeriodRange {
  const durationMs = range.end.getTime() - range.start.getTime();
  const end = new Date(range.start.getTime() - 1000);
  const start = new Date(end.getTime() - durationMs);
  return { start, end };
}

/* ------------------------------------------------------------------------ */
/* Vendas: filtragem e agregação                                            */
/* ------------------------------------------------------------------------ */

export function salesInRange(sales: ProductSale[], range: PeriodRange, productId?: string): ProductSale[] {
  return sales.filter((s) => {
    if (productId && s.productId !== productId) return false;
    const d = new Date(`${s.date}T12:00:00`);
    return d >= range.start && d <= range.end;
  });
}

export function daysSinceLastSale(lastSaleDate: string | null, reference: Date = new Date()): number | null {
  if (!lastSaleDate) return null;
  const ref = new Date(reference);
  ref.setHours(0, 0, 0, 0);
  const last = new Date(`${lastSaleDate}T00:00:00`);
  return Math.round((ref.getTime() - last.getTime()) / 86400000);
}

export interface ProductRankingEntry {
  product: Product;
  quantitySold: number;
  revenue: number;
  profit: number;
  growthPercent: number;
  lastSaleDate: string | null;
  daysSinceLastSale: number | null;
  suggestPromotion: boolean;
}

export function rankProducts(products: Product[], sales: ProductSale[], range: PeriodRange, reference: Date = new Date()): ProductRankingEntry[] {
  const prevRange = previousPeriodRange(range);
  return products.map((p) => {
    const current = salesInRange(sales, range, p.id);
    const previous = salesInRange(sales, prevRange, p.id);
    const quantitySold = current.reduce((sum, s) => sum + s.quantity, 0);
    const revenue = round2(current.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0));
    const profit = round2(current.reduce((sum, s) => sum + s.quantity * (s.unitPrice - p.costPrice), 0));
    const prevQuantity = previous.reduce((sum, s) => sum + s.quantity, 0);
    const growthPercent = prevQuantity === 0 ? (quantitySold > 0 ? 100 : 0) : round1(((quantitySold - prevQuantity) / prevQuantity) * 100);
    const allSales = sales.filter((s) => s.productId === p.id).sort((a, b) => (a.date < b.date ? 1 : -1));
    const lastSaleDate = allSales[0]?.date ?? null;
    const sinceLast = daysSinceLastSale(lastSaleDate, reference);
    return {
      product: p,
      quantitySold,
      revenue,
      profit,
      growthPercent,
      lastSaleDate,
      daysSinceLastSale: sinceLast,
      suggestPromotion: quantitySold === 0 || (sinceLast ?? 999) > 30,
    };
  });
}

export interface CategoryTurnover {
  category: string;
  unitsSold: number;
  avgStock: number;
  /** Unidades vendidas / estoque médio no período — proxy simplificado (sem histórico de estoque diário). */
  turnoverRate: number;
}

export function turnoverByCategory(products: Product[], sales: ProductSale[], range: PeriodRange): CategoryTurnover[] {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return categories.map((category) => {
    const catProducts = products.filter((p) => p.category === category);
    const unitsSold = catProducts.reduce((sum, p) => sum + salesInRange(sales, range, p.id).reduce((s, x) => s + x.quantity, 0), 0);
    const avgStock = catProducts.reduce((sum, p) => sum + p.stock, 0);
    return { category, unitsSold, avgStock, turnoverRate: avgStock > 0 ? round2(unitsSold / avgStock) : 0 };
  });
}

export function salesSeries(sales: ProductSale[], months: string[]): { month: string; units: number; revenue: number }[] {
  return months.map((month) => {
    const monthSales = sales.filter((s) => s.date.startsWith(month));
    return {
      month,
      units: monthSales.reduce((sum, s) => sum + s.quantity, 0),
      revenue: round2(monthSales.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0)),
    };
  });
}

/* ------------------------------------------------------------------------ */
/* Dados de vendas (seed)                                                   */
/*                                                                          */
/* Cada produto tem um total de unidades vendidas por mês (fácil de ler e   */
/* conferir), expandido deterministicamente em lançamentos datados — dá     */
/* granularidade suficiente para os filtros de período sem exigir centenas  */
/* de linhas escritas à mão. Agosto/2026 é truncado no dia 5 (hoje é        */
/* 06/08/2026) para não gerar vendas no futuro.                             */
/* ------------------------------------------------------------------------ */

interface MonthlySalesSpec {
  productId: string;
  unitPrice: number;
  monthly: Record<string, number>;
}

const CURRENT_MONTH_CAP_DAY = 5;

function expandMonthlySales(spec: MonthlySalesSpec): ProductSale[] {
  const sales: ProductSale[] = [];
  for (const [month, totalUnits] of Object.entries(spec.monthly)) {
    if (!totalUnits) continue;
    const [year, monthNum] = month.split("-").map(Number);
    const daysInMonth = month === "2026-08" ? CURRENT_MONTH_CAP_DAY : new Date(year, monthNum, 0).getDate();
    const numTx = Math.max(1, Math.min(totalUnits, 5));
    const base = Math.floor(totalUnits / numTx);
    const remainder = totalUnits % numTx;
    for (let i = 0; i < numTx; i++) {
      const qty = base + (i < remainder ? 1 : 0);
      if (qty <= 0) continue;
      const day = Math.min(daysInMonth, Math.max(1, Math.round(((i + 1) / (numTx + 1)) * daysInMonth)));
      sales.push({
        id: `sale-${spec.productId}-${month}-${i}`,
        productId: spec.productId,
        date: `${month}-${String(day).padStart(2, "0")}`,
        quantity: qty,
        unitPrice: spec.unitPrice,
      });
    }
  }
  return sales;
}

const SALES_SPECS: MonthlySalesSpec[] = [
  { productId: "whey-iso", unitPrice: 189, monthly: { "2026-03": 18, "2026-04": 20, "2026-05": 22, "2026-06": 24, "2026-07": 26, "2026-08": 5 } },
  { productId: "creatina", unitPrice: 119, monthly: { "2026-03": 14, "2026-04": 16, "2026-05": 17, "2026-06": 19, "2026-07": 20, "2026-08": 4 } },
  { productId: "pre-treino", unitPrice: 139, monthly: { "2026-03": 9, "2026-04": 10, "2026-05": 11, "2026-06": 12, "2026-07": 13, "2026-08": 3 } },
  { productId: "colageno", unitPrice: 109, monthly: { "2026-03": 7, "2026-04": 7, "2026-05": 8, "2026-06": 9, "2026-07": 9, "2026-08": 2 } },
  { productId: "bcaa", unitPrice: 99, monthly: { "2026-03": 6, "2026-04": 7, "2026-05": 7, "2026-06": 8, "2026-07": 8, "2026-08": 2 } },
  { productId: "omega-3", unitPrice: 89, monthly: { "2026-03": 5, "2026-04": 6, "2026-05": 6, "2026-06": 7, "2026-07": 7, "2026-08": 1 } },
  { productId: "multi", unitPrice: 79, monthly: { "2026-03": 5, "2026-04": 5, "2026-05": 5, "2026-06": 6, "2026-07": 6, "2026-08": 1 } },
  { productId: "hipercalorico", unitPrice: 159, monthly: { "2026-03": 6, "2026-04": 5, "2026-05": 4, "2026-06": 3, "2026-07": 2, "2026-08": 0 } },
  { productId: "glutamina", unitPrice: 94, monthly: { "2026-03": 5, "2026-04": 4, "2026-05": 4, "2026-06": 3, "2026-07": 2, "2026-08": 0 } },
];

export const PRODUCT_SALES: ProductSale[] = SALES_SPECS.flatMap(expandMonthlySales);
