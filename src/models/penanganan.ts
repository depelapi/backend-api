import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ReguDamkar from './regu-damkar';
import Pelaporan from './pelaporan';

@Table({
  tableName: 'penanganan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class Penanganan extends Model<Penanganan> {
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
  lokasi_gmaps!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  tiba_pada!: Date | null;

  @ForeignKey(() => ReguDamkar)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_regu_damkar!: number;

  @ForeignKey(() => Pelaporan)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_pelaporan!: number;

  @BelongsTo(() => ReguDamkar)
  regu_damkar!: ReguDamkar;

  @BelongsTo(() => Pelaporan)
  pelaporan!: Pelaporan;
}

export default Penanganan;