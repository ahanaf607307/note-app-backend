export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: "user" | "admin";
  isDeleted: boolean;
}
