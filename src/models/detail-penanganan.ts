import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Penanganan from './penanganan';
import JenisSumberAir from './jenis-sumber-air';

@Table({
  tableName: 'detail_penanganan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class DetailPenanganan extends Model<DetailPenanganan> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  penyebab!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  akses_jalan!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  kendala_di_lapangan!: string;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  korban_jiwa!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  bangunan_terdampak!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  selesai_pada!: Date | null;

  @ForeignKey(() => Penanganan)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_penanganan!: number;

  @ForeignKey(() => JenisSumberAir)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_jenis_sumber_air!: number;

  @BelongsTo(() => Penanganan)
  penanganan!: Penanganan;

  @BelongsTo(() => JenisSumberAir)
  jenis_sumber_air!: JenisSumberAir;
}

export default DetailPenanganan;