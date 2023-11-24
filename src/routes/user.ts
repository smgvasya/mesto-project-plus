import { Router } from "express";
import { USERS, USERS_ID, PROFILE_ME, AVATAR } from "../utils/constants";
import {
  createUser,
  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getMeInfo,
} from "../controllers/user";

const userRouter = Router();

userRouter.get(USERS, getUsers); // возвращает всех пользователей
userRouter.get(USERS_ID, getUserById); // возвращает пользователя по _id
userRouter.get(PROFILE_ME, getMeInfo); // возвращает информацию о текущем пользователе

userRouter.post(USERS, createUser); // создаёт пользователя

userRouter.patch(PROFILE_ME, updateProfile); // обновляет профиль
userRouter.patch(AVATAR, updateAvatar); // обновляет аватар

export default userRouter;
