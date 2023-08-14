import db from '.';
import { Model, STRING, INTEGER } from 'sequelize';
import Boards from './board';

class Columns extends Model {
  declare id: number;

  declare name: string;

  declare boardId: number;

  declare color: string;
}

Columns.init({
  name: { type: STRING },
  boardId: { 
    type: INTEGER,
    references: {
      model: 'boards',
      key: 'id'  
    },
    onDelete: 'CASCADE' 
},
  color: { type: STRING }
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'columns',
});

Boards.hasMany(Columns, {
  foreignKey: 'boardId',
  as: 'columns',
  onDelete: 'CASCADE'
});

Columns.belongsTo(Boards, {
  foreignKey: 'boardId',
  as: 'board',
  onDelete: 'CASCADE'
});

export default Columns;
