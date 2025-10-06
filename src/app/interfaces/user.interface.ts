import { Types } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: "user" | "admin";
  isDeleted: boolean;
  address: IAddress;
}

export interface IPasswordHash {
  hashPassword(password: string): string;
}
