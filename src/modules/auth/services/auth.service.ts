import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Password } from '@utils/password';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async sayHello() {
    return 'hello';
  }

  async hashThis(password: string) {
    return Password.toHash(password);
  }

  async validateUser(email: string, password: string) {
    // const user = await this.repo.findOne({ where: { email } });
    // // TODO: add hash verfication
    // if (user && user.passwordUpdatedAt && (await Password.compare(user.password, password))) {
    //   return user;
    // }
    // return null;

    return { email, password };
  }

  async login(user: User, isNewUser = false) {
    return { ...(await this.userService.login(user)), isNewUser };
  }
}
