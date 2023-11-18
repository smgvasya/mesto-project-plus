const USERS: "/" = "/";
const USERS_ID: `${typeof USERS}/:userId` = `${USERS}/:userId`;

const CARDS: "/" = "/";
const CARD_ID: `${typeof CARDS}/:cardId` = `${CARDS}/:cardId`;

const PROFILE_ME: `${typeof USERS}/me` = `${USERS}/me`;
const AVATAR: `${typeof PROFILE_ME}/avatar` = `${PROFILE_ME}/avatar`;

const LIKES: `${typeof CARD_ID}/likes` = `${CARD_ID}/likes`;

const OK = 200;
const BAD_REQUEST = 400; //переданы некорректные данные
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500; //ошибка по умолчанию.

export {
  USERS,
  USERS_ID,
  CARDS,
  CARD_ID,
  PROFILE_ME,
  AVATAR,
  LIKES,
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};

// {
//   "name": "Жак-Ив Кусто",
//   "about": "Исследователь",
//   "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
// }
