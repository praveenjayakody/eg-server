import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { User } from '../schemas/user.schema';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'User',
    type: User,
  })
  user: User;

  @ApiProperty({
    description: 'If the user was newly registered',
    type: Boolean,
    example: false,
  })
  @IsString()
  isNewUser: boolean;

  @ApiProperty({
    description: 'Access token',
    type: String,
    example: 100,
  })
  @IsString()
  access_token: string;
}
