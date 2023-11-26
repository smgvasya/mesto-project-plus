import { Router } from "express";
import { CARDS, CARD_ID, LIKES } from "../utils/constants";

import {
  createCard,
  removeCardById,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/card";

import { createCardValid, cardIdValid } from "../validations/cardsValid";

const cardRouter = Router();

cardRouter.get(CARDS, getCards); // возвращает все карточки

cardRouter.post(CARDS, createCardValid, createCard); // создаёт карточку
cardRouter.delete(CARD_ID, cardIdValid, removeCardById); // удаляет карточку по идентификатору

cardRouter.put(LIKES, cardIdValid, likeCard); // поставить лайк карточке
cardRouter.delete(LIKES, cardIdValid, dislikeCard); // убрать лайк с карточки

export default cardRouter;
