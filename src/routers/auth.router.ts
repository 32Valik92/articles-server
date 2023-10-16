import { Router } from "express";

import { authController } from "../controller";
import { ICredentials } from "../interfaces";
import { userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.register);

router.post(
  "/login",
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login,
);

router.get("/me", authMiddleware.checkAccessToken, authController.getMe);

export const authRouter = router;
