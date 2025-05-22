import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ReguDamkar from './reguDamkar';
import TitikKamera from './titikKamera';

class MenanganiLahan extends Model {
  public id!: number;
  public id_regu_damkar!: number;
  public id_titik_kamera!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

MenanganiLahan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_regu_damkar: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'regu_damkar',
        key: 'id',
      },
    },
    id_titik_kamera: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'titik_kamera',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'menangani_lahan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

MenanganiLahan.belongsTo(ReguDamkar, {
  foreignKey: 'id_regu_damkar',
  as: 'ReguDamkar',
});

MenanganiLahan.belongsTo(TitikKamera, {
  foreignKey: 'id_titik_kamera',
  as: 'TitikKamera',
});

export default MenanganiLahan;