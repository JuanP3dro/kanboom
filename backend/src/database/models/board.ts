import db from '.';
import { Model, STRING } from 'sequelize';

class Boards extends Model {
  declare id: number;

  declare name: string;
}

Boards.init({
  name: { type: STRING },
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'boards',
});

export default Boards;
