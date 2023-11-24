declare namespace Express {
  export interface Request {
    user: { _id: string };
  }
  export interface Response {
    user: { _id: string };
  }
}

declare module 'bcrypt'
declare module 'celebrate'
declare module 'winston'