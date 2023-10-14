import { Router } from "express";

import { authController } from "../controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login");
router.get("/me");

export const authRouter = router;
