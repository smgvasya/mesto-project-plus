import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./user";
import cardRouter from "./card";
import { errorNotFound } from "../middlewares/errorHandler";
import ErrClass from "../classes/Error";


const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/cards", cardRouter);
rootRouter.use("/", errorNotFound);

rootRouter.use((req: Request, res: Response, next: NextFunction) => {
  next(ErrClass.NotFoundError("Запрашиваемый ресурс не найден"));
});
export { rootRouter };
