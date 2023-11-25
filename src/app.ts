import express from "express";
import mongoose from "mongoose";
import { celebrate, Joi, errors } from "celebrate";
import { rootRouter } from "./routes/index";
import { login, createUser } from "./controllers/user";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { auth } from "./middlewares/auth";
import { httpRegex } from "./utils/constants";

require("dotenv").config();

const { PORT, MESTODB } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose.connect(MESTODB as string);

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(httpRegex),
    }),
  }),
  createUser
);

app.use(auth);
app.use("/", rootRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
