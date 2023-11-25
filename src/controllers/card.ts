import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Card from "../models/cards";
import { OK } from "../utils/constants";
import ErrClass from "../classes/Error";

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      }
      next(err);
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate("owner")
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
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findOneAndDelete({ _id: cardId, owner: { _id } })
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
    { new: true }
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
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw ErrClass.NotFoundError("Не найдено");
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ErrClass.BadReqError("переданы некорректные данные"));
      }
      next(err);
    });
};
