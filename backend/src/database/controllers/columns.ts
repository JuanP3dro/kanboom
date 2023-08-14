import { NextFunction, Request, Response } from 'express';
import { iColumn } from '../interfaces/IColumn';
import ColumnService from '../services/columns';

export default class ColumnsController {

  getColumnByBoardId = async (req: Request, res: Response, next: NextFunction) => {

    const { boardId } = req.query as unknown as iColumn;

    const getColumn = await ColumnService.getAllColumns(boardId);

    return res.status(200).json(getColumn);
  }

  getColumnById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params as unknown as iColumn;

    const getColumn = await ColumnService.getColumns(id);

    return res.status(200).json(getColumn);
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { name, color, boardId } = req.body as iColumn;

    const createBoard = await ColumnService.create(name, color, boardId);

    return res.status(200).json(createBoard);
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as iColumn;     

      const  { name, color } = req.body as iColumn;

      await ColumnService.edit(id, name, color);

      return res.status(200).json();

    } catch (error) {

      return res.status(404).json(error)

    }

  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
      const { id } = req.params as unknown as iColumn;

      await ColumnService.deleteColumnCascade(id);

      return res.status(200).send();
    }
    catch (error) {

      return res.status(500).send(error)
      
    }
  }
}