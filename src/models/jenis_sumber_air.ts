import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'jenis_sumber_air',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,  // Enable snake_case names
})
class JenisSumberAir extends Model<JenisSumberAir> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama!: string;
}

export default JenisSumberAir;
