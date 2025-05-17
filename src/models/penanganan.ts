import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ReguDamkar from './reguDamkar';
import Pelaporan from './pelaporan';

class Penanganan extends Model {
  public id!: number;
  public lokasi_gmaps!: string;
  public tiba_pada!: Date | null;
  public id_regu_damkar!: number;
  public id_pelaporan!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
  
  public static associate(models: any) {
    Penanganan.belongsTo(models.ReguDamkar, { foreignKey: 'id_regu_damkar' });
    Penanganan.belongsTo(models.Pelaporan, { foreignKey: 'id_pelaporan' });
  };
}

Penanganan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lokasi_gmaps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tiba_pada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_regu_damkar: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'regu_damkar',
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
    tableName: 'penanganan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default Penanganan;