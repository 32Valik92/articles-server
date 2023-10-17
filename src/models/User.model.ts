import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Only one example email for DB
      // validate: {
      //   validator: async function (value: string) {
      //     // Перевірка унікальності поля "email" перед збереженням
      //     const existingUser = await this.constructor.findOne({ email: value });
      //     return !existingUser;
      //   },
      //   message: "Ця електронна пошта вже існує в базі даних.",
      // },
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model("User", UserSchema);
