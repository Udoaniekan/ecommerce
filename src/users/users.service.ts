import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignDto } from 'src/dto/sign.dto';
import { User, UserDocument } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
 private readonly jwtService: JwtService,) {}

  
  async createUser(payload:SignDto): Promise<User> {
    payload.email = payload.email.toLowerCase();
    const { email, password } = payload;
    const isUser = await this.userModel.findOne({email});
  if(isUser) throw new HttpException('sorry user with this email already exist', 400);
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashedPassword });
  }

   async signIn(email: string, password: string) {
      try{
          const user = await this.userModel.findOne({email});
          if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
          }
          return { token: this.jwtService.sign({ id:user.id, email: user.email}) };
      } catch (error){
          return error
      }
    }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
