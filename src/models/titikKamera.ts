import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class TitikKamera extends Model {
  public id!: number;
  public nama!: string;
  public id_device!: string;
  public latitud!: number;
  public longitud!: number;
  public notifikasi_publik!: boolean;
  public id_user!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static associate(models: any) {
    TitikKamera.belongsTo(models.User, { foreignKey: 'id_user' });
  };
}

TitikKamera.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true,
    },
    id_device: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    notifikasi_publik: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'titik_kamera',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default TitikKamera;