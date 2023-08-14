import { Request, Response, NextFunction } from "express";
import NotificationsService from "../services/notifcations";

export default class NotificationsController {

  getAllNotifications = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { userId } = req.query as unknown as { userId: number };

      const getNotifications = await NotificationsService.getAllNotifications(userId);

      if (getNotifications.length != 0) return res.status(200).send(getNotifications);
  
      return res.status(404).json({ message: "Sem Notificações!"});

    } catch (error) {

      return res.status(500).send(error);

    }

  
  }

  markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { id } = req.params as unknown as { id: number }

      const read = true;

      const response = await NotificationsService.markAsRead(id, read);

      if (response != 0) return res.status(200).send('sucess!');

      return res.status(400).send();

    } catch (error) {

      return res.status(500).send(error);

    }
  }

}