import { NextFunction, Request, Response } from "express";
import Card from "../models/cards";
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from "../utils/constants";

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
      res.status(OK).send(card);
    })
    .catch(next);
};


export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch(next);
};

export const removeCardById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: "Ошибка" });
      }
      res.status(OK).send(card);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: "Ошибка" });
      }
      res.status(OK).send(card);
    })
    .catch(next);
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: "Ошибка" });
      }
      res.status(OK).send(card);
    })
    .catch(next);
};
