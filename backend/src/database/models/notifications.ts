import { BOOLEAN } from 'sequelize';
import db from '.';
import { Model, STRING } from 'sequelize';

class Notifications extends Model {
  declare id: number;

  declare text: string;

  declare read: boolean;
}

Notifications.init({
  text: { type: STRING },
  read: { type: BOOLEAN }
}, {
  underscored: true,
  timestamps: true,
  sequelize: db,
  modelName: 'notifications',
});

export default Notifications;
