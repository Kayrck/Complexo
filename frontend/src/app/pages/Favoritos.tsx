import { HeartOff } from "lucide-react";
import { useAppContext } from "../context";
import { Link } from "react-router";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";

export const Favoritos = () => {
  const { products, cart, favorites, toggleFavorite, addToCart } = useAppContext();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-complexo-dark pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
                Sua lista de desejos
              </p>
              <h1 className="mt-3 font-rajdhani text-5xl font-bold uppercase lg:text-6xl">
                Meus Favoritos
              </h1>
            </div>
            <span className="rounded-full border border-complexo-light/10 bg-complexo-surface px-4 py-2 font-mono text-sm">
              {favorites.length} itens salvos
            </span>
          </div>
        </Reveal>

        {favoriteProducts.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center rounded-3xl border border-complexo-light/10 bg-complexo-surface py-24 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-complexo-light/5 text-complexo-muted">
                <HeartOff className="h-10 w-10" />
              </div>
              <h2 className="font-rajdhani text-3xl font-bold uppercase">Nenhum favorito ainda</h2>
              <p className="mt-3 max-w-md text-complexo-muted">
                Você ainda não possui produtos favoritos. Explore nosso showroom e salve os suplementos que mais combinam com seu treino.
              </p>
              <Link
                to="/suplementos"
                className="mt-8 rounded-full bg-complexo-red px-8 py-4 font-semibold text-white hover:bg-complexo-red-bright"
              >
                Explorar Produtos
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProductCard
                  product={p}
                  added={cart.some((item) => item.id === p.id)}
                  onAdd={() => addToCart(p.id)}
                  isFavorite
                  onToggleFavorite={() => toggleFavorite(p.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};