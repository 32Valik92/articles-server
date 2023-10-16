import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../interfaces";

class TokenService {
  public generateTokenPair(payload: {
    _id: Types.ObjectId | string;
  }): ITokenPair {
    // Створюємо пару tokens. expiresIn - час життя їхнього
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      // По якому ключі його перевіряти
      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      // Повертаємо payload or false для verify
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
