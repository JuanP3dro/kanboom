import { IMessage } from '../interfaces/IMessage';
import { IUser } from '../interfaces/IUser';
import Users from '../models/users';
import { transport } from '../modules/mailer';

export default class UserService {

  static getUsers = async (id: number): Promise<Users> => {

    const users = await Users.findByPk(id, {
      attributes: { exclude: ['password'] }
    }) as Users;

    return users;
  }

  static create = async (name: string, email: string, password: string, tokenAuth: string): Promise<Users | IMessage> => {
    const isEmailExists = await Users.findOne({ where: { email } });

    if (isEmailExists) return ({ message: 'Esse email foi cadastrado.' });

    const now = new Date();
    now.setHours(now.getHours() + 24);

    const createUser = await Users.create({ name, email, password, tokenAuth, expiredToken: now });

    if (createUser) return createUser;

    return ({ message: 'Algo deu errado!' });

  }

  static update = async (id: number, profilePhoto: string | undefined, name: string, email: string, password: string) => {
    const existUser = await Users.findOne({ where: { id } });

  
    if (existUser) {
      const updates = {
        profilePhoto,
        name,
        email,
        password,
      };

      const nonEmptyUpdates = Object.fromEntries(Object.entries(updates).filter(([key, value]) => value !== '' && value != undefined));

      const [affectedCount] = await Users.update(nonEmptyUpdates, { where: { id } });

      return affectedCount;
    }

    throw new Error;

  }

  static recovery = async (email: string): Promise<Partial<IUser> | IMessage> => {
    const isValidEmail = await Users.findOne({ where: { email } });

    if (isValidEmail) {
      const id = isValidEmail.id;


      transport.sendMail(
        {
          from: 'yan.brasileiro@gmail.com',
          to: email,
          html: `<span> Você solicitou que sua senha fosse resetada, para escolher sua nova senha clique <a href="http://localhost:3000/replacePassword/${id}"> aqui </a> </span>`
        })
      return isValidEmail;
    }
    return ({ message: 'email invalido!' });
  }

  static replace = async (id: number, password: string): Promise<number | IMessage> => {

    const isExist = await Users.findOne({ where: { id } });

    if (isExist) {
      const newPassword = await Users.update({ password }, { where: { id } }) as unknown as number[];
      if (newPassword[0] != 0) return 1;
    } return 0;
  }
}
