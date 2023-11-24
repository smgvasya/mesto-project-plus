import { Request, Response } from "express";

export const errorHandler = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response
) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
};
