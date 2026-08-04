/**
 * Demo-only access gate for the Área do Aluno / Área Administrativa
 * prototypes. There is no real backend auth yet (see backend/src/routes/auth.ts)
 * — this just keeps the two areas from being wide open and gives the login
 * screen something real to check. Not for production use.
 */
export type DemoRole = "aluno" | "admin";

interface DemoUser {
  password: string;
  role: DemoRole;
  /** Liga o login de demonstração a um Employee real (hr.ts), para que o
   * painel administrativo aplique o RBAC granular daquele funcionário em vez
   * de um admin genérico. */
  employeeId?: string;
  label?: string;
}

export const DEMO_CREDENTIALS: { email: string; password: string; role: DemoRole; employeeId?: string; label?: string }[] = [
  { email: "aluno@complexo.com", password: "123456", role: "aluno" },
  { email: "admin@complexo.com", password: "123456", role: "admin", employeeId: "joao-diretor", label: "Admin Master" },
  {
    email: "pilates@complexo.com",
    password: "123456",
    role: "admin",
    employeeId: "renata-alves",
    label: "Admin de Unidade · Pilates",
  },
];

const DEMO_USERS: Record<string, DemoUser> = Object.fromEntries(
  DEMO_CREDENTIALS.map(({ email, ...user }) => [email, user]),
);

const ROLE_KEY = "complexo_demo_role";
const EMPLOYEE_KEY = "complexo_demo_employee";

export function login(email: string, password: string): DemoRole | null {
  const user = DEMO_USERS[email.trim().toLowerCase()];
  if (!user || user.password !== password) return null;
  sessionStorage.setItem(ROLE_KEY, user.role);
  if (user.employeeId) sessionStorage.setItem(EMPLOYEE_KEY, user.employeeId);
  else sessionStorage.removeItem(EMPLOYEE_KEY);
  return user.role;
}

export function logout() {
  sessionStorage.removeItem(ROLE_KEY);
  sessionStorage.removeItem(EMPLOYEE_KEY);
}

export function getRole(): DemoRole | null {
  const value = sessionStorage.getItem(ROLE_KEY);
  return value === "aluno" || value === "admin" ? value : null;
}

/** Id do Employee (hr.ts) ligado à sessão admin atual, se houver. */
export function getEmployeeId(): string | null {
  return sessionStorage.getItem(EMPLOYEE_KEY);
}
