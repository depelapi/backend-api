import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import JenisReguDamkar from './jenisReguDamkar';

class ReguDamkar extends Model {
  public id!: number;
  public nama!: string;
  public id_jenis_regu_damkar!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
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

// Set up the association directly after model initialization
ReguDamkar.belongsTo(JenisReguDamkar, { 
  foreignKey: 'id_jenis_regu_damkar',
  as: 'JenisReguDamkar'  // This is crucial - defines the alias used in queries
});

export default ReguDamkar;
