import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Pelaporan from './pelaporan';

class GambarPelaporan extends Model {
  public id!: number;
  public tautan!: string;
  public id_user!: number;
  public id_pelaporan!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static associate(models: any) {
    GambarPelaporan.belongsTo(models.User, { foreignKey: 'id_user' });
    GambarPelaporan.belongsTo(models.Pelaporan, { foreignKey: 'id_pelaporan' });
  };
}

GambarPelaporan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tautan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    id_pelaporan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'pelaporan',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'gambar_pelaporan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default GambarPelaporan;