import { celebrate, Joi } from "celebrate";
import { httpRegex } from "../utils/constants";

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(httpRegex).required(),
  }),
});

const cardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export { createCardValid, cardIdValid };
