import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";

// Instanciar o PrismaClient não abre conexão nenhuma — a conexão só
// acontece na primeira query. Então isso é seguro de criar mesmo sem um
// banco real configurado; nenhuma rota chama isso ainda (todas são stub).
export const prisma = new PrismaClient({
  datasourceUrl: env.databaseUrl,
});
