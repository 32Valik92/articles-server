"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class PostValidator {
}
exports.PostValidator = PostValidator;
_a = PostValidator;
PostValidator.title = joi_1.default.string().min(1).trim();
PostValidator.text = joi_1.default.string().min(1).trim();
PostValidator.tags = joi_1.default.array().items(joi_1.default.string());
PostValidator.imageURL = joi_1.default.string().trim().allow("");
PostValidator.postCreate = joi_1.default.object({
    title: _a.title.required(),
    text: _a.text.required(),
    tags: _a.tags,
    imageURL: _a.imageURL,
});
PostValidator.postUpdate = joi_1.default.object({
    title: _a.title,
    text: _a.text,
    tags: _a.tags,
    imageURL: _a.imageURL,
});
