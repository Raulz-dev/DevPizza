import { Router } from "express";
import * as authController from "../../controllers/AuthController";

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.register);

export default authRoutes;
