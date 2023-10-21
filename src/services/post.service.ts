import { ApiError } from "../errors";
import { IPost } from "../interfaces/post.interface";
import { Post } from "../models";

class PostService {
  public async getAll(): Promise<IPost[]> {
    try {
      return (await Post.find().populate("user").exec()) as unknown as IPost[];
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getLastTags(): Promise<string[]> {
    try {
      const posts = await Post.find().limit(5).exec();
      const tags = posts
        .map((post) => post.tags)
        .flat()
        .slice(0, 5);

      return tags;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(postId: string): Promise<IPost> {
    try {
      const post = (await Post.findByIdAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { returnDocument: "after" },
      ).populate("user")) as unknown as IPost;

      if (!post) {
        throw new ApiError("Post is not found", 422);
      }

      return post;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(postId: string): Promise<void> {
    try {
      await Post.findByIdAndDelete({ _id: postId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(dataPost: IPost, userId: string): Promise<IPost> {
    try {
      const post = (await Post.create({
        ...dataPost,
        user: userId,
      })) as unknown as IPost;
      return post;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(updateData: IPost, postId: string): Promise<IPost> {
    try {
      const updatedPost = (await Post.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          ...updateData,
        },
        { returnDocument: "after" },
      )) as unknown as IPost;
      return updatedPost;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const postService = new PostService();
