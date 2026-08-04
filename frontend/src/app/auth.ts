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
}

export const DEMO_CREDENTIALS: { email: string; password: string; role: DemoRole }[] = [
  { email: "aluno@complexo.com", password: "123456", role: "aluno" },
  { email: "admin@complexo.com", password: "123456", role: "admin" },
];

const DEMO_USERS: Record<string, DemoUser> = Object.fromEntries(
  DEMO_CREDENTIALS.map(({ email, ...user }) => [email, user]),
);

const STORAGE_KEY = "complexo_demo_role";

export function login(email: string, password: string): DemoRole | null {
  const user = DEMO_USERS[email.trim().toLowerCase()];
  if (!user || user.password !== password) return null;
  sessionStorage.setItem(STORAGE_KEY, user.role);
  return user.role;
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function getRole(): DemoRole | null {
  const value = sessionStorage.getItem(STORAGE_KEY);
  return value === "aluno" || value === "admin" ? value : null;
}
