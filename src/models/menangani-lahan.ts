import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ReguDamkar from './regu-damkar';
import TitikKamera from './titik-kamera';

class MenanganiLahan extends Model {
  public id!: number;
  public id_regu_damkar!: number;
  public id_titik_kamera!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static associate(models: any): void {
    MenanganiLahan.belongsTo(models.ReguDamkar, { foreignKey: 'id_regu_damkar' });
    MenanganiLahan.belongsTo(models.TitikKamera, { foreignKey: 'id_titik_kamera' });
  }
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

export default MenanganiLahan;