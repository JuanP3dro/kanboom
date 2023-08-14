import { NextFunction, Request, Response } from 'express';
import { IBoard } from '../interfaces/IBoard';
import BoardService from '../services/board';
import { IUser } from '../interfaces/IUser';

export default class BoardController {

  getBoardByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { userId } = req.query as unknown as { userId: number };

    const boards = await BoardService.getAllBoards(userId);

    return res.status(200).json(boards);
  }

  getBoardById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { id } = req.params as unknown as IBoard;

      const boards = await BoardService.getBoards(id);

      if (!boards) return res.status(404).send('Not Found!');
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(500).send(error);
    }

  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { name, userId } = req.body as { name: string, userId: number };

    const createBoard: IBoard = await BoardService.create(name, userId);

    return res.status(200).json(createBoard);
  }


  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as IBoard;

      const { name } = req.body as IBoard;

      await BoardService.edit(id, name);

      return res.status(200).send();

    } catch (error) {

      return res.status(500).send(error);

    }

  }

  invite = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { id } = req.params as unknown as IBoard;
      const { email, role } = req.body as IUser;
      await BoardService.invite(id, email, role);
      return res.status(200).json({ message: 'Convite enviado com sucesso!' });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  acceptedInvite = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { email, token } = req.body as { email: string, token: string };
      const accepted = await BoardService.acceptInvite(email, token);
      return res.status(200).json(accepted);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  removeUserBoard = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { userId, boardId } = req.body as { userId: number, boardId: number };
      const remove = await BoardService.removeUserFromBoard(userId, boardId);
      return res.status(200).send('Usuario deletado!');
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  updateRoleBoard = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { id } = req.params as unknown as { id: number };
      const { userId, role } = req.body;
  
      const update = await BoardService.updateRoleBoard(id, userId, role);
  
      console.log(update);
      if (update != 0) return res.status(200).send('sucess!');
      return res.status(400).send();
    } catch (error) {
      return res.status(500).send(error)
    }
 
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as IBoard;

      await BoardService.deleteBoardCascade(id);

      return res.status(200).send();
    }
    catch (error) {

      return res.status(500).send(error)

    }
  }

}