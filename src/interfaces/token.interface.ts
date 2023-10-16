import { IUser } from "./user.interface";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, "email" | "password">;
