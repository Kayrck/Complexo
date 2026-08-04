import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AppProvider } from "./context";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Academia } from "./pages/Academia";
import { Planos } from "./pages/Planos";
import { Suplementos } from "./pages/Suplementos";
import { ProdutoDetalhe } from "./pages/ProdutoDetalhe";
import { Pilates } from "./pages/Pilates";
import { Nutricao } from "./pages/Nutricao";
import { Contato } from "./pages/Contato";
import { Login } from "./pages/Login";
import { Checkout } from "./pages/Checkout";
import { Favoritos } from "./pages/Favoritos";
import { DashboardAluno } from "./pages/DashboardAluno";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { Onboarding } from "./pages/Onboarding";
import { RequireRole } from "./components/RequireRole";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RootLayout = () => (
  <AppProvider>
    <div className="flex min-h-screen w-full flex-col bg-complexo-dark text-complexo-light">
      <ScrollToTop />
      <Navbar />
      <main className="w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  </AppProvider>
);

const BareLayout = () => (
  <AppProvider>
    <ScrollToTop />
    <Outlet />
    <CartDrawer />
  </AppProvider>
);

const ProtectedAluno = () => (
  <RequireRole role="aluno">
    <DashboardAluno />
  </RequireRole>
);

const ProtectedAdmin = () => (
  <RequireRole role="admin">
    <DashboardAdmin />
  </RequireRole>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "academia", Component: Academia },
      { path: "planos", Component: Planos },
      { path: "suplementos", Component: Suplementos },
      { path: "suplementos/:id", Component: ProdutoDetalhe },
      { path: "pilates", Component: Pilates },
      { path: "nutricao", Component: Nutricao },
      { path: "contato", Component: Contato },
      { path: "checkout/:planId", Component: Checkout },
      { path: "checkout", Component: Checkout },
      { path: "favoritos", Component: Favoritos },
    ],
  },
  {
    Component: BareLayout,
    children: [
      { path: "login", Component: Login },
      { path: "cadastro", Component: Onboarding },
      { path: "dashboard/aluno", Component: ProtectedAluno },
      { path: "dashboard/admin", Component: ProtectedAdmin },
    ],
  },
]);
