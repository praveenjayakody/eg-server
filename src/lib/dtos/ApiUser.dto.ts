import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// INFO: the user object returned by APIs
export class ApiUser {
  @ApiProperty({
    description: 'Email',
    type: String,
    example: 100,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'John Doe',
    type: String,
    example: 100,
  })
  @IsString()
  fullname: string;
}
