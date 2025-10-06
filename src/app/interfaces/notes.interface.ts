import { Types } from "mongoose";

export interface INote {
  title: string;
  desc: string;
  isCompleted: boolean;
  isDeleted: boolean;
  user: Types.ObjectId;
}
