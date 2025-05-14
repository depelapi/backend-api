import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class JenisSumberAir extends Model {
  public id!: number;
  public nama!: string;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

JenisSumberAir.init(
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
    tableName: 'jenis_sumber_air',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default JenisSumberAir;
