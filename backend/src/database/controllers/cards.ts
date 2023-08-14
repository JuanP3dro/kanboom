import { NextFunction, Request, Response } from 'express';
import CardsService from '../services/cards';
import { ICards } from '../interfaces/ICards';

export default class CardsController {

  getCardByColumnId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { columnId } = req.query as unknown as { columnId: number };

    const getColumn = await CardsService.getAllCards(columnId);

    return res.status(200).json(getColumn);
  }

  getCardById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { id } = req.params as unknown as { id: number };

    const boards = await CardsService.getCards(id);

    return res.status(200).json(boards);
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { title, description, responsible, historyPoints, hours, columnId, allowedUsers } = req.body as ICards;

    const users = allowedUsers.map((u) => u.id);

    const createCart = await CardsService.create(title, description, responsible, historyPoints, hours, columnId, users);

    return res.status(200).json(createCart);
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as ICards;

      const { title, description, responsible, historyPoints, hours, allowedUsers } = req.body as ICards;

      const users = allowedUsers.map((u) => u.id);
      
      await CardsService.edit(id, title, description, responsible, historyPoints, hours, users);

      return res.status(200).send();

    } catch (error) {

      return res.status(500).send(error)

    }

  }

  move = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: cardId, columnId } = req.body as { id: number, columnId: number };

      const movedCard = await CardsService.moveCard(cardId, columnId);

      console.log(movedCard);

      if (movedCard != 0) return res.status(200).send('sucess!');
      return res.status(400).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as ICards;

      await CardsService.delete(id);

      return res.status(200).send();
    }
    catch (error) {

      return res.status(500).send(error)

    }
  }

}