import { Link } from "react-router";
import { Plus, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../data";

interface ProductCardProps {
  product: Product;
  added: boolean;
  onAdd: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

/** Shared product tile — used on Suplementos, the Home Loja carousel and
 * Favoritos, so the same card always leads to the same detail page. */
export const ProductCard = ({ product, added, onAdd, isFavorite, onToggleFavorite }: ProductCardProps) => (
  <div
    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-complexo-light/10 bg-complexo-surface"
    style={{ perspective: "1000px" }}
  >
    <Link to={`/suplementos/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-black/50">
      <div
        className="absolute inset-0 opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: product.accent }}
      />
      <ImageWithFallback
        src={product.image}
        alt={product.name}
        className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:[transform:rotateY(8deg)]"
      />
    </Link>
    <div className="absolute right-3 top-3 flex flex-col gap-2">
      <button
        onClick={onToggleFavorite}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur ${
          isFavorite ? "text-complexo-red hover:bg-complexo-red hover:text-white" : "text-white hover:text-complexo-red"
        }`}
      >
         <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-complexo-muted">
        {product.category}
      </p>
      <Link to={`/suplementos/${product.id}`} className="mt-1 font-semibold hover:text-complexo-red">
        {product.name}
      </Link>
      <p className="mt-1.5 flex-1 text-sm text-complexo-muted">{product.blurb}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-rajdhani text-2xl font-bold">R${product.price}</span>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-complexo-red px-4 py-2 text-sm font-semibold text-white hover:bg-complexo-red-bright"
        >
          <Plus className="h-4 w-4" /> {added ? "Adicionado" : "Adicionar"}
        </button>
      </div>
    </div>
  </div>
);
