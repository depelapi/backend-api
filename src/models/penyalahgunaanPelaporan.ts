import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Pelaporan from './pelaporan';
import JenisPenyalahgunaanPelaporan from './jenisPenyalahgunaanPelaporan';
import User from './user';

class PenyalahgunaanPelaporan extends Model {
  public id!: number;
  public deskripsi!: string;
  public id_pelaporan!: number;
  public id_jenis_penyalahgunaan_pelaporan!: number;
  public id_user!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

PenyalahgunaanPelaporan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_pelaporan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'pelaporan',
        key: 'id',
      },
    },
    id_jenis_penyalahgunaan_pelaporan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'jenis_penyalahgunaan_pelaporan',
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
  },
  {
    sequelize,
    tableName: 'penyalahgunaan_pelaporan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

PenyalahgunaanPelaporan.belongsTo(Pelaporan, { foreignKey: 'id_pelaporan', as: 'pelaporan' });
PenyalahgunaanPelaporan.belongsTo(JenisPenyalahgunaanPelaporan, { foreignKey: 'id_jenis_penyalahgunaan_pelaporan', as: 'jenis_penyalahgunaan_pelaporan' });
PenyalahgunaanPelaporan.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

export default PenyalahgunaanPelaporan;