import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useAppContext } from "../context";
import { useNavigate } from "react-router";

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const frete = subtotal > 300 ? 0 : 25; // Frete grátis acima de 300
  const total = subtotal + frete;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex-col bg-complexo-dark shadow-2xl transition-transform sm:border-l sm:border-complexo-light/10 flex">
        <div className="flex items-center justify-between border-b border-complexo-light/10 px-6 py-5">
          <h2 className="font-rajdhani text-2xl font-bold uppercase">Seu Carrinho</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-2 text-complexo-muted hover:bg-complexo-light/5 hover:text-complexo-light"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-complexo-light/5 text-complexo-muted">
                <Trash2 className="h-8 w-8" />
              </div>
              <p className="font-rajdhani text-xl font-bold uppercase text-complexo-light">Carrinho vazio</p>
              <p className="mt-2 text-complexo-muted">Você ainda não adicionou nenhum suplemento.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full bg-complexo-light/10 px-6 py-2.5 text-sm font-semibold text-complexo-light hover:bg-complexo-light/20"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-complexo-light/10 bg-complexo-surface">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-complexo-light">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-complexo-muted hover:text-complexo-red"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-mono text-[10px] uppercase text-complexo-muted">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-complexo-light/10 bg-complexo-panel px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-complexo-muted hover:text-complexo-light"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-complexo-muted hover:text-complexo-light"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-rajdhani text-lg font-bold">R${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-complexo-light/10 bg-complexo-surface px-6 py-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-complexo-muted">
                <span>Subtotal</span>
                <span className="text-complexo-light">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-complexo-muted">
                <span>Frete</span>
                <span className="text-complexo-light">{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</span>
              </div>
              <div className="my-4 h-px bg-complexo-light/10" />
              <div className="flex justify-between font-rajdhani text-2xl font-bold">
                <span>Total</span>
                <span className="text-complexo-red">R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-complexo-red py-4 font-semibold text-white hover:bg-complexo-red-bright"
            >
              Finalizar Compra <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
