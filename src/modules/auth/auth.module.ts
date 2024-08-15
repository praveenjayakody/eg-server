import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { jwtAsyncConfig } from '@config/jwt.config';
import { MailModule } from '@providers/mailer';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './lib/local.strategy';
import { JwtStrategy } from './lib/jwt.strategy';
import { RegisterService } from './services/register.service';
import { RegisterController } from './controllers/register.controller';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtAsyncConfig),
    MailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, RegisterController, UserController],
  providers: [AuthService, RegisterService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService, RegisterService],
})
export class AuthModule {}
