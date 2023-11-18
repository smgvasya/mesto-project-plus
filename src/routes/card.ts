import { Router } from "express";
import { CARDS, CARD_ID, LIKES } from "../utils/constants";

import {
  createCard,
  removeCardById,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/card";

const cardRouter = Router();

cardRouter.get(CARDS, getCards); // возвращает все карточки
cardRouter.post(CARDS, createCard); // создаёт карточку
cardRouter.delete(CARD_ID, removeCardById); // удаляет карточку по идентификатору

cardRouter.put(LIKES, likeCard); // поставить лайк карточке
cardRouter.delete(LIKES, dislikeCard); // убрать лайк с карточки

export default cardRouter;
