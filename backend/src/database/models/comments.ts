import db from '.';
import { Model, STRING, INTEGER, TEXT } from 'sequelize';
import Cards from './cards';

class Comments extends Model {
  declare id: number;

  declare cardId: number;

  declare author: string;

  declare comment: string;

  declare attachment: string;

}

Comments.init({
  cardId: { type: INTEGER },
  author: { type: STRING },
  comment: { type: TEXT },
  attachment: { type: STRING }
}, {
  timestamps: true,
  underscored: true,
  sequelize: db,
  modelName: 'comments',
});

Comments.belongsTo(Cards, {
  foreignKey: 'cardId',
  onDelete: 'CASCADE'
});

Cards.hasMany(Comments, {
  foreignKey: 'cardId',
  onDelete: 'CASCADE'
});



export default Comments;
