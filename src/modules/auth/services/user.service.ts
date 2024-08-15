import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ApiUser } from '@lib/dtos/ApiUser.dto';

import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private jwtService: JwtService, @InjectModel(User.name) private readonly userModel: Model<User>) {}

  async login(user: ApiUser) {
    const payload = {
      email: user.email,
      sub: user.email, // TODO: use ID for this
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
