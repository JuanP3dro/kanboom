import db from '.';
import { Model, INTEGER, STRING } from 'sequelize';
import Users from './users';
import Boards from './board';

class UserBoardRole extends Model {
  declare id: number;

  declare role: string;

  declare userId: number;

  declare boardId: number;

}

UserBoardRole.init({
  role: { type: STRING },
  userId: { type: INTEGER },
  boardId: { type: INTEGER }
},
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    modelName: 'userBoardRole',
  });

  Users.belongsToMany(Boards, {
    through: UserBoardRole,
    as: 'allowedUsers',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  
  Boards.belongsToMany(Users, {
    through: UserBoardRole,
    as: 'allowedUsers',
    foreignKey: 'boardId',
    onDelete: 'CASCADE'
  });

export default UserBoardRole;