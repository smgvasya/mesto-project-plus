/* eslint-disable no-console */
import express from "express";
import mongoose from "mongoose";
import { celebrate, Joi, errors } from "celebrate";
import userRouter from "./routes/user";
import cardRouter from "./routes/card";
import { login, createUser } from "./controllers/user";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { auth } from "./middlewares/auth";

require("dotenv").config();

const { PORT, MESTODB = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose.connect(MESTODB);

app.use(requestLogger);
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

app.use(auth);
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
  console.log(process.env.NODE_ENV);
});
