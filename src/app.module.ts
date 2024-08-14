import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@lib/guards/jwt-auth.guard';
import featureConfig from '@config/feature.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [featureConfig] }),
    HttpModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
