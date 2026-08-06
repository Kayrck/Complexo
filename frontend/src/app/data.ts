import { Dumbbell, ShoppingBag, HeartPulse, Salad, LucideIcon } from "lucide-react";
import type { Promotion } from "./inventory";
import academiaImg from "../imports/academia/academia-sala-vermelha.png";
import pilatesImg from "../imports/pilates/pilates-estudio.png";
import suplementosImg from "../imports/suplementos/suplementos-creatina.png";
import nutricaoImg from "../imports/nutricao/cafe-da-manha.jpg";

/** Fotos genéricas de banco de imagens (Unsplash, mesma licença já usada no
 * projeto) — não são as embalagens reais dos produtos, só ilustrativas. */
const wheyImg = "https://images.unsplash.com/photo-1775199603318-7f8a9a63b40d?w=600&h=750&fit=crop&auto=format";
const creatinaImg = "https://images.unsplash.com/photo-1724160167630-a33086ddb552?w=600&h=750&fit=crop&auto=format";
const preTreinoImg = "https://images.unsplash.com/photo-1704650311162-153bbf7f17b0?w=600&h=750&fit=crop&auto=format";
const bcaaImg = "https://images.unsplash.com/photo-1693996046865-19217d179161?w=600&h=750&fit=crop&auto=format";
const multiImg = "https://images.unsplash.com/photo-1596177583101-26b7dada4f5c?w=600&h=750&fit=crop&auto=format";
const colagenoImg = "https://images.unsplash.com/photo-1693996046506-b6571eaa8259?w=600&h=750&fit=crop&auto=format";
const omegaImg = "https://images.unsplash.com/photo-1743535681049-512db5983e73?w=600&h=750&fit=crop&auto=format";
const hipercaloricoImg = "https://images.unsplash.com/photo-1693996045346-d0a9b9470909?w=600&h=750&fit=crop&auto=format";
const glutaminaImg = "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11?w=600&h=750&fit=crop&auto=format";

export interface Plan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  popular?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: 89,
    tagline: "Para começar a evoluir.",
    features: [
      "Acesso total à musculação",
      "Área de cardio e funcional",
      "App de treinos Complexo",
      "Avaliação física inicial",
    ],
  },
  {
    id: "performance",
    name: "Performance",
    price: 149,
    tagline: "O equilíbrio entre treino e resultado.",
    popular: true,
    features: [
      "Tudo do Essencial",
      "Acompanhamento mensal",
      "10% off na loja de suplementos",
      "1 aula de Pilates por semana",
      "Acesso a aulas coletivas",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 229,
    tagline: "A experiência Complexo completa.",
    features: [
      "Tudo do Performance",
      "Personal trainer dedicado",
      "Pilates ilimitado",
      "20% off na loja de suplementos",
      "Nutricionista parceiro",
    ],
  },
];

export const getPlan = (id?: string) => PLANS.find((p) => p.id === id);

/** Simple comparison matrix powering the Planos comparator. */
export const PLAN_MATRIX: { label: string; values: (boolean | string)[] }[] = [
  { label: "Musculação e cardio", values: [true, true, true] },
  { label: "App de treinos", values: [true, true, true] },
  { label: "Aulas coletivas", values: [false, true, true] },
  { label: "Aulas de Pilates", values: ["—", "1x / semana", "Ilimitado"] },
  { label: "Desconto na loja", values: ["—", "10%", "20%"] },
  { label: "Personal dedicado", values: [false, false, true] },
];

