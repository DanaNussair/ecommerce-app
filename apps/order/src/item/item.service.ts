import { PRODUCT_PACKAGE_NAME, ProductServiceClient } from '@app/common';
import { AddItemRequest } from '@app/common/types/item';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { Item } from './item.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ItemService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PACKAGE_NAME,
      protoPath: join(__dirname, '../product.proto'),
      url: 'localhost:5000',
    },
  })
  private client: ClientGrpc;

  private productService: ProductServiceClient;

  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  async findAll() {
    return {
      items: await this.itemModel.findAll(),
    };
  }

  async create(
    createItemDto: Omit<AddItemRequest, keyof any[]>,
  ): Promise<Item> {
    const { productId } = createItemDto;
    try {
      const product = await lastValueFrom(
        this.productService.getProduct({ id: productId }),
      );

      if (product) {
        const newItem = await this.itemModel.create(createItemDto);
        return newItem;
      }
      return {} as Item;
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
