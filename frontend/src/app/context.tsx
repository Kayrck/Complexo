import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, PRODUCTS } from "./data";
import { Employee, EMPLOYEES, HourBankEntry, HOUR_BANK_ENTRIES, ScheduleChangeLog, SCHEDULE_CHANGES, type HourBankStatus } from "./hr";
import type { PermissionKey } from "./rbac";
import { AuditLogEntry, AUDIT_LOG_SEED, createAuditEntry } from "./auditLog";
import { getEmployeeId } from "./auth";
import { Receivable, RECEIVABLES, Payable, PAYABLES, type ReceivableStatus, type PayableStatus } from "./finance";

type CartItem = Product & { quantity: number };

interface AppContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProductStock: (productId: string, stock: number) => void;
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  employees: Employee[];
  /** Funcionário da sessão atual (demo auth) — undefined se não houver sessão admin ativa. */
  currentEmployee: Employee | undefined;
  addEmployee: (employee: Employee) => void;
  updateEmployeePermissions: (employeeId: string, overrides: Partial<Record<PermissionKey, boolean>>) => void;
  auditLog: AuditLogEntry[];
  logAudit: (entry: Omit<AuditLogEntry, "id" | "timestamp">) => void;
  hourBankEntries: HourBankEntry[];
  updateHourBankStatus: (entryId: string, status: HourBankStatus) => void;
  scheduleChanges: ScheduleChangeLog[];
  receivables: Receivable[];
  updateReceivableStatus: (id: string, status: ReceivableStatus) => void;
  payables: Payable[];
  updatePayableStatus: (id: string, status: PayableStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(AUDIT_LOG_SEED);
  const [hourBankEntries, setHourBankEntries] = useState<HourBankEntry[]>(HOUR_BANK_ENTRIES);
  const [scheduleChanges] = useState<ScheduleChangeLog[]>(SCHEDULE_CHANGES);
  const [receivables, setReceivables] = useState<Receivable[]>(RECEIVABLES);
  const [payables, setPayables] = useState<Payable[]>(PAYABLES);

  const currentEmployee = employees.find((e) => e.id === getEmployeeId());

  const logAudit = (entry: Omit<AuditLogEntry, "id" | "timestamp">) => {
    setAuditLog((prev) => [createAuditEntry(entry), ...prev]);
  };

  const updateHourBankStatus = (entryId: string, status: HourBankStatus) => {
    setHourBankEntries((prev) => prev.map((e) => (e.id === entryId ? { ...e, status } : e)));
  };

  const today = () => new Date().toISOString().slice(0, 10);

  const updateReceivableStatus = (id: string, status: ReceivableStatus) => {
    setReceivables((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, paidAt: status === "Pago" ? today() : r.paidAt } : r)),
    );
  };

  const updatePayableStatus = (id: string, status: PayableStatus) => {
    setPayables((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, paidAt: status === "Pago" ? today() : p.paidAt } : p)),
    );
  };

  const addEmployee = (employee: Employee) => {
    setEmployees((prev) => [employee, ...prev]);
  };

  const updateEmployeePermissions = (employeeId: string, overrides: Partial<Record<PermissionKey, boolean>>) => {
    setEmployees((prev) => prev.map((e) => (e.id === employeeId ? { ...e, permissionOverrides: overrides } : e)));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProductStock = (productId: string, stock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, stock) } : p)));
  };

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = products.find((p) => p.id === productId);
      if (product) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProductStock,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        favorites,
        toggleFavorite,
        employees,
        currentEmployee,
        addEmployee,
        updateEmployeePermissions,
        auditLog,
        logAudit,
        hourBankEntries,
        updateHourBankStatus,
        scheduleChanges,
        receivables,
        updateReceivableStatus,
        payables,
        updatePayableStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
