import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { User } from "../models";
import { passwordService } from "./password.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      // const user = await User.create({ ...data, passwordHash: hashedPassword });
      await User.create({ ...data, passwordHash: hashedPassword });

      // const actionToken = tokenService.generateTokenPair({ _id: user._id });

      // console.log("user", user);
      // console.log("token", actionToken);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
