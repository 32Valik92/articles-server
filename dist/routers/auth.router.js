"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const validator_1 = require("../validator");
const router = (0, express_1.Router)();
router.post("/register", middlewares_1.commonMiddleware.isBodyValid(validator_1.UserValidator.register), middlewares_1.userMiddleware.findExist("email"), controller_1.authController.register);
router.post("/login", middlewares_1.commonMiddleware.isBodyValid(validator_1.UserValidator.login), middlewares_1.userMiddleware.isUserExist("email"), controller_1.authController.login);
router.get("/me", middlewares_1.authMiddleware.checkAccessToken, controller_1.authController.getMe);
exports.authRouter = router;