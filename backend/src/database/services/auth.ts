import { IMessage } from '../interfaces/IMessage';
import { IUser } from '../interfaces/IUser';
import crypto from 'crypto';
import Users from '../models/users';
import { transport } from '../modules/mailer';

export default class AuthService {

  static login = async (email: string, password: string): Promise<Users | IMessage> => {
    const findUser: Users | null = await Users.findOne({ where: { email } });
    const existEmail: string | undefined = findUser?.email;
    const isValid: boolean | undefined = findUser?.isValid;

    if (existEmail) {
      if (isValid) {
        if (password != findUser?.password) {
          return ({ message: 'A senha fornecida está incorreta.' });
        } return findUser;
        ;
      }
      return ({ message: 'email não confirmado! Por favor confirme seu email!' });
    } return ({ message: 'Não encontramos esse email no nosso sistema.' });
  };

  static accountValidation = async (token: string): Promise<String | IMessage> => {
    const { tokenAuth, expiredToken } = await Users.findOne({ where: { tokenAuth: token } }) as unknown as IUser;
    const now = new Date();


    if (now > expiredToken) ({ message: 'Token expirado!' });
    if (tokenAuth) {
      const validateLogin = await Users.update({ isValid: true }, { where: { tokenAuth: token } }) as unknown as number[];
      if (validateLogin[0] != 0) return tokenAuth;
      return ({ message: 'Email ja foi confirmado!' });
    } return ({ message: 'Token invalido!' });
  }

  static refreshToken = async (email: string): Promise<[affectedCount: number] | undefined> => {
    const isExist = await Users.findOne({ where: { email } });

    if (isExist) {
      const newTokenAuth = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      const newTokenGenerate = (await Users.update({ tokenAuth: newTokenAuth, expiredToken: now }, { where: { email } }));
      
      transport.sendMail(
        {
          from: 'yan.brasileiro@gmail.com',
          to: email,
          html: `<a href="http://localhost:3000/validateAccount/${newTokenAuth}"> Confirme seu email clicando aqui</a>`
        }, (error, info) => {
         return error;
        }
      )

      return newTokenGenerate;
    }  throw new Error('Falha ao gerar novo token!');

  }

  static stepsValidation = async (id: number) => {
    const isExist = await Users.findOne({ where: { id } });
    const completedStep = true;

    if (isExist) {
      const updated = await Users.update({ completedStep }, { where: { id } }) as number[];
      if (updated[0] != 0) return 1;
    }
    return 0;
  }
}
