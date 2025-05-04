import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Pelaporan from './pelaporan';
import JenisPenyalahgunaanPelaporan from './jenis_penyalahgunaan_pelaporan';

@Table({
  tableName: 'penyalahgunaan_pelaporan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class PenyalahgunaanPelaporan extends Model<PenyalahgunaanPelaporan> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deskripsi!: string;

  @ForeignKey(() => Pelaporan)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_pelaporan!: number;

  @ForeignKey(() => JenisPenyalahgunaanPelaporan)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_jenis_penyalahgunaan_pelaporan!: number;

  @BelongsTo(() => Pelaporan)
  pelaporan!: Pelaporan;

  @BelongsTo(() => JenisPenyalahgunaanPelaporan)
  jenis_penyalahgunaan_pelaporan!: JenisPenyalahgunaanPelaporan;
}

export default PenyalahgunaanPelaporan;