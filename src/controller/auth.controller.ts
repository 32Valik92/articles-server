import { NextFunction, Request, Response } from "express";

import { ITokenPair, IUser } from "../interfaces";
import { authService } from "../services";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokenPair>> {
    try {
      const tokensPair = await authService.login(req.body, req.res.locals.user);

      return res.status(200).json({
        ...tokensPair,
      });
    } catch (e) {
      next(e);
    }
  }

  public async getMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const payload = req.res.locals.tokenPayload;
      const user = await authService.getMe(payload);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
