import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  private orders = [];

  create(createOrderDto: any) {
    const newOrder = { id: Date.now(), ...createOrderDto };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find((order) => order.id === id);
  }

  update(id: number, updateOrderDto: any) {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex > -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        ...updateOrderDto,
      };
      return this.orders[orderIndex];
    }
    return null;
  }

  remove(id: number) {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex > -1) {
      const removedOrder = this.orders.splice(orderIndex, 1);
      return removedOrder[0];
    }
    return null;
  }
}
