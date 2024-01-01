import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './microservice2.model';

@Injectable()
export class Microservice2Service {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    return createdOrder.save();
  }
}
