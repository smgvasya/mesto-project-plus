import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import cardRouter from "./routes/card";
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Создаём экземпляр приложения Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use("/users", userRouter);
app.use("/cards", cardRouter);

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
