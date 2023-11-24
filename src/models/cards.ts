import { Schema, ObjectId, model } from "mongoose";

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
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default model<CardType>("card", cardSchema);
