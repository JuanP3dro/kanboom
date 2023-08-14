import { DecodedToken } from '../interfaces/DecodedToken';
import { IBoard } from '../interfaces/IBoard';
import { IUsersAllowed } from '../interfaces/IUsersAllowed';
import Boards from '../models/board';
import Cards from '../models/cards';
import Columns from '../models/columns';
import Comments from '../models/comments';
import Notifications from '../models/notifications';
import UserNotifications from '../models/userNotifications';
import UserBoardRole from '../models/userboardRole';
import Users from '../models/users';
import { transport } from '../modules/mailer';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class BoardService {

  static getAllBoards = async (userId: number): Promise<Boards[]> => {

    const boards = await Boards.findAll({
      include: [
        {
          model: Users,
          as: 'allowedUsers',
          through: { attributes: [] },
          attributes: {
            exclude: ['password', "email", "tokenAuth", "expiredToken", "completedStep", "isValid"]
          },
          where: { id: userId },
        }
      ]
    });

    return boards;
  }


  static getBoards = async (id: number): Promise<IUsersAllowed> => {

    const getBoards = await Boards.findByPk(id,
      {
        include: {
          model: Users,
          as: 'allowedUsers',
          through: { attributes: ['role'] },
          attributes: {
            exclude: ['password', "email", "tokenAuth", "expiredToken", "completedStep", "isValid"]
          }
        }
      }) as unknown as IUsersAllowed;

    return getBoards;

  }

  static create = async (name: string, userId: number): Promise<IBoard> => {

    const createBoard: IBoard = await Boards.create({ name });

    const boardId = createBoard.id;

    if (boardId) {
      await UserBoardRole.create({ userId, boardId, role: 'admin' });
    }
    return createBoard;
  }

  static edit = async (id: number, name: string): Promise<[affectedCount: number]> => {

    const updatedBoard = await Boards.update({ name }, { where: { id } });

    return updatedBoard;

  }

  static invite = async (id: number, email: string, role: string): Promise<Users> => {
    const isExist = await Users.findOne({ where: { email } });
    const board = await Boards.findByPk(id);

    const SECRET = "secret_password";
    const token = jwt.sign({ payload: { boardId: id, email, role } }, SECRET, { expiresIn: '1d' });

    const notifications = await Notifications.create({ text: `Você foi convidado para o Quadro ${board?.name}, o link do convite foi enviado para o seu email!` });    
    const notificationId = notifications.id;
    await UserNotifications.create({ userId: isExist?.id, notificationId })
    
    if (isExist) {
      transport.sendMail(
        {
          from: 'yan.brasileiro@gmail.com',
          to: email,
          html: `<span> Você recebeu um convite para a participar da equipe do grupo ${board?.name}, clique aqui para aceitar <a href="http://localhost:3000/confirmInvite/${token}"> aqui </a> </span>`
        });

      return isExist;
    }

    throw new Error;
  }

  static acceptInvite = async (email: string, token: string): Promise<UserBoardRole> => {
    const decodedToken = jwt.decode(token) as unknown as DecodedToken;

    if (!email) {
      const { payload: { boardId, role, email } } = decodedToken;

      const isEmailExist = await Users.findOne({ where: { email } });

      if (isEmailExist) {
        const userId = isEmailExist.id
        const isExistUserBoard = await UserBoardRole.findOne({ where: { boardId, userId } });
        if (isExistUserBoard) throw new Error;
        const addUserBoard = await UserBoardRole.create({ boardId, userId, role });
        return addUserBoard;
      }
    }

    const { payload: { boardId, role } } = decodedToken;
    const isEmailExist = await Users.findOne({ where: { email } });

    if (isEmailExist) {
      const userId = isEmailExist.id
      const isExistUserBoard = await UserBoardRole.findOne({ where: { boardId, userId } });
      if (isExistUserBoard) throw new Error;
      const addUserBoard = await UserBoardRole.create({ boardId, userId, role });
      return addUserBoard;
    }
    throw new Error;
  }

  static removeUserFromBoard = async (userId: number, boardId: number): Promise<number> => {
    const isUserBoardExist = await UserBoardRole.findOne({ where: { userId, boardId } });

    if (isUserBoardExist) {
      const deletedUser = await UserBoardRole.destroy({ where: { userId, boardId } });
      return deletedUser;
    }
    throw new Error;
  }

  static updateRoleBoard = async (id: number, userId: number, role: string): Promise<number> => {
    const isExist = await UserBoardRole.findOne({ where: { userId, boardId: id } });

    if (isExist) {

      const [affectedCount] = await UserBoardRole.update({ role }, { where: { userId, boardId: id } });

      return affectedCount;

    }
    throw new Error;
  }


  static async deleteBoardCascade(id: number): Promise<void> {
    try {
      await this.deleteCascade(id);
      console.log(`Deleted board and associated columns/cards/comments.`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  static async deleteCascade(boardId: number): Promise<void> {

    await UserBoardRole.destroy({ where: { board_id: boardId } });
    
    const columns = await Columns.findAll({ where: { boardId } });

    for (const column of columns) {
      await this.deleteColumnCascade(column.id);
    }

    await Boards.destroy({ where: { id: boardId } });
  }

  static async deleteColumnCascade(columnId: number): Promise<void> {
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

