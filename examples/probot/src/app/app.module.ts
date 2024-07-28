import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProbotModule, ProbotService } from '@hive-o/nest-probot';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProbotModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (envConfig: ConfigService) => ({
        appId: envConfig.get('GH_APP_ID'),
        clientId: envConfig.get('GH_CLIENT_ID'),
        clientSecret: envConfig.get('GH_CLIENT_SECRET'),
        privateKey: envConfig.get('GH_PRIVATE_KEY'), // base64 converted value of your github private key
        webhookSecret: envConfig.get('GH_WEBHOOK_SECRET'), // optional
        webhookProxy: envConfig.get('GH_WEBHOOK_PROXY'), // optional
        webhookPath: envConfig.get('GH_WEBHOOK_PATH'), // optional
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
