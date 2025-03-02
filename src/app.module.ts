import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./modules/users.module";
import { AuthModule } from "./modules/auth.module";
import { ProductsModule } from "./modules/products.module";
import { CartModule } from "./modules/cart.module";
import { OrdersModule } from "./modules/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule, 
    OrdersModule
  ],
})
export class AppModule {}