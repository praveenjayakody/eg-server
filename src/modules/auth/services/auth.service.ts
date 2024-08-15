import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Password } from '@utils/password';
import { ApiUser } from '@lib/dtos/ApiUser.dto';

import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService, @InjectModel(User.name) private readonly userModel: Model<User>) {}

  async sayHello() {
    return 'hello';
  }

  async hashThis(password: string) {
    return Password.toHash(password);
  }

  async validateUser(email: string, password: string): Promise<ApiUser | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await Password.compare(user.password, password))) {
      return {
        email: user.email,
        fullname: user.fullname,
      };
    }
    return null;
  }

  async login(user: ApiUser) {
    return { ...(await this.userService.login(user)) };
  }
}
