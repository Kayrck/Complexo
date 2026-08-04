import { Dumbbell, ShoppingBag, HeartPulse, Salad, LucideIcon } from "lucide-react";
import academiaImg from "../imports/academia/academia-sala-vermelha.png";
import pilatesImg from "../imports/pilates/pilates-estudio.png";
import suplementosImg from "../imports/suplementos/suplementos-creatina.png";

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

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  accent: string;
  image: string;
  blurb: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "whey-iso",
    name: "Whey Isolate",
    category: "Proteína",
    price: 189,
    accent: "#E10600",
    image: wheyImg,
    blurb: "27g de proteína por dose, absorção rápida.",
  },
  {
    id: "creatina",
    name: "Creatina Monohidratada",
    category: "Performance",
    price: 119,
    accent: "#2b6fff",
    image: creatinaImg,
    blurb: "Força e volume com 5g de creatina pura.",
  },
  {
    id: "pre-treino",
    name: "Pré-Treino Surge",
    category: "Energia",
    price: 139,
    accent: "#ff7a00",
    image: preTreinoImg,
    blurb: "Foco e energia explosiva para o treino.",
  },
  {
    id: "bcaa",
    name: "BCAA Recovery",
    category: "Recuperação",
    price: 99,
    accent: "#16a34a",
    image: bcaaImg,
    blurb: "Aminoácidos para recuperação muscular.",
  },
  {
    id: "multi",
    name: "Multivitamínico",
    category: "Saúde",
    price: 79,
    accent: "#9333ea",
    image: multiImg,
    blurb: "Suporte diário completo de vitaminas.",
  },
  {
    id: "colageno",
    name: "Colágeno Hidrolisado",
    category: "Bem-estar",
    price: 109,
    accent: "#db2777",
    image: colagenoImg,
    blurb: "Articulações, pele e tecidos saudáveis.",
  },
  {
    id: "omega-3",
    name: "Ômega 3",
    category: "Saúde",
    price: 89,
    accent: "#0891b2",
    image: omegaImg,
    blurb: "Saúde cardiovascular e função cerebral em dia.",
  },
  {
    id: "hipercalorico",
    name: "Hipercalórico Mass",
    category: "Performance",
    price: 159,
    accent: "#ca8a04",
    image: hipercaloricoImg,
    blurb: "Calorias de qualidade para ganho de massa real.",
  },
  {
    id: "glutamina",
    name: "Glutamina Pura",
    category: "Recuperação",
    price: 94,
    accent: "#65a30d",
    image: glutaminaImg,
    blurb: "Reduz o catabolismo e acelera a recuperação muscular.",
  },
];

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
