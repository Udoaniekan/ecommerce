import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
    imports: [
      ConfigModule,
      UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
  })
  export class AuthModule {}