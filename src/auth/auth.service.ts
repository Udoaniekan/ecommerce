import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from '../dto/sign.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async signUp(SignDto:SignDto) {
    return this.usersService.createUser(SignDto);
  }

  async signIn(email: string, password: string) {
    return this.usersService.signIn(email, password);
  }

  async getUserInfo(req: any) {
  return req.user;
}
  
}
