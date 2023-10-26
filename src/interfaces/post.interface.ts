import { IUser } from "./user.interface";

export interface IPost {
  title: string;
  text: string;
  tags: string[];
  viewsCount?: number;
  user?: IUser;
  imageURL?: string;
}
