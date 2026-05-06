import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '@/dto/product.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id); // Ensure product exists
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findOne(id); // Ensure product exists
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
