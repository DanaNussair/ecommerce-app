import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

import { ItemService } from './item.service';
import { AddItemRequest } from '@app/common/types/item';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Post()
  @UseInterceptors(GrpcToHttpInterceptor)
  create(@Body() createItemDto: AddItemRequest) {
    return this.itemService.create(createItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
