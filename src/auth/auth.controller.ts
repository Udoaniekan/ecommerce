import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from '../dto/sign.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() SignDto:SignDto) {
    return this.authService.signUp(SignDto);
  }

  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Get('me')
 @UseGuards(JwtAuthGuard)
 getUserInfo(@Req() req) {
   return this.authService.getUserInfo(req);
}
}
