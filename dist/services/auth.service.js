"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(data) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(data.password);
            const user = (await models_1.User.create({
                ...data,
                password: hashedPassword,
            }));
            const { password, ...userData } = user._doc;
            const tokenPair = await token_service_1.tokenService.generateTokenPair({ _id: user._id });
            return {
                ...userData,
                tokenPair,
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const userMatcher = (await models_1.User.findOne({
                email: credentials.email,
            }).select("-password"));
            const userData = { ...userMatcher._doc };
            const isMatched = await password_service_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 401);
            }
            const tokenPair = await token_service_1.tokenService.generateTokenPair({ _id: user._id });
            await models_1.Token.create({
                ...tokenPair,
                _userId: user._id,
            });
            return {
                ...userData,
                tokenPair,
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getMe(payload) {
        const user = (await models_1.User.findById(payload._id).select("-password"));
        if (!user) {
            throw new errors_1.ApiError("User is not found", 401);
        }
        return user;
    }
}
exports.authService = new AuthService();
