import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  })
  items: { productId: string; quantity: number }[];

  @Prop({ default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
