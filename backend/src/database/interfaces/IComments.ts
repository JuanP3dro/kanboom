import { allowedUsers } from "./ICards";

export interface IComments {
  id: number,
  cardId: number,
  author: string,
  comment: string,
  attachment: string,
  allowedUsers: allowedUsers[]
}