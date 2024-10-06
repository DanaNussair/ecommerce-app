import {
  Table,
  Column,
  Model,
  IsEmail,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @IsEmail
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.password) {
      const salt = await bcrypt.genSalt();
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @Column({
    type: DataType.ENUM({ values: ['customer', 'retailer'] }),
    defaultValue: 'customer',
  })
  role: 'customer' | 'retailer';

  @Column(DataType.INTEGER)
  age: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;
}
