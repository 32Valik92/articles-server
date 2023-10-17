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
}

export const postController = new PostController();
