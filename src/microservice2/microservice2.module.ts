// microservice2.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Microservice2Controller } from './microservice2.controller';
import { Microservice2Service } from './microservice2.service';
import { Order, OrderSchema } from './microservice2.model';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    KafkaModule,
  ],
  controllers: [Microservice2Controller],
  providers: [Microservice2Service],
})
export class Microservice2Module {}
