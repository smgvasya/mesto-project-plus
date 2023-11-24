import { NextFunction, Request, Response } from "express";
import Card from "../models/cards";
import { OK } from "../utils/constants";
import ErrClass from "../classes/Error";

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
    likes: [],
    createdAt: Date.now(),
  })
    .then((card) => {
      if (!card) {
        throw ErrClass.BadReqError("Переданы некорректные данные");
      }
      res.status(OK).send(card);
    })
    .catch(next);
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw ErrClass.BadReqError("Переданы некорректные данные");
      }
      res.status(OK).send(cards);
    })
    .catch(next);
};

export const removeCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw ErrClass.ForbiddentError("Нельзя удалять чужую карточку");
      }
      res.status(OK).send(card);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw ErrClass.NotFoundError("Не найдено");
      }
      res.status(OK).send(card);
    })
    .catch(next);
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw ErrClass.ConflictError("На сервере произошла ошибка");
      }
      res.status(OK).send(card);
    })
    .catch(next);
};
