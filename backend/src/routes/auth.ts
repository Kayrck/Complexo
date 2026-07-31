import { Router } from "express";
import { notImplemented } from "../middleware/notImplemented.js";

export const authRouter = Router();

// TODO: implementar de verdade quando DATABASE_URL + JWT_SECRET reais existirem.
// Sugestão: bcrypt para hash de senha, jsonwebtoken para o token de sessão,
// usando o model User do prisma/schema.prisma.
authRouter.post("/register", notImplemented("Cadastro de usuário"));
authRouter.post("/login", notImplemented("Login"));
authRouter.post("/logout", notImplemented("Logout"));
authRouter.get("/me", notImplemented("Usuário autenticado"));
