import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'jenis_penyalahgunaan_pelaporan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class JenisPenyalahgunaanPelaporan extends Model<JenisPenyalahgunaanPelaporan> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama!: string;
}

export default JenisPenyalahgunaanPelaporan;
