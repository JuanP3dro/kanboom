import Comments from "../models/comments";
import { IMessage } from "../interfaces/IMessage";
import Notifications from "../models/notifications";
import UserNotifications from "../models/userNotifications";
import Cards from "../models/cards";

export default class CommentsService {

  static getAllComments = async (cardId: number) => {

    const getComment = await Comments.findAll({ where: { cardId }});

    return getComment;
  }

  static create = async (cardId: number, comment: string, author: string, users: number[]): Promise<Comments> => {

    const createComment = await Comments.create({ cardId, comment, author });

    const Card = await Cards.findByPk(cardId);
    const name = Card?.title;

    const notifications = await Notifications.create({ text: `Um comentario no Card ${name} foi criado` });
    const notificationId = notifications.id;
    users.map(async (u) => await UserNotifications.create({ userId: u, notificationId }));

    return createComment;

  }

}