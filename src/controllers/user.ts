import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { OK } from "../utils/constants";
import ErrClass from "../classes/Error";

const { JWT_SECRET } = process.env;

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

export const getMeInfo = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw ErrClass.NotFoundError("Нет пользователя с таким id");
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash: string) =>
      User.create({ name, about, avatar, email, password: hash })
    )
    .then((user: any) => {
      if (!user) {
        throw ErrClass.NotFoundError("Не найдено");
      }
      res.status(OK).send(user);
    })
    .catch((err: { code: number }) => {
      if (err.code === 11000) {
        next(ErrClass.ConflictError("email уже существует на сервере"));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw ErrClass.NotFoundError("Нет пользователя с таким id");
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw ErrClass.NotFoundError("Нет пользователя с таким id");
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw ErrClass.NotFoundError("Нет пользователя с таким id");
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw ErrClass.UnauthorizedError("Неверный логин и пароль");
      }
      bcrypt
        .compare(password, user.password)
        .then((matched: any) => {
          if (!matched) {
            return ErrClass.UnauthorizedError("Неверный логин и пароль");
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET as string, {
            expiresIn: "7d",
          });
          res.cookie("token", token, { httpOnly: true });
          res.status(OK).send(user);
        })
        .catch(next);
    })
    .catch(next);
};
