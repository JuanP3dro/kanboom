import { IMessage } from "../interfaces/IMessage";
import Cards from "../models/cards";
import Comments from "../models/comments";
import Notifications from "../models/notifications";
import UserNotifications from "../models/userNotifications";
import Users from "../models/users";

export default class CardsService {

  static getAllCards = async (columnId: number): Promise<Cards[]> => {

    const cards = await Cards.findAll({ where: { columnId } });

    return cards
  }

  static getCards = async (id: number): Promise<Cards | IMessage> => {

    const cards = await Cards.findByPk(id, {
      include: ['comments',
        {
          model: Users,
          as: 'responsibleUser',
          attributes: {
            exclude: ['password', "email", "tokenAuth", "expiredToken", "completedStep", "isValid", "email"]
          }
        }]
    });

    if (cards) {
      return cards;
    } return ({ message: 'Card não existente!' });
  }

  static create = async (
    title: string,
    description: string,
    responsible: number,
    historyPoints: number,
    hours: number,
    columnId: number,
    users: number[]): Promise<Cards> => {

    const createCart: Cards = await Cards.create({ title, description, responsible, historyPoints, hours, columnId }) as Cards;

    const notifications = await Notifications.create({ text: `Card ${title} criado!` });
    const notificationId = notifications.id;
    users.map(async (u) => await UserNotifications.create({ userId: u, notificationId }));

    return createCart;

  }

  static edit = async (id: number, title: string, description: string, responsible: number, historyPoints: number, hours: number, users: number[]): Promise<[affectedCount: number]> => {

    const updatedCard = await Cards.update({ title, description, responsible, historyPoints, hours }, { where: { id } });
    const notifications = await Notifications.create({ text: `Card ${title} foi atualizado!` });
    const notificationId = notifications.id;
    users.map(async (u) => await UserNotifications.create({ userId: u, notificationId }));

    return updatedCard;

  }

  static delete = async (id: number): Promise<number> => {

    await Comments.destroy({ where: { cardId: id } });

    const deletedCard: number = await Cards.destroy({ where: { id } });

    return deletedCard;

  }

  static moveCard = async (cardId: number, columnId: number): Promise<number> => {
    const existCard = await Cards.findByPk(cardId);

    if (existCard) {
      const [affectedCount] = await Cards.update({ columnId }, { where: { id: cardId } });

      return affectedCount;
    }
    throw new Error;
  }
}

