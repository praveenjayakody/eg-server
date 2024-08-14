import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns/isAfter';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;

    const user = await this.userModel.findOne({ where: { id: userId } });
    const issuedAt = new Date(payload.iat * 1000);

    if ((user && !user.passwordUpdatedAt) || (user && isAfter(issuedAt, user.passwordUpdatedAt))) {
      return { userId, username: payload.username };
    } else {
      return null;
    }
  }
}
