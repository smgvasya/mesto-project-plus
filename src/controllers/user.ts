import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from "../utils/constants";

 const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "На сервере произошла ошибка" });
    });
  next();
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (!user) {
        return res.status(BAD_REQUEST).send({ message: "Ошибка" });
      }
      res.status(OK).send(user);
    })
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      res.status(OK).send(user);
    })
    .catch(next);
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about: link },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
       return res.status(OK).send(user);
    })
    .catch(next);
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
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      res.status(OK).send(user);
    })
    .catch(next);
};


export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new Error('Неправильные почта или пароль');
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            throw new Error('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          );
          res
            .cookie("token", `Bearer ${token}`, {
              maxAge: 60 * 60 * 24 * 7,
              httpOnly: true,
            })
            .send(user);
        })
        .catch(next);
    })
    .catch(next);
};
