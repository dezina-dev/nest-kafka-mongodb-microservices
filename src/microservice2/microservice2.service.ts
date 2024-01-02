import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './microservice2.model';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class Microservice2Service {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private kafkaService: KafkaService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderData);
    const savedOrder = await createdOrder.save();

    // Send a message to Kafka when a new order is created
    await this.kafkaService.sendMicroservice2Message('order-created', JSON.stringify(savedOrder));

    return savedOrder;
  }
}
