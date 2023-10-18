import Joi from "joi";

import { regexConstants } from "../constants";

export class UserValidator {
  static fullName = Joi.string().min(1).trim();
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.pattern.base": "Адреса пошти має неправильний формат",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();
  static avatarURL = Joi.string().trim();

  static register = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
    fullName: this.fullName.required(),
    avatarURL: this.avatarURL,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
