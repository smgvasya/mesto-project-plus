import { celebrate, Joi, Segments } from "celebrate";
import { httpRegex } from "../utils/constants";

const createCardValid = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "name" - 2 символа',
      "string.max": 'Максимальная длина поля "name" - 30 символов',
      "string.empty": 'Поле "name" не должно быть пустым',
    }),
    link: Joi.string()
      .pattern(httpRegex)
      .required()
      .messages({'any.only': "Некорректный url"})
      .messages({
        "string.empty": 'Поле "link" не должно быть пустым',
      }),
  }),
});


const cardIdValid = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({'any.only': "Некорректный id"})
      .messages({
        "string.empty": 'Поле "id" не должно быть пустым',
      }),
  }),
});

export { createCardValid, cardIdValid };
