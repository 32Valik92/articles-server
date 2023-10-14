export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password?: string;
  passwordHash: string;
  avatarURL: string;
}
