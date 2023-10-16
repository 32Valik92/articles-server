import { Router } from "express";

import { authController } from "../controller";
import { ICredentials } from "../interfaces";
import { userMiddleware } from "../middlewares";

const router = Router();

router.post("/register", authController.register);

router.post(
  "/login",
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login,
);

router.get("/me");

export const authRouter = router;
