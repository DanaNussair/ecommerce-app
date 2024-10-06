import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  imageUrl: string;
}
