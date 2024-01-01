import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  customerName: string;

  @Prop()
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
