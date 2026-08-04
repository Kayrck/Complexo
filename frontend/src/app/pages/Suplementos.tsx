import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data";
import { useAppContext } from "../context";

const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export const Suplementos = () => {
  const [category, setCategory] = useState("Todos");
  const { cart, addToCart, setIsCartOpen, favorites, toggleFavorite } = useAppContext();

  const filtered = useMemo(
    () => (category === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-complexo-dark pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
              Complexo Suplementos
            </p>
            <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase lg:text-6xl">
              O showroom da performance
            </h1>
            <p className="mt-4 text-lg text-complexo-muted">
              Suplementação selecionada, com curadoria de quem entende de resultado.
            </p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-2 rounded-full border border-complexo-light/10 px-5 py-3 ${
              cartItemCount > 0 
                ? "bg-complexo-red text-white hover:bg-complexo-red-bright" 
                : "bg-complexo-surface text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
            }`}
          >
            <ShoppingBag className={`h-5 w-5 ${cartItemCount > 0 ? "" : "text-complexo-red"}`} />
            <span className="font-mono text-sm">
              {cartItemCount > 0 ? `Ver Carrinho (${cartItemCount})` : "Carrinho vazio"}
            </span>
          </button>
        </Reveal>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                category === c
                  ? "bg-complexo-red text-white"
                  : "border border-complexo-light/10 text-complexo-muted hover:text-complexo-light hover:bg-complexo-light/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard 
                product={p} 
                added={cart.some(item => item.id === p.id)} 
                onAdd={() => addToCart(p.id)} 
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={() => toggleFavorite(p.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};
