import { Controller, Get, UseGuards, Post, Request, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '@lib/guards/local-auth.guard';
import { DefaultAuth } from '@lib/decorators/DefaultAuth.decorator';
import { Public } from '@lib/decorators/Public.decorator';

import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { HashThisDto } from '../dtos/hashThis.dto';
import { LoginResponseDTO } from '../dtos/login-reponse.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('test')
  @ApiOperation({ summary: 'Hello World' })
  @ApiResponse({ status: 200 })
  sayHello() {
    return this.authService.sayHello();
  }

  @Public()
  @Get('hashThis')
  @ApiOperation({ summary: 'Hash the supplied string' })
  @ApiResponse({ status: 200 })
  hashThis(@Query() query: HashThisDto) {
    return this.authService.hashThis(query.password);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @Post('login')
  async login(@Body() body: AuthDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Authenticate token' })
  @ApiResponse({ status: 200 })
  @DefaultAuth()
  @Get('iam')
  async iam(@Request() req) {
    return this.authService.validateToken(req.user.email);
  }
}
