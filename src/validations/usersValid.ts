import { celebrate, Joi, Segments } from "celebrate";
import { httpRegex } from "../utils/constants";

const createUserValid = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": 'Поле "email" не должно быть пустым',
      "string.email": "Некорректный email",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'Поле "пароль" не должно быть пустым',
    }),
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "name" - 2 символа',
      "string.max": 'Максимальная длина поля "name" - 30 символов',
    }),
    about: Joi.string().min(2).max(200).messages({
      "string.min": 'Минимальная длина поля "about" - 2 символа',
      "string.max": 'Максимальная длина поля "about" - 200 символов',
    }),
    avatar: Joi.string().pattern(httpRegex).messages({'any.only': "Некорректный url"}),
  }),
});

const loginValid = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": 'Поле "email" не должно быть пустым',
      "string.email": "Некорректный email",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'Поле "пароль" не должно быть пустым',
    }),
  }),
});

const getUserByIdValid = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({'any.only': "Некорректный id"})
      .messages({
        "string.empty": 'Поле "id" не должно быть пустым',
      }),
  }),
});

const updateProfileValid = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "name" - 2 символа',
      "string.max": 'Максимальная длина поля "name" - 30 символов',
      "string.empty": 'Поле "name" не должно быть пустым',
    }),
    about: Joi.string().min(2).max(200).required().messages({
      "string.min": 'Минимальная длина поля "about" - 2 символа',
      "string.max": 'Максимальная длина поля "about" - 200 символов',
      "string.empty": 'Поле "about" не должно быть пустым',
    }),
  }),
});

const updateAvatarValid = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string()
      .pattern(httpRegex)
      .required()
      .messages({'any.only': "Некорректный url"})
      .messages({
        "string.empty": 'Поле "avatar" не должно быть пустым',
      }),
  }),
});

export {
  createUserValid,
  loginValid,
  getUserByIdValid,
  updateProfileValid,
  updateAvatarValid,
};
