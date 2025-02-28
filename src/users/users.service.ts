import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignDto } from 'src/dto/sign.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(SignDto:SignDto): Promise<User> {
    const { email, password } = SignDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashedPassword });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
