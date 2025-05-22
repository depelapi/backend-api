import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ReguDamkar from './reguDamkar';

class JenisReguDamkar extends Model {
  public id!: number;
  public nama!: string;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

JenisReguDamkar.init(
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
    tableName: 'jenis_regu_damkar',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

JenisReguDamkar.hasMany(ReguDamkar, {
  foreignKey: 'id_jenis_regu_damkar',
  as: 'ReguDamkar',
});

export default JenisReguDamkar;
