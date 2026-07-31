import "dotenv/config";

// Valores padrão que nunca apontam pra um banco real — só existem para o
// processo subir sem erro antes de alguém configurar as credenciais de
// verdade em backend/.env (veja backend/.env.example).
const FALLBACK_DATABASE_URL =
  "postgresql://complexo:complexo@localhost:5432/complexo?schema=public";
const FALLBACK_JWT_SECRET = "dev-only-secret-change-me";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? FALLBACK_DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET ?? FALLBACK_JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  isDatabaseConfigured: Boolean(process.env.DATABASE_URL),
};
