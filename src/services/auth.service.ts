import { ApiError } from "../errors";
import { ICredentials, ILoginData, IUser } from "../interfaces";
import { Token, User } from "../models";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<ILoginData> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      const user = (await User.create({
        ...data,
        password: hashedPassword,
      })) as unknown as any;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user._doc;

      const tokenPair = await tokenService.generateTokenPair({ _id: user._id });

      return {
        ...userData,
        tokenPair,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser,
  ): Promise<ILoginData> {
    try {
      const userMatcher = (await User.findOne({
        email: credentials.email,
      }).select("-password")) as unknown as any;

      const userData: IUser = { ...userMatcher._doc };

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

      return {
        ...userData,
        tokenPair,
      };
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
