import db from '.';
import { Model, STRING, INTEGER, TEXT } from 'sequelize';
import Columns from './columns';
import Users from './users';

class Cards extends Model {
  declare id: number;

  declare title: string;

  declare description: string;

  declare responsible: number;

  declare historyPoints: string;

  declare hours: string;

  declare columnId: number;
}

Cards.init({
  title: { type: STRING },
  description: { type: TEXT },
  responsible: { type: INTEGER },
  historyPoints: { type: STRING },
  hours: { type: STRING },
  columnId: { type: INTEGER }
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'cards',
});


Columns.hasMany(Cards, {
  foreignKey: "columnId",
  as: "card",
  onDelete: 'CASCADE',
  hooks: true
});

Cards.belongsTo(Columns, {
  foreignKey: "columnId",
  as: "column",
  onDelete: 'CASCADE',  
  hooks: true
});

Cards.belongsTo(Users, {
  foreignKey: "responsible",
  as: 'responsibleUser'
});


export default Cards;
