import { Schema, ObjectId, model } from "mongoose";

export type Card = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
};

const cardSchema = new Schema<Card>(
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
  { versionKey: false }
);

export default model<Card>("card", cardSchema);
