import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

const mongooseAsyncConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
};

export default mongooseAsyncConfig;
