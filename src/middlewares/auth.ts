import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ErrClass from "../classes/Error";

const { JWT_SECRET } = process.env;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return ErrClass.UnauthorizedError("Неверный логин и пароль");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
  } catch (err) {
    return ErrClass.UnauthorizedError("Неверный логин и пароль");
  }
  req.user = { _id: payload._id };
  return next();
};
