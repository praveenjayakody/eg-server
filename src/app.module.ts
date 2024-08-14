import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@lib/guards/jwt-auth.guard';
import featureConfig from '@config/feature.config';
import mongooseAsyncConfig from '@config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [featureConfig] }),
    HttpModule,
    AuthModule,
    MongooseModule.forRootAsync(mongooseAsyncConfig),
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
