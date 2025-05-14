import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import JenisReguDamkar from './jenis-regu-damkar';

class ReguDamkar extends Model {
  public id!: number;
  public nama!: string;
  public id_jenis_regu_damkar!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static associate(models: any) {
    ReguDamkar.belongsTo(models.JenisReguDamkar, { foreignKey: 'id_jenis_regu_damkar' });
  };
}

ReguDamkar.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_jenis_regu_damkar: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'jenis_regu_damkar',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'regu_damkar',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default ReguDamkar;
