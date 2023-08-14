import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import { IMessage } from '../interfaces/IMessage';
import UserService from '../services/users';
import { transport } from '../modules/mailer';
import crypto from 'crypto';
import { NextFunction } from 'connect';

export default class UserController {

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | IMessage> => {
    const { id } = req.params as unknown as IUser;

    const users = await UserService.getUsers(id);

    if (users) return res.status(200).json(users);

    return res.status(404).json({ error: 'Usuario não encontrado' });
  }

  createUser = async (req: Request, res: Response): Promise<Response | IMessage> => {
    const { name, email, password } = req.body as IUser;
    const tokenAuth = crypto.randomBytes(20).toString('hex');


    if (name && email && password) {
      const user = await UserService.create(name, email, password, tokenAuth) as IUser;
      if (user.message) {
        return res.status(401).json({ message: user.message });
      }
      transport.sendMail(
        {
          from: 'yan.brasileiro@gmail.com',
          to: email,
          html: `<a href="http://localhost:3000/validateAccount/${tokenAuth}"> Confirme seu email clicando aqui</a>`
        }, (error, info) => {
          if (error) return res.status(500).send()
        }
      )

      return res.status(200).json({ message: 'Cadastro realizado com sucesso, verifique seu email para ativar a conta!' });

    } return res.status(404).json({ message: 'Name,Email & Password is required!' });
  };

  update = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params as unknown as { id: number };
      const { name, email, password } = req.body;
      const profilePhoto = req.file?.filename;

      if (profilePhoto) {
        const updateUser = await UserService.update(id, profilePhoto, name, email, password);

        if (updateUser !== 0) return res.status(200).send();
      }
      const updateUser = await UserService.update(id, profilePhoto, name, email, password);

      if (updateUser !== 0) return res.status(200).send();

      return res.status(400).json(Error);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  recoveryPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | IMessage> => {
    const { email } = req.body as IUser;

    if (email) {
      const isExist = await UserService.recovery(email);
      if (isExist.message) {
        return res.status(404).json({ message: isExist.message });
      } return res.status(200).send();
    } return res.status(404).json({ message: 'Email is required!' });

  }

  replacePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | IMessage> => {
    const { id } = req.params as unknown as { id: number };
    const { password } = req.body as IUser;

    const result = await UserService.replace(id, password);

    if (result != 0) return res.status(200).send();

    return res.status(500).json('Internal Error');
  }
}
