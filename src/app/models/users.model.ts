import bcrypt from "bcryptjs";
import { Model, model, Schema } from "mongoose";
import validator from "validator";
import { IAddress, IPasswordHash, IUser } from "./../interfaces/user.interface";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);
const userSchema = new Schema<IUser, Model<IUser>, IPasswordHash>(
  {
    firstName: { type: String, required: true, trim: true, minLength: 3 },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // custom validator ->
      // validate: {
      //   validator: (value) => {
      //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      //   },
      //   message: (props) => {
      //     return `Email is ${props.value} not a valid email`;
      //   },
      // },

      // ---- 3rd party package -> Validator npm
      validate: [validator.isEmail, "invalid email ${VALUE}"],
    },
    password: { type: String, required: true },
    age: {
      type: Number,
      min: [20, "Age must be min {VALUE}"],
      max: 40,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid",
      },
      default: "user",
      lowercase: true,
    },
    isDeleted: { type: Boolean, default: false },
    address: { type: addressSchema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.method("hashPassword", async function (plainPass: string) {
  const password = await bcrypt.hash(plainPass, 10);
  return password;
});

export const User = model("User", userSchema);
