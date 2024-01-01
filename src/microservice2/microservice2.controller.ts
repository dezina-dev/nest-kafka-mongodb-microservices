import { Controller, Get, Post, Body } from '@nestjs/common';
import { Microservice2Service } from './microservice2.service';
import { Order } from './microservice2.model';

@Controller('microservice2')
export class Microservice2Controller {
  constructor(private readonly microservice2Service: Microservice2Service) {}

  @Get('orders')
  getAllOrders(): Promise<Order[]> {
    return this.microservice2Service.getAllOrders();
  }

  @Post('orders')
  createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.microservice2Service.createOrder(orderData);
  }
}
