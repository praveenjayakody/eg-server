import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ApiUser } from '@lib/dtos/ApiUser.dto';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'User',
    type: ApiUser,
  })
  user: ApiUser;

  @ApiProperty({
    description: 'Access token',
    type: String,
    example: 100,
  })
  @IsString()
  access_token: string;
}
