import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class JenisUser extends Model {
  public id!: number;
  public nama!: string;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

JenisUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'jenis_user',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

JenisUser.hasMany(User, {
  foreignKey: 'id_jenis_user',
  as: 'User',
});

export default JenisUser;
