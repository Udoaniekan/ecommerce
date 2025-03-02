import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from '../dto/sign.dto';

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
}
