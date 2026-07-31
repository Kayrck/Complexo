import { Router } from "express";
import { notImplemented } from "../middleware/notImplemented.js";

export const ordersRouter = Router();

// TODO: implementar checkout de verdade (criar Order + OrderItem via prisma,
// integrar gateway de pagamento). Hoje frontend/src/app/pages/Checkout.tsx
// só simula a compra no client, sem chamar nenhuma API.
ordersRouter.post("/", notImplemented("Criação de pedido"));
ordersRouter.get("/:id", notImplemented("Detalhe de pedido"));
