import type { Request, Response } from "express";
import { env } from "../config/env.js";

/**
 * Handler placeholder para rotas que ainda não têm lógica real nem banco
 * conectado. Devolve 501 de propósito, pra deixar claro no client que o
 * endpoint existe mas ainda não faz nada — troque pela implementação real
 * quando DATABASE_URL/credenciais estiverem configurados.
 */
export const notImplemented = (label: string) => (_req: Request, res: Response) => {
  res.status(501).json({
    error: "not_implemented",
    message: `${label} ainda não está implementado neste backend.`,
    databaseConfigured: env.isDatabaseConfigured,
  });
};
