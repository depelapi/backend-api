import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Pelaporan from './pelaporan';

class JenisPenyalahgunaanPelaporan extends Model {
  public id!: number;
  public nama!: string;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

JenisPenyalahgunaanPelaporan.init(
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
    tableName: 'jenis_penyalahgunaan_pelaporan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

JenisPenyalahgunaanPelaporan.hasMany(Pelaporan, {
  foreignKey: 'id_jenis_penyalahgunaan',
  as: 'Pelaporan',
});

export default JenisPenyalahgunaanPelaporan;
