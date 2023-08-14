import sequelize from "sequelize";
import { IMessage } from "../interfaces/IMessage";
import Cards from "../models/cards";
import Columns from "../models/columns";
import Users from "../models/users";
import Comments from "../models/comments";

export default class ColumnService {

  static getAllColumns = async (boardId: number): Promise<Columns[]> => {

    const getColumnById = await Columns.findAll({
      where: { boardId },
      include: [{
        model: Cards,
        as: 'card',
        include: [
          {
            model: Users,
            as: 'responsibleUser',
            attributes: {
              exclude: ['password', "email", "tokenAuth", "expiredToken", "completedStep", "isValid", "email"]
            }
          }
        ]
      }]
    });

    return getColumnById;
  }

  static getColumns = async (id: number): Promise<Columns | IMessage> => {

    const getColumnById = await Columns.findByPk(id);

    if (getColumnById) return getColumnById;

    return ({ message: "Coluna Não encontrada" });
  }

  static create = async (name: string, color: string, boardId: number): Promise<Columns> => {

    const createColumn = await Columns.create({ name, color, boardId });

    return createColumn;

  }

  static edit = async (id: number, name: string, color: string): Promise<[affectedCount: number]> => {

    const updatedColumn = await Columns.update({ name, color }, { where: { id } });

    return updatedColumn;

  }
  
  static async deleteColumnCascade(id: number): Promise<void> {
    try {
      await this.deleteCascade(id);
      console.log(`Deleted column and associated cards/comments.`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  static async deleteCascade(columnId: number): Promise<void> {
    const cards = await Cards.findAll({ where: { columnId } });

    for (const card of cards) {
      await this.deleteCardCascade(card.id);
    }

    await Columns.destroy({ where: { id: columnId } });
  }

  static async deleteCardCascade(cardId: number): Promise<void> {
    const comments = await Comments.findAll({ where: { cardId } });

    for (const comment of comments) {
      await comment.destroy();
    }

    await Cards.destroy({ where: { id: cardId } });
  }
}

