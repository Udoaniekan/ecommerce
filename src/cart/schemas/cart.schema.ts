import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  })
  items: { productId: string; quantity: number; price:number }[];

}

export const CartSchema = SchemaFactory.createForClass(Cart);
