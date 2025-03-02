import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post()
  addToCart(@Req() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, addToCartDto);
  }

  @Delete(':productId')
  removeFromCart(@Req() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }

  @Delete()
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
