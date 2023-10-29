"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
class AuthController {
    async register(req, res, next) {
        try {
            const registerData = await services_1.authService.register(req.body);
            return res.status(201).json({
                ...registerData,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const loginData = await services_1.authService.login(req.body, req.res.locals.user);
            return res.status(200).json({
                ...loginData,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getMe(req, res, next) {
        try {
            const payload = req.res.locals.tokenPayload;
            const user = await services_1.authService.getMe(payload);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
