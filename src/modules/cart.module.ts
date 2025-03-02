import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from 'src/cart/cart.controller';
import { CartService } from 'src/cart/cart.service';
import { Cart, CartSchema } from 'src/cart/schemas/cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
