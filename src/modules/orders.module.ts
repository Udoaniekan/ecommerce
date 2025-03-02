import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schemas/order.schema';
import { CartModule } from './cart.module';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersController } from 'src/orders/orders.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), CartModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
