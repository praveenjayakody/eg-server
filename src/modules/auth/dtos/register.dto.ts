import { isStrongPasswordCustom } from '@/lib/decorators/isStrongPasswordCustom';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email to register',
    type: String,
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    example: 'In1@aaaaaaaa',
  })
  @IsNotEmpty()
  @isStrongPasswordCustom()
  newPassword: string;
}