export interface NutritionFact {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  /** Código interno único do produto. */
  sku: string;
  /** EAN/UPC — estrutura preparada para leitor de código de barras; não validado por dígito verificador. */
  barcode?: string;
  /** Preço de venda atual — derivado de costPrice + marginPercent sempre que um dos dois é editado (ver inventory.ts). */
  price: number;
  costPrice: number;
  /** Margem sobre o custo (markup): (price - costPrice) / costPrice * 100. */
  marginPercent: number;
  accent: string;
  image: string;
  blurb: string;
  /** Longer, detail-page description. */
  description: string;
  /** Units currently in stock at the Suplementos unit. */
  stock: number;
  /** Nível a partir do qual o produto entra em alerta de estoque baixo. */
  minStock: number;
  supplier?: string;
  status: "ativo" | "inativo";
  promotion?: Promotion;
  /** Detail fields — optional since a freshly published product may not have
   * all of this filled in yet. */
  servingSize?: string;
  servingsPerContainer?: number;
  howToUse?: string;
  benefits?: string[];
  nutritionFacts?: NutritionFact[];
  ingredients?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "whey-iso",
    name: "Whey Isolate",
    category: "Proteína",
    brand: "Growth Supplements",
    sku: "CPLX-WHEY-001",
    barcode: "7891000000013",
    price: 189,
    costPrice: 108,
    marginPercent: 75,
    accent: "#E10600",
    image: wheyImg,
    blurb: "27g de proteína por dose, absorção rápida.",
    stock: 18,
    minStock: 15,
    supplier: "Growth Supplements",
    status: "ativo",
    description:
      "Proteína isolada do soro do leite, com absorção rápida e baixo teor de carboidratos e gordura. Ideal para o pós-treino, quando o corpo mais precisa de aminoácidos para iniciar a recuperação muscular.",
    servingSize: "1 scoop (30g)",
    servingsPerContainer: 30,
    howToUse: "Misture 1 scoop (30g) em 200ml de água ou leite. Consuma preferencialmente até 30 minutos após o treino.",
    benefits: [
      "27g de proteína por dose",
      "Baixo teor de lactose",
      "Absorção rápida",
      "Perfil completo de aminoácidos essenciais",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "120kcal" },
      { label: "Proteínas", value: "27g" },
      { label: "Carboidratos", value: "2g" },
      { label: "Gorduras totais", value: "1g" },
      { label: "Sódio", value: "90mg" },
    ],
    ingredients: "Isolado proteico do soro do leite (Whey Protein Isolate), aromatizante, edulcorantes (sucralose, acessulfame-K), lecitina de soja.",
  },
  {
    id: "creatina",
    name: "Creatina Monohidratada",
    category: "Performance",
    brand: "Growth Supplements",
    sku: "CPLX-CREA-001",
    barcode: "7891000000020",
    price: 119,
    costPrice: 68,
    marginPercent: 75,
    accent: "#2b6fff",
    image: creatinaImg,
    blurb: "Força e volume com 5g de creatina pura.",
    stock: 6,
    minStock: 10,
    supplier: "Growth Supplements",
    status: "ativo",
    description:
      "Um dos suplementos mais estudados do mercado, ajuda a aumentar a força, a potência e o volume muscular. Ótima para quem treina musculação com foco em ganho de performance.",
    servingSize: "1 dose (5g)",
    servingsPerContainer: 60,
    howToUse: "Consuma 5g por dia, em qualquer horário. Não é necessário ciclar.",
    benefits: [
      "Aumento de força e potência",
      "100% pura, sem misturas",
      "Sem necessidade de fase de saturação",
      "Suporte à recuperação entre séries",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "0kcal" },
      { label: "Creatina monohidratada", value: "5g" },
    ],
    ingredients: "Creatina monohidratada 100% pura.",
  },
  {
    id: "pre-treino",
    name: "Pré-Treino Surge",
    category: "Energia",
    brand: "Max Titanium",
    sku: "CPLX-PRET-001",
    barcode: "7891000000037",
    price: 140,
    costPrice: 80,
    marginPercent: 75,
    accent: "#ff7a00",
    image: preTreinoImg,
    blurb: "Foco e energia explosiva para o treino.",
    stock: 24,
    minStock: 10,
    supplier: "Max Titanium",
    status: "ativo",
    description: "Fórmula estimulante para energia e foco explosivos, pensada pra quem quer levar cada treino ao limite.",
    servingSize: "1 dose (10g)",
    servingsPerContainer: 30,
    howToUse: "Misture 1 dose em 200ml de água, 20 a 30 minutos antes do treino. Não consumir à noite.",
    benefits: [
      "Energia e foco imediatos",
      "Cafeína + beta-alanina",
      "Melhora a resistência muscular",
      "Sabor refrescante",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "15kcal" },
      { label: "Cafeína", value: "200mg" },
      { label: "Beta-alanina", value: "3,2g" },
      { label: "Citrulina malato", value: "6g" },
    ],
    ingredients: "Citrulina malato, beta-alanina, cafeína anidra, taurina, aromatizante, edulcorantes.",
  },
  {
    id: "bcaa",
    name: "BCAA Recovery",
    category: "Recuperação",
    brand: "Max Titanium",
    sku: "CPLX-BCAA-001",
    barcode: "7891000000044",
    price: 99,
    costPrice: 60,
    marginPercent: 65,
    accent: "#16a34a",
    image: bcaaImg,
    blurb: "Aminoácidos para recuperação muscular.",
    stock: 3,
    minStock: 8,
    supplier: "Max Titanium",
    status: "ativo",
    description: "Aminoácidos de cadeia ramificada para reduzir o catabolismo muscular e acelerar a recuperação entre os treinos.",
    servingSize: "1 dose (10g)",
    servingsPerContainer: 30,
    howToUse: "Consuma 1 dose durante ou logo após o treino.",
    benefits: [
      "Proporção 2:1:1 (leucina, isoleucina, valina)",
      "Reduz a fadiga muscular",
      "Auxilia na recuperação",
      "Livre de açúcar",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "20kcal" },
      { label: "BCAA", value: "10g" },
      { label: "Leucina", value: "5g" },
      { label: "Isoleucina", value: "2,5g" },
      { label: "Valina", value: "2,5g" },
    ],
    ingredients: "L-leucina, L-isoleucina, L-valina, aromatizante, edulcorantes.",
  },
  {
    id: "multi",
    name: "Multivitamínico",
    category: "Saúde",
    brand: "Vitafor",
    sku: "CPLX-MULT-001",
    barcode: "7891000000051",
    price: 80,
    costPrice: 50,
    marginPercent: 60,
    accent: "#9333ea",
    image: multiImg,
    blurb: "Suporte diário completo de vitaminas.",
    stock: 40,
    minStock: 10,
    supplier: "Vitafor",
    status: "ativo",
    description: "Suporte diário completo com vitaminas e minerais essenciais para manter o corpo em equilíbrio, mesmo na rotina mais corrida.",
    servingSize: "1 cápsula",
    servingsPerContainer: 60,
    howToUse: "Tome 1 cápsula ao dia, junto de uma refeição.",
    benefits: [
      "Fórmula completa com 12 vitaminas e minerais",
      "Suporte à imunidade",
      "Praticidade no dia a dia",
      "1 cápsula por dia",
    ],
    nutritionFacts: [
      { label: "Vitamina C", value: "90mg" },
      { label: "Vitamina D", value: "10mcg" },
      { label: "Zinco", value: "11mg" },
      { label: "Magnésio", value: "100mg" },
      { label: "Complexo B", value: "100% VD" },
    ],
    ingredients: "Vitaminas A, C, D, E, complexo B, minerais quelados (zinco, magnésio, selênio), cápsula vegetal.",
  },
  {
    id: "colageno",
    name: "Colágeno Hidrolisado",
    category: "Bem-estar",
    brand: "Vitafor",
    sku: "CPLX-COLA-001",
    barcode: "7891000000068",
    price: 109.2,
    costPrice: 65,
    marginPercent: 68,
    accent: "#db2777",
    image: colagenoImg,
    blurb: "Articulações, pele e tecidos saudáveis.",
    stock: 12,
    minStock: 8,
    supplier: "Vitafor",
    status: "ativo",
    description: "Colágeno tipo I e III hidrolisado, formulado para apoiar a saúde da pele, cabelos, unhas e articulações.",
    servingSize: "1 dose (10g)",
    servingsPerContainer: 30,
    howToUse: "Misture 1 dose em água, suco ou vitamina, 1 vez ao dia.",
    benefits: [
      "Peptídeos de baixo peso molecular",
      "Apoia pele, cabelo e unhas",
      "Suporte às articulações",
      "Sem sabor, dissolve fácil",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "35kcal" },
      { label: "Proteínas", value: "9g" },
      { label: "Colágeno hidrolisado", value: "10g" },
    ],
    ingredients: "Colágeno hidrolisado (peptídeos de colágeno bovino), vitamina C.",
  },
  {
    id: "omega-3",
    name: "Ômega 3",
    category: "Saúde",
    brand: "Vitafor",
    sku: "CPLX-OMEG-001",
    barcode: "7891000000075",
    price: 88.92,
    costPrice: 52,
    marginPercent: 71,
    accent: "#0891b2",
    image: omegaImg,
    blurb: "Saúde cardiovascular e função cerebral em dia.",
    stock: 9,
    minStock: 8,
    supplier: "Vitafor",
    status: "ativo",
    description: "Ácidos graxos EPA e DHA para apoiar a saúde cardiovascular, cognitiva e o processo de recuperação do corpo.",
    servingSize: "2 cápsulas",
    servingsPerContainer: 60,
    howToUse: "Tome 2 cápsulas ao dia, junto de uma refeição.",
    benefits: [
      "Alta concentração de EPA e DHA",
      "Suporte cardiovascular",
      "Ação anti-inflamatória",
      "Cápsulas de fácil deglutição",
    ],
    nutritionFacts: [
      { label: "Óleo de peixe", value: "2000mg" },
      { label: "EPA", value: "360mg" },
      { label: "DHA", value: "240mg" },
    ],
    ingredients: "Óleo de peixe concentrado, cápsula de gelatina, antioxidante (vitamina E).",
  },
  {
    id: "hipercalorico",
    name: "Hipercalórico Mass",
    category: "Performance",
    brand: "Growth Supplements",
    sku: "CPLX-HIPE-001",
    barcode: "7891000000082",
    price: 158.65,
    costPrice: 95,
    marginPercent: 67,
    accent: "#ca8a04",
    image: hipercaloricoImg,
    blurb: "Calorias de qualidade para ganho de massa real.",
    stock: 2,
    minStock: 5,
    supplier: "Growth Supplements",
    status: "ativo",
    description: "Calorias de qualidade em cada dose, combinando carboidratos, proteínas e gorduras boas para quem busca ganho de massa real.",
    servingSize: "2 scoops (150g)",
    servingsPerContainer: 20,
    howToUse: "Misture 2 scoops em 400ml de leite ou água. Consuma entre as refeições ou após o treino.",
    benefits: [
      "600kcal por dose",
      "50g de proteína por dose",
      "Carboidratos de absorção mista",
      "Enriquecido com vitaminas e minerais",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "600kcal" },
      { label: "Proteínas", value: "50g" },
      { label: "Carboidratos", value: "85g" },
      { label: "Gorduras totais", value: "8g" },
    ],
    ingredients: "Maltodextrina, concentrado proteico do soro do leite, aveia em flocos, óleo de triglicerídeos de cadeia média (TCM), vitaminas e minerais.",
  },
  {
    id: "glutamina",
    name: "Glutamina Pura",
    category: "Recuperação",
    brand: "Max Titanium",
    sku: "CPLX-GLUT-001",
    barcode: "7891000000099",
    price: 94.05,
    costPrice: 55,
    marginPercent: 71,
    accent: "#65a30d",
    image: glutaminaImg,
    blurb: "Reduz o catabolismo e acelera a recuperação muscular.",
    stock: 27,
    minStock: 10,
    supplier: "Max Titanium",
    status: "ativo",
    description: "Aminoácido mais abundante no corpo, ajuda a reduzir o catabolismo muscular e apoia o sistema imunológico em períodos de treino intenso.",
    servingSize: "1 dose (5g)",
    servingsPerContainer: 60,
    howToUse: "Consuma 5g após o treino ou antes de dormir.",
    benefits: [
      "100% L-glutamina pura",
      "Reduz o catabolismo muscular",
      "Apoia a recuperação intestinal e imunológica",
      "Sem sabor",
    ],
    nutritionFacts: [
      { label: "Valor energético", value: "0kcal" },
      { label: "L-glutamina", value: "5g" },
    ],
    ingredients: "L-glutamina 100% pura.",
  },
];

