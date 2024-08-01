import { ProbotModule, ProbotService } from '@hive-o/nest-probot';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProbotModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (envConfig: ConfigService) => ({
        appId: envConfig.get('GH_APP_ID'),
        clientId: envConfig.get('GH_CLIENT_ID'),
        clientSecret: envConfig.get('GH_CLIENT_SECRET'),
        privateKey: envConfig.get('GH_PRIVATE_KEY'), // base64 converted value of your github private key
        webhookPath: envConfig.get('GH_WEBHOOK_PATH'), // optional
        webhookProxy: envConfig.get('GH_WEBHOOK_PROXY'), // optional
        webhookSecret: envConfig.get('GH_WEBHOOK_SECRET'), // optional
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
