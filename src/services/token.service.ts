import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { configs } from "../configs";
import { ITokenPair } from "../interfaces";

class TokenService {
  public generateTokenPair(payload: { _id: Types.ObjectId }): ITokenPair {
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
}

export const tokenService = new TokenService();
