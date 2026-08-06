import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { useAppContext } from "../context";
import { isPromotionActive, getEffectivePrice, formatBRL } from "../inventory";

export const ProdutoDetalhe = () => {
  const { id } = useParams();
  const { products, cart, addToCart, favorites, toggleFavorite, setIsCartOpen } = useAppContext();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-complexo-dark px-5 text-center">
        <h1 className="font-rajdhani text-3xl font-bold uppercase text-complexo-light">
          Produto não encontrado
        </h1>
        <p className="text-complexo-muted">Esse item pode ter saído do catálogo.</p>
        <Link
          to="/suplementos"
          className="rounded-full bg-complexo-red px-6 py-3 font-semibold text-white hover:bg-complexo-red-bright"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const inCart = cart.some((item) => item.id === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const promoActive = isPromotionActive(product);
  const effectivePrice = getEffectivePrice(product);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-complexo-dark pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <Link
            to="/suplementos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-complexo-muted hover:text-complexo-light"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à loja
          </Link>
        </Reveal>

        {/* Product header */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-complexo-light/10 bg-black/50">
              <div
                className="absolute inset-0 opacity-25 blur-3xl"
                style={{ background: product.accent }}
              />
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="relative h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest text-complexo-red">
              {product.category}
            </p>
            <h1 className="mt-3 font-rajdhani text-4xl font-bold uppercase lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-complexo-muted">{product.description}</p>

            {promoActive && (
              <span className="mt-4 inline-flex items-center rounded-full bg-complexo-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Promoção · -{product.promotion!.discountPercent}%
              </span>
            )}
            <div className="mt-4 flex items-baseline gap-3">
              {promoActive && (
                <span className="font-rajdhani text-2xl font-bold text-complexo-muted line-through">
                  {formatBRL(product.price)}
                </span>
              )}
              <span className={`font-rajdhani text-4xl font-bold ${promoActive ? "text-complexo-red" : ""}`}>
                {formatBRL(effectivePrice)}
              </span>
              {product.servingsPerContainer && (
                <span className="text-sm text-complexo-muted">
                  {product.servingsPerContainer} doses por pote
                </span>
              )}
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-complexo-red" />
                    <span className="text-complexo-light/85">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-complexo-light/10 bg-complexo-surface px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 text-complexo-muted hover:text-complexo-light"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 text-complexo-muted hover:text-complexo-light"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 rounded-full bg-complexo-red px-7 py-3.5 font-semibold text-white hover:bg-complexo-red-bright"
              >
                <ShoppingBag className="h-4 w-4" /> {inCart ? "Adicionar mais" : "Adicionar ao carrinho"}
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                  isFavorite
                    ? "border-complexo-red bg-complexo-red/10 text-complexo-red"
                    : "border-complexo-light/10 text-complexo-muted hover:text-complexo-light"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Details — only for products that already have this filled in */}
        {(product.howToUse || product.ingredients || (product.nutritionFacts && product.nutritionFacts.length > 0)) && (
          <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {(product.howToUse || product.ingredients) && (
              <Reveal className="lg:col-span-2">
                <div className="h-full rounded-2xl border border-complexo-light/10 bg-complexo-surface p-7">
                  {product.howToUse && (
                    <>
                      <h2 className="font-rajdhani text-2xl font-bold uppercase">Como usar</h2>
                      <p className="mt-3 text-complexo-muted">{product.howToUse}</p>
                      {product.servingSize && (
                        <p className="mt-2 text-sm text-complexo-muted">Porção: {product.servingSize}</p>
                      )}
                    </>
                  )}

                  {product.ingredients && (
                    <>
                      <h2 className={product.howToUse ? "mt-8 font-rajdhani text-2xl font-bold uppercase" : "font-rajdhani text-2xl font-bold uppercase"}>
                        Ingredientes
                      </h2>
                      <p className="mt-3 text-sm text-complexo-muted">{product.ingredients}</p>
                    </>
                  )}
                </div>
              </Reveal>
            )}

            {product.nutritionFacts && product.nutritionFacts.length > 0 && (
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-complexo-light/10 bg-complexo-surface p-7">
                  <h2 className="font-rajdhani text-2xl font-bold uppercase">Tabela nutricional</h2>
                  {product.servingSize && (
                    <p className="mt-1 text-xs text-complexo-muted">Porção de {product.servingSize}</p>
                  )}
                  <div className="mt-5 divide-y divide-complexo-light/10">
                    {product.nutritionFacts.map((fact) => (
                      <div key={fact.label} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="text-complexo-muted">{fact.label}</span>
                        <span className="font-semibold text-complexo-light">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="font-rajdhani text-3xl font-bold uppercase">Você também pode gostar</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <ProductCard
                    product={p}
                    added={cart.some((item) => item.id === p.id)}
                    onAdd={() => addToCart(p.id)}
                    isFavorite={favorites.includes(p.id)}
                    onToggleFavorite={() => toggleFavorite(p.id)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
