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
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
  })
  export class AuthModule {}