import { Dumbbell, ShoppingBag, HeartPulse } from "lucide-react";

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

export const UNIVERSE = [
  {
    id: "academia",
    name: "Academia",
    to: "/academia",
    icon: Dumbbell,
    desc: "Musculação e alta performance em estrutura de elite.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&h=1200&fit=crop&auto=format",
  },
  {
    id: "suplementos",
    name: "Suplementos",
    to: "/suplementos",
    icon: ShoppingBag,
    desc: "Suplementação selecionada para potencializar resultados.",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1000&h=1200&fit=crop&auto=format",
  },
  {
    id: "pilates",
    name: "Pilates",
    to: "/pilates",
    icon: HeartPulse,
    desc: "Mobilidade, recuperação e equilíbrio para o corpo.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&h=1200&fit=crop&auto=format",
  },
];
