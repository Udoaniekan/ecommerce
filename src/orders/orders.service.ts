import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly cartService: CartService,
  ) {}

  async createOrder(userId: string): Promise<Order> {
    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) throw new NotFoundException('Cart is empty');

    const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * 100, 0); // Assume each item is 100

    const order = new this.orderModel({ userId, items: cart.items, totalAmount });
    await order.save();

    await this.cartService.clearCart(userId);
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId });
  }
}
