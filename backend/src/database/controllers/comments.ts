import { NextFunction, Request, Response } from 'express';
import CommentsService from '../services/comments';
import { iColumn } from '../interfaces/IColumn';
import { IComments } from '../interfaces/IComments';


export default class CommentsController {

  getColumnByCardId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { cardId } = req.query as unknown as { cardId: number };

      const getColumn = await CommentsService.getAllComments(cardId);

      return res.status(200).json(getColumn);

    } catch (error) {

      return res.status(500).send(error);

    }

  }


  create = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const { author, comment, cardId, allowedUsers } = req.body as IComments; 

      const users = allowedUsers.map((u) => u.id);

      const createBoard = await CommentsService.create(cardId, comment, author, users);

      return res.status(200).json(createBoard);

    } catch (error) {

      console.log(error) 
    }

  }

  /* update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as iColumn;     

      const  { name, color } = req.body as iColumn;

      await ColumnService.edit(id, name, color);

      return res.status(200).json();

    } catch (error) {

      return res.status(404).json(error)

    }

  } */
}