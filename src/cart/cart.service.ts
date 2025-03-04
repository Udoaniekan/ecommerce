import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      return new this.cartModel({ userId, items: []  });
    }
    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: []});
    }

    const existingItem = cart.items.find((item) => item.productId === addToCartDto.productId);
    if (existingItem) {
      existingItem.quantity += addToCartDto.quantity;
    } else {
      cart.items.push(addToCartDto);
    }

    return cart.save();
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter((item) => item.productId !== productId);
    return cart.save();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.findOneAndDelete({ userId });
  }
}
