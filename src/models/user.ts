import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,  // Enable snake_case names
})
class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}

export default User;
