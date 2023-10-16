import { ApiError } from "../errors";
import { ICredentials, ITokenPair, IUser } from "../interfaces";
import { Token, User } from "../models";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      // const user = await User.create({ ...data, passwordHash: hashedPassword });
      await User.create({ ...data, password: hashedPassword });

      // const actionToken = tokenService.generateTokenPair({ _id: user._id });

      // console.log("user", user);
      // console.log("token", actionToken);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser,
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      // Якщо все ОК, то ми створюємо пару токенів, в який передаємо корисне навантаження
      const tokenPair = await tokenService.generateTokenPair({ _id: user._id });

      // Створюємо в базі даних в моделі Token відповідний запис
      await Token.create({
        ...tokenPair,
        _userId: user._id,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getMe(payload: any): Promise<IUser> {
    const user = (await User.findById(payload._id).select(
      "-password",
    )) as IUser;

    if (!user) {
      throw new ApiError("User is not found", 401);
    }

    return user;
  }
}

export const authService = new AuthService();
