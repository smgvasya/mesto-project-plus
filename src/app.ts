import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { celebrate, Joi, errors } from "celebrate";
import userRouter from "./routes/user";
import cardRouter from "./routes/card";
import { login, createUser } from "./controllers/user";

require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri(),
    }),
  }),
  createUser,
);

app.use("/users", userRouter);
app.use("/cards", cardRouter);
app.use(errors());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "655570816b4684fbb881c19c",
  };
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
