import Joi from "joi";

export class PostValidator {
  static title = Joi.string().min(1).trim();
  static text = Joi.string().min(1).trim();
  static tags = Joi.array().items(Joi.string());
  static imageURL = Joi.string().trim().allow("");

  static postCreate = Joi.object({
    title: this.title.required(),
    text: this.text.required(),
    tags: this.tags,
    imageURL: this.imageURL,
  });

  static postUpdate = Joi.object({
    title: this.title,
    text: this.text,
    tags: this.tags,
    imageURL: this.imageURL,
  });
}
