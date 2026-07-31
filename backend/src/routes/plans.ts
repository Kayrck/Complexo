import { Router } from "express";
import { notImplemented } from "../middleware/notImplemented.js";

export const plansRouter = Router();

// TODO: ler/escrever via prisma.plan.* (model Plan em prisma/schema.prisma)
// Hoje o frontend usa os planos mockados em frontend/src/app/data.ts.
plansRouter.get("/", notImplemented("Listagem de planos"));
plansRouter.get("/:id", notImplemented("Detalhe de plano"));
