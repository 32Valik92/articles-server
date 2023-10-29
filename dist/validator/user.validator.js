"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.fullName = joi_1.default.string().min(1).trim();
UserValidator.email = joi_1.default.string()
    .regex(constants_1.regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
    "string.empty": "Це поле обов'язкове",
    "string.pattern.base": "Адреса пошти має неправильний формат",
});
UserValidator.password = joi_1.default.string().regex(constants_1.regexConstants.PASSWORD).trim();
UserValidator.avatarURL = joi_1.default.string().trim();
UserValidator.register = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
    fullName: _a.fullName.required(),
    avatarURL: _a.avatarURL,
});
UserValidator.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
