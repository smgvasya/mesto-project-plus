import { Schema, model } from "mongoose";
import validator from "validator";

export type UserType = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: false,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: false,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator(url: string) {
          return validator.isURL(url);
        },
        message: "Неправильный формат url",
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator(email: string) {
          return validator.isEmail(email);
        },
        message: "Неправильный формат почты",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

export default model<UserType>("user", userSchema);
