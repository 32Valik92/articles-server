import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
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

  public findExist(field: keyof IUser) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        // Пошук по DB
        const user = await User.findOne({ [field]: req.body[field] });

        if (user) {
          throw new ApiError("User with this email already exist", 409);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
