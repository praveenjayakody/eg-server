import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MailService } from '@providers/mailer';

import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  private verificationValidityPeriod = 24; // INFO: validity of verification link in hours

  constructor(
    private mailService: MailService,
    private userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerEmail(email: string) {
    const user = await this.userModel.find({ email });
    console.log(user);
  }
}
