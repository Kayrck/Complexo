import { Router } from "express";
import { notImplemented } from "../middleware/notImplemented.js";

export const productsRouter = Router();

// TODO: ler/escrever via prisma.product.* (model Product em prisma/schema.prisma)
// Hoje o frontend usa o catálogo mockado em frontend/src/app/data.ts.
productsRouter.get("/", notImplemented("Listagem de produtos"));
productsRouter.get("/:id", notImplemented("Detalhe de produto"));
