import { Schema, ObjectId, model } from "mongoose";
import { httpRegex } from "../utils/constants";
import { updateProfile } from "../controllers/user";

export type CardType = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
};

const cardSchema = new Schema<CardType>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (u: string) => httpRegex.test(u),
        message: "Некорректная ссылка",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default model<CardType>("card", cardSchema);
