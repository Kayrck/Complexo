import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { authRouter } from "./routes/auth.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { ordersRouter } from "./routes/orders.js";
import { plansRouter } from "./routes/plans.js";
import { productsRouter } from "./routes/products.js";

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    databaseConfigured: env.isDatabaseConfigured,
  });
});

app.use("/api/auth", authRouter);
app.use("/api/plans", plansRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(env.port, () => {
  console.log(`Complexo backend rodando na porta ${env.port}`);
  if (!env.isDatabaseConfigured) {
    console.log(
      "DATABASE_URL não configurada — endpoints de dados seguem como stub (501). Veja backend/.env.example."
    );
  }
});
