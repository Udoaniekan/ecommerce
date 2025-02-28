import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from 'src/dto/sign.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(SignDto:SignDto) {
    return this.usersService.createUser(SignDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token: this.jwtService.sign({ email: user.email }) };
  }
}
