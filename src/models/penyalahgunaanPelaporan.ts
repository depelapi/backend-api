import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Pelaporan from './pelaporan';
import JenisPenyalahgunaanPelaporan from './jenisPenyalahgunaanPelaporan';

class PenyalahgunaanPelaporan extends Model {
  public id!: number;
  public deskripsi!: string;
  public id_pelaporan!: number;
  public id_jenis_penyalahgunaan_pelaporan!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static associate(models: any): void {
    PenyalahgunaanPelaporan.belongsTo(models.Pelaporan, { foreignKey: 'id_pelaporan' });
    PenyalahgunaanPelaporan.belongsTo(models.JenisPenyalahgunaanPelaporan, { foreignKey: 'id_jenis_penyalahgunaan_pelaporan' });
  };
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
  },
  {
    sequelize,
    tableName: 'penyalahgunaan_pelaporan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default PenyalahgunaanPelaporan;