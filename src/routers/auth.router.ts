import { Router } from "express";

import { authController } from "../controller";
import { ICredentials } from "../interfaces";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validator";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.findExist("email"),
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login,
);

router.get("/me", authMiddleware.checkAccessToken, authController.getMe);

export const authRouter = router;
