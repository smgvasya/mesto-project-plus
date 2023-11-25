import { Router } from 'express';
import userRouter from './user';
import cardRouter from './card';
import { errorNotFound } from '../middlewares/errorHandler';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);
rootRouter.use('/', errorNotFound);

export { rootRouter };