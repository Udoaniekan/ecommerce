import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>,
  private readonly productService: ProductsService, // Inject ProductService
) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      return new this.cartModel({ userId, items: []  });
    }
    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {

    const price = await this.productService.price(productId); // Get price from productService

    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: []});
    }

    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({productId, quantity, price});
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
