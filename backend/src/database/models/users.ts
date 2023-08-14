import db from '.';
import { Model, STRING, BOOLEAN, DATE } from 'sequelize';
import Boards from './board';

class Users extends Model {
  declare id: number;

  declare profilePhoto: string;

  declare name: string;

  declare email: string;

  declare password: string;

  declare tokenAuth: string;

  declare expiredToken: Date;

  declare completedStep: boolean;

  declare isValid: boolean;
}

Users.init({
  profilePhoto: { type: STRING},
  name: { type: STRING},
  email: { type: STRING },
  password: { type: STRING },
  tokenAuth: { type: STRING },
  expiredToken: { type: DATE },
  completedStep: {
    type: BOOLEAN,
    defaultValue: false
  },
  isValid: {
    type: BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'users',
});

export default Users;
