import { Router } from "express";
import { notImplemented } from "../middleware/notImplemented.js";

export const dashboardRouter = Router();

// TODO: dados reais de aluno (matrícula, evolução) e admin (métricas gerais)
// via prisma. Hoje frontend/src/app/pages/DashboardAluno.tsx e
// DashboardAdmin.tsx usam números fixos no próprio componente.
dashboardRouter.get("/aluno", notImplemented("Dashboard do aluno"));
dashboardRouter.get("/admin", notImplemented("Dashboard admin"));
