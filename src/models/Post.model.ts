import { model, Schema, Types } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Post = model("Post", PostSchema);
