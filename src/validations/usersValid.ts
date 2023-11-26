import { celebrate, Joi} from "celebrate";
import { httpRegex } from "../utils/constants";

const createUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(httpRegex),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

const updateAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpRegex).required(),
  }),
});

export {
  createUserValid,
  loginValid,
  getUserByIdValid,
  updateProfileValid,
  updateAvatarValid,
};
