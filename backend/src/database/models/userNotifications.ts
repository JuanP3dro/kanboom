import db from '.';
import { Model, INTEGER } from 'sequelize';
import Users from './users';
import Notifications from './notifications';

class UserNotifications extends Model {
  declare id: number;

  declare userId: number;

  declare notificationId: number;

}

UserNotifications.init({
  userId: { type: INTEGER },
  notificationId: { type: INTEGER }
},
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    modelName: 'UserNotifications',
  });

  
  Users.belongsToMany(Notifications, {
    through: UserNotifications,
    foreignKey: 'userId',
    otherKey: 'notificationId', // Chave do outro modelo (Notifications)
    as: 'notifications', // Alias para a associação em Users
  });
  
  Notifications.belongsToMany(Users, {
    through: UserNotifications,
    foreignKey: 'notificationId',
    otherKey: 'userId', // Chave do outro modelo (Users)
    as: 'users', // Alias para a associação em Notifications
  });

export default UserNotifications;