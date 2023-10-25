import { ITokenPair } from "./token.interface";

export interface ILoginData {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  avatarURL: string;
  tokenPair: ITokenPair;
}
