import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import AuthService from '../services/auth';
import { IMessage } from '../interfaces/IMessage';

export default class LoginController {
  loginUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response | IMessage> => {
    const { email, password } = req.body as IUser;

    if (email && password) {
      const SECRET = "secret_password";
      const user = await AuthService.login(email, password) as IUser;
      const token = jwt.sign({ payload: { user } }, SECRET, { expiresIn: '1d' });

      if (user.message) {
        return res.status(400).json({ message: user.message });
      }
      return res.status(200).json({ token });
    } return res.status(404).json({ message: 'Email & Password is required!' });
  }

  emailValidation = async (req: Request, res: Response, _next: NextFunction): Promise<Response | IMessage> => {

    const { token } = req.query as { token: string };

    const isValid = await AuthService.accountValidation(token) as IUser;

    if (isValid.message) return res.status(400).json({ message: isValid.message });

    return res.status(200).send();
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise <Response> => {

    try {
      const { email } = req.body as IUser;

      await AuthService.refreshToken(email);

      return res.status(200).json({ message: 'Novo token foi enviado para o email!' });

    } catch (error) {
      return res.status(500).json({ error: error });
    }


  }

  validateSteps = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const { id } = req.query as unknown as { id: number };

    const updateSteps = await AuthService.stepsValidation(id);

    if (updateSteps !== 0) return res.status(200).send();

    return res.status(500).send();
  }
}

