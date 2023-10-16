import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";

class UserMiddleware {
  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "fullName password",
        );

        if (!user) {
          throw new ApiError("User not found", 422);
        }

        // Передаємо в дане поле об'єкта нашого користувача і йдемо далі
        res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
