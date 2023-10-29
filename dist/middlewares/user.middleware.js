"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class UserMiddleware {
    isUserExist(field) {
        return async (req, res, next) => {
            try {
                const user = await models_1.User.findOne({ [field]: req.body[field] }).select("fullName password");
                if (!user) {
                    throw new errors_1.ApiError("User not found", 422);
                }
                res.locals.user = user;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    findExist(field) {
        return async (req, res, next) => {
            try {
                const user = await models_1.User.findOne({ [field]: req.body[field] });
                if (user) {
                    throw new errors_1.ApiError("User with this email already exist", 409);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.userMiddleware = new UserMiddleware();
