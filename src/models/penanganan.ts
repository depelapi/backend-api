import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ReguDamkar from './reguDamkar';
import Pelaporan from './pelaporan';
import User from './user';

class Penanganan extends Model {
  public id!: number;
  public lokasi_gmaps!: string;
  public tiba_pada!: Date | null;
  public id_regu_damkar!: number;
  public id_user!: number
  public id_pelaporan!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
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
    tableName: 'penanganan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

Penanganan.belongsTo(ReguDamkar, {
  foreignKey: 'id_regu_damkar',
  as: 'ReguDamkar'
});

Penanganan.belongsTo(Pelaporan, {
  foreignKey: 'id_pelaporan',
  as: 'Pelaporan'
});

Penanganan.belongsTo(User, {
  foreignKey: 'id_user',
  as: 'User'
});

export default Penanganan;