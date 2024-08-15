import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@lib/decorators/Public.decorator';

import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dtos/register.dto';

@ApiTags('Register')
@Controller('v1/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Public()
  @Post('email')
  @ApiOperation({ summary: 'Register new user with email password combo' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Email already registered' })
  registerEmail(@Body() body: RegisterDto) {
    return this.registerService.register(body);
  }
}
