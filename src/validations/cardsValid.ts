import { celebrate, Joi } from "celebrate";
import { httpRegex } from "../utils/constants";

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "name" - 2 символа',
      "string.max": 'Максимальная длина поля "name" - 30 символов',
      "string.empty": 'Поле "name" не должно быть пустым',
    }),
    link: Joi.string()
      .pattern(httpRegex)
      .required()
      .message("Некорректный url")
      .messages({
        "string.empty": 'Поле "link" не должно быть пустым',
      }),
  }),
});

const cardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required()
      .message("Некорректный id")
      .messages({
        "string.empty": 'Поле "id" не должно быть пустым',
      }),
  }),
});

export { createCardValid, cardIdValid };
