import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "../products/products.controller";
import { ProductsService } from "../products/products.service";
import { Product, ProductSchema } from "../products/schemas/product.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService]
  })
  export class ProductsModule {}