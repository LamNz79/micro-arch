import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryService } from '@/services/inventoryService';
import { CreateProductDto, UpdateProductDto } from '@/dto/product.dto';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.inventoryService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.inventoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
