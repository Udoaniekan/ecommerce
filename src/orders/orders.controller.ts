import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req) {
    return this.ordersService.createOrder(req.user.userId);
  }

  @Get()
  getUserOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }
}
