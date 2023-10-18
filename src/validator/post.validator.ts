import Joi from "joi";

export class PostValidator {
  static title = Joi.string().min(1).trim();
  static text = Joi.string().min(1).trim();
  static tags = Joi.array().items(Joi.string());
  static imageUrl = Joi.string().trim();

  static postCreate = Joi.object({
    title: this.title.required(),
    text: this.text.required(),
    tags: this.tags,
    imageUrl: this.imageUrl,
  });

  static postUpdate = Joi.object({
    title: this.title,
    text: this.text,
    tags: this.tags,
    imageUrl: this.imageUrl,
  });
}
