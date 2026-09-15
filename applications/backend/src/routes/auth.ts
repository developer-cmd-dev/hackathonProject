import { Router } from "express";

import { getAuthenticatedUser, loginWithGoogle } from "../controllers/auth.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const router = Router();

router.post("/google", loginWithGoogle);
router.get("/me", authMiddleware, getAuthenticatedUser);

export default router;
