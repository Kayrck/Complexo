import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Plus, Heart } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PRODUCTS, Product } from "../data";
import { useAppContext } from "../context";

const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export const Suplementos = () => {
  const [category, setCategory] = useState("Todos");
  const { cart, addToCart, setIsCartOpen, favorites, toggleFavorite } = useAppContext();
  const navigate = useNavigate();

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

const ProductCard = ({
  product,
  added,
  onAdd,
  isFavorite,
  onToggleFavorite,
}: {
  product: Product;
  added: boolean;
  onAdd: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => (
  <div
    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-complexo-light/10 bg-complexo-surface"
    style={{ perspective: "1000px" }}
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
      <div
        className="absolute inset-0 opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: product.accent }}
      />
      <ImageWithFallback
        src={product.image}
        alt={product.name}
        className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:[transform:rotateY(8deg)]"
      />
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <button
          onClick={onToggleFavorite}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur ${
            isFavorite ? "text-complexo-red hover:bg-complexo-red hover:text-white" : "text-white hover:text-complexo-red"
          }`}
        >
           <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-complexo-muted">
        {product.category}
      </p>
      <h3 className="mt-1 font-semibold">{product.name}</h3>
      <p className="mt-1.5 flex-1 text-sm text-complexo-muted">{product.blurb}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-rajdhani text-2xl font-bold">R${product.price}</span>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-complexo-red px-4 py-2 text-sm font-semibold text-white hover:bg-complexo-red-bright"
        >
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  </div>
);
