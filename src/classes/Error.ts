import {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
} from "../utils/constants";

export default class ErrClass extends Error {
  statusCode: number;

  constructor(
    message: string = "На сервере произошла ошибка",
    statusCode: number = INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
  }

  static OkError(message: string) {
    return new ErrClass(message, OK);
  }

  static BadReqError(message: string) {
    return new ErrClass(message, BAD_REQUEST);
  }

  static NotFoundError(message: string) {
    return new ErrClass(message, NOT_FOUND);
  }

  static UnauthorizedError(message: string) {
    return new ErrClass(message, UNAUTHORIZED);
  }

  static ForbiddentError(message: string) {
    return new ErrClass(message, FORBIDDEN);
  }

  static ConflictError(message: string) {
    return new ErrClass(message, CONFLICT);
  }
}
