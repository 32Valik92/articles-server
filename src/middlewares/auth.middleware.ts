import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Дістаємо наш accessToken із запиту
      const accessToken = req.get("Authorization").replace(/Bearer\s?/, "");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const payload = tokenService.checkToken(accessToken, ETokenType.Access);

      // Шукаємо токен по нашому взятому з запиту токену
      const entity = await Token.findOne({ accessToken });

      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.tokenPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
