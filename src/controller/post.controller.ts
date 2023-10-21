import { NextFunction, Request, Response } from "express";

import { IPost } from "../interfaces/post.interface";
import { postService } from "../services";

class PostController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPost[]>> {
    try {
      const posts = await postService.getAll();
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  public async getLastTags(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string[]>> {
    try {
      const tags = await postService.getLastTags();
      return res.json(tags);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPost>> {
    try {
      const { postId } = req.params;
      const posts = await postService.getById(postId);

      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { postId } = req.params;
      await postService.deleteById(postId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPost>> {
    try {
      const userId = req.res.locals.tokenPayload._id as string;
      const postData = req.body as IPost;

      const post = await postService.create(postData, userId);

      return res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPost>> {
    try {
      // const userId = req.res.locals.tokenPayload._id as string;
      const { postId } = req.params;
      const updateData = req.body as IPost;

      const updatedPost = await postService.updateById(updateData, postId);

      return res.status(200).json(updatedPost);
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
