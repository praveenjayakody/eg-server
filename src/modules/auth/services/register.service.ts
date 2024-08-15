import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Password } from '@utils/password';

import { User } from '../schemas/user.schema';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async register({ email, newPassword, fullname }: RegisterDto) {
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        // INFO: existing user
        this.logger.warn('Email already exists');
        throw new BadRequestException('That email already exists');
      } else {
        // INFO: new user
        const hashedPassword = await Password.toHash(newPassword);
        await this.userModel.create({ email, password: hashedPassword, fullname });
        return 'Successfully registered';
      }
    } catch (err) {
      this.logger.error(err);
      if (err) {
        throw err;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
