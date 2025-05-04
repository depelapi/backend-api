import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Pelaporan from './pelaporan';

@Table({
  tableName: 'gambar_pelaporan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class GambarPelaporan extends Model<GambarPelaporan> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  tautan!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_user!: number;

  @ForeignKey(() => Pelaporan)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_pelaporan!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Pelaporan)
  pelaporan!: Pelaporan;
}

export default GambarPelaporan;