import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}
}
