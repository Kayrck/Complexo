import { Dumbbell, ShoppingBag, HeartPulse } from "lucide-react";
import colagenoImg from "../imports/Col_geno_Hidrolisado_com__cido_Hialur_nico_Premium_Sabor_Laranja_Arium_Suplementos_300g.jpg";
import multiImg from "../imports/Multivitam_nico_Vitaplex_Multi-Vitamin_Complex_90C_-_Espartanos.jpg";
import bcaaImg from "../imports/Bcaa_Reinforce_8_1_1_Bluster_Nutrition_-_300g.jpg";
import preTreinoImg from "../imports/_vora_XT_Pr_-Treino__O_Suplemento_que_Vai_Revolucionar_Seu_Treino_.jpg";
import creatinaImg from "../imports/CREATINA_MONOHIDRATADA_100__PURA___MUNDIAL_NUTRITION.jpg";
import wheyImg from "../imports/_______Whey_Protein_Concentrado_Integralm_dica_900g___Ganho_de_Massa_Muscular_e_Recupera__o_R_pida.jpg";

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
