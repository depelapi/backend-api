import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ReguDamkar from './regu_damkar';
import TitikKamera from './titik_kamera';

@Table({
  tableName: 'menangani_lahan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class MenanganiLahan extends Model<MenanganiLahan> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => ReguDamkar)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_regu_damkar!: number;

  @ForeignKey(() => TitikKamera)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_titik_kamera!: number;

  @BelongsTo(() => ReguDamkar)
  regu_damkar!: ReguDamkar;

  @BelongsTo(() => TitikKamera)
  titik_kamera!: TitikKamera;
}

export default MenanganiLahan;