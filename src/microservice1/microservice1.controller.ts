import { Controller, Get, Post, Body } from '@nestjs/common';
import { Microservice1Service } from './microservice1.service';
import { Product } from './microservice1.model';

@Controller('microservice1')
export class Microservice1Controller {
  constructor(private readonly microservice1Service: Microservice1Service) {}

  @Get('products')
  getAllProducts(): Promise<Product[]> {
    return this.microservice1Service.getAllProducts();
  }

  @Post('products')
  createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.microservice1Service.createProduct(productData);
  }
}
