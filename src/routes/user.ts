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

import {
  getUserByIdValid,
  updateProfileValid,
  updateAvatarValid,
} from "../validations/usersValid";

const userRouter = Router();

userRouter.get(USERS, getUsers); // возвращает всех пользователей
userRouter.get(USERS_ID, getUserByIdValid, getUserById); // возвращает пользователя по _id
userRouter.get(PROFILE_ME, getMeInfo); // возвращает информацию о текущем пользователе

userRouter.post(USERS, createUser); // создаёт пользователя
userRouter.patch(PROFILE_ME, updateProfileValid, updateProfile); // обновляет профиль
userRouter.patch(AVATAR, updateAvatarValid, updateAvatar); // обновляет аватар

export default userRouter;
