import { NextFunction, Request, Response } from "express";
import ErrClass from "../classes/Error";

export const errorHandler = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
};

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(ErrClass.NotFoundError("Страница не найдена"));
};
