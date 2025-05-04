import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'status_kebakaran',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,  // Enable snake_case names
})
class StatusKebakaran extends Model<StatusKebakaran> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama!: string;
}

export default StatusKebakaran;
