import { Injectable } from '@nestjs/common';
import { Order } from './order.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(
    createOrderDto: Omit<CreateOrderDto, keyof any[]>,
  ): Promise<Order> {
    return await this.orderModel.create(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.findAll();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<[number, Order[]] | [number]> {
    return await this.orderModel.update(updateOrderDto, { where: { id } });
  }

  async remove(id: number): Promise<Order> {
    const product = await this.findOne(id);
    product.destroy();
    return product;
  }
}
