import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Password } from '@utils/password';
import { Roles } from '@lib/types/user.types';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({
    email,
    fullname,
    role,
  }: // password,
  // activated = false,
  {
    email: string;
    password?: string;
    fullname: string;
    role: Roles;
    activated?: boolean;
  }) {
    this.logger.log(`registerUser start`);
    this.logger.log(`params :: ${fullname} , ${email} , ${role}`);
    // const newUser = this.repo.create({
    //   email,
    //   fullname,
    //   password: await Password.toHash(password ?? Password.create()),
    //   role,
    //   activated,
    // });
    // return this.repo.save(newUser);
  }

  async updateUserApi(modifiedProperties: UpdateUserDto, user: User): Promise<User> {
    for (const userProp of Object.keys(modifiedProperties)) {
      switch (userProp) {
        case 'newPassword': {
          // INFO: check if currentPassword validates
          if (!user.passwordUpdatedAt) {
            user.password = await Password.toHash(modifiedProperties.newPassword);
            user.activated = true; // INFO: a user is considered activated when they first set the password
          } else if (
            modifiedProperties.currentPassword &&
            (await Password.compare(user.password, modifiedProperties.currentPassword))
          ) {
            user.password = await Password.toHash(modifiedProperties.newPassword);
          } else {
            throw new BadRequestException('Current password is invalid');
          }
          break;
        }
        case 'currentPassword': {
          // INFO: skip these props (probably processed in another way)
          break;
        }
        default: {
          user[userProp] = modifiedProperties[userProp];
        }
      }
    }

    // await user.save();

    return user;
  }
}
