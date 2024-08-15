import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

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
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1, // TODO: update password validation for custom rules
  })
  newPassword: string;
}
