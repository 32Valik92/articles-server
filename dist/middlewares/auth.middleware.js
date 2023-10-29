"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const models_1 = require("../models");
const services_1 = require("../services");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization").replace(/Bearer\s?/, "");
            if (!accessToken) {
                throw new errors_1.ApiError("No token", 401);
            }
            const payload = services_1.tokenService.checkToken(accessToken, enums_1.ETokenType.Access);
            const entity = await models_1.Token.findOne({ accessToken });
            if (!entity) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            req.res.locals.tokenPayload = payload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