export const getProduct = (id?: string) => PRODUCTS.find((p) => p.id === id);

export interface BusinessInfo {
  id: string;
  /** Short label used in nav/cards, e.g. "Pilates". */
  name: string;
  /** Full brand label, e.g. "Complexo Pilates". */
  fullName: string;
  to: string;
  desc: string;
  icon: LucideIcon;
  /** Cover photo for generic listings (Universo grid). Omit when no photo
   * should represent this unit there — e.g. Nutrição uses a styled card
   * instead of the nutritionist's personal photo, which only appears on
   * her own /nutricao page. */
  image?: string;
  /** First address line — street and number. */
  address: string;
  /** Second address line — neighborhood, city/state, CEP. */
  addressCity: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  climatizado: boolean;
}

/**
 * Single source of truth for each business unit's contact info. Referenced by
 * the Footer (dynamic per-section), Contato, Navbar and the Home "Universo"
 * grid — update an address/phone here and it's correct everywhere.
 */
export const BUSINESSES: BusinessInfo[] = [
  {
    id: "academia",
    name: "Academia",
    fullName: "Complexo Academia",
    to: "/academia",
    desc: "Musculação e alta performance em estrutura de elite.",
    icon: Dumbbell,
    image: academiaImg,
    address: "Frederico Augusto, 117",
    addressCity: "Guaiúba - CE, CEP 61890-000",
    phone: "+55 85 98683-0769",
    phoneHref: "tel:+5585986830769",
    whatsappHref: "https://wa.me/5585986830769",
    climatizado: false,
  },
  {
    id: "pilates",
    name: "Pilates",
    fullName: "Complexo Pilates",
    to: "/pilates",
    desc: "Mobilidade, recuperação e equilíbrio para o corpo.",
    icon: HeartPulse,
    image: pilatesImg,
    address: "Rua Pedro Augusto",
    addressCity: "Centro - Guaiúba - CE",
    phone: "+55 85 98866-4882",
    phoneHref: "tel:+5585988664882",
    whatsappHref: "https://wa.me/5585988664882",
    climatizado: true,
  },
  {
    id: "suplementos",
    name: "Suplementos",
    fullName: "Complexo Suplementos",
    to: "/suplementos",
    desc: "Suplementação selecionada para potencializar resultados.",
    icon: ShoppingBag,
    image: suplementosImg,
    address: "Rua Antônio Acioly, nº 196",
    addressCity: "Guaiúba - CE, CEP 61890-000",
    phone: "+55 85 98866-4882",
    phoneHref: "tel:+5585988664882",
    whatsappHref: "https://wa.me/5585988664882",
    climatizado: false,
  },
  {
    id: "nutricao",
    name: "Nutrição",
    fullName: "Nutri Complexo",
    to: "/nutricao",
    desc: "Acompanhamento nutricional para potencializar seu treino.",
    icon: Salad,
    image: nutricaoImg,
    address: "Rua Pedro Augusto",
    addressCity: "Centro - Guaiúba - CE",
    phone: "+55 85 98866-4882",
    phoneHref: "tel:+5585988664882",
    whatsappHref: "https://wa.me/5585988664882",
    climatizado: true,
  },
];

export const getBusiness = (id?: string) => BUSINESSES.find((b) => b.id === id);

/** Home "Universo Complexo" grid — every business unit, same source as the Footer. */
export const UNIVERSE = BUSINESSES;
