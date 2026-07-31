import { Link, useLocation } from "react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { BoltMark } from "./BoltMark";
import { MagneticButton } from "./MagneticButton";
import { useAppContext } from "../context";

const NAV_LINKS = [
  { name: "Academia", path: "/academia" },
  { name: "Planos", path: "/planos" },
  { name: "Suplementos", path: "/suplementos" },
  { name: "Pilates", path: "/pilates" },
  { name: "Favoritos", path: "/favoritos" },
  { name: "Área do Aluno", path: "/login" },
  { name: "Contato", path: "/contato" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isPilates = location.pathname === "/pilates";
  const { cart, setIsCartOpen } = useAppContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? isPilates
            ? "border-b border-black/10 bg-pilates-bg/80 backdrop-blur-xl"
            : "border-b border-white/10 bg-complexo-dark/80 backdrop-blur-xl"
          : "border-b border-transparent",
        isPilates ? "text-pilates-text" : "text-complexo-light",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-complexo-red">
            <BoltMark className="h-5 w-5 text-white" />
          </span>
          <span className="font-rajdhani text-xl font-bold uppercase tracking-[0.18em]">
            Complexo
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-complexo-red"
                    : isPilates
                      ? "text-pilates-text/70 hover:text-pilates-text"
                      : "text-complexo-light/70 hover:text-complexo-light",
                )}
              >
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-complexo-red"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Carrinho"
            className={clsx(
              "relative rounded-lg p-2 transition-colors",
              isPilates ? "hover:bg-black/5" : "hover:bg-white/5",
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-complexo-red text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </button>
          <MagneticButton
            as={Link}
            to="/planos"
            className="rounded-full bg-complexo-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-complexo-red-bright"
          >
            Matricule-se
          </MagneticButton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Carrinho"
            className={clsx(
              "relative rounded-lg p-2 transition-colors",
              isPilates ? "hover:bg-black/5" : "hover:bg-white/5",
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-complexo-red text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button
            className="rounded-lg p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={clsx(
              "overflow-hidden lg:hidden",
              isPilates ? "bg-pilates-bg" : "bg-complexo-panel",
            )}
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/planos"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-complexo-red px-5 py-3 text-center text-base font-semibold text-white"
              >
                Matricule-se
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
