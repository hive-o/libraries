# @hive-o/nest-probot

Integrate Probot with NestJS

<p align="center">
<a href="https://www.npmjs.com/package/@hive-o/nest-probot"><img src="https://img.shields.io/npm/v/@hive-o/nest-probot.svg?style=flat" alt="version" /></a>
<a href="https://www.npmjs.com/package/@hive-o/nest-probot"><img alt="downloads" src="https://img.shields.io/npm/dt/@hive-o/nest-probot.svg?style=flat" /></a>
<img alt="license" src="https://img.shields.io/npm/l/@hive-o/nest-probot.svg" />
</p>

## Description

This module provides access to the `Probot` library which is used for building GitHub apps.

## Motivation

NestJS and Probot are great frameworks that helps bootstrap projects for creating complex applications.
That being said both have different configuration patterns and overall execution style. So to simplify Probot
configuration and leverage the full extent of NestJS capabilities in such a way the building probot based
github applications becomes declarative using decorators and event-handlers, we created this module.

## Usage

Before you can start testing probot with nestjs you will need to create a github app
Please follow the instructions: [**how to create a github app?**](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app)


### Install

```shell
# NPM
npm i --save @hive-o/nest-probot

# Yarn
yarn add @hive-o/nest-probot
```


### Import

Import and add `ProbotModule` to the `imports` section of your nestjs `app module`.
It's common to inject it directly into app Module's constructor so that it can be used during the `onModuleInit`
lifecycle hook at application startup.

#### Using synchronous configuration

> app.module.ts

```typescript
import { ProbotModule } from '@hive-o/nest-probot';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ProbotModule.forRoot({
      config: {
        appId: envConfig.GH_APP_ID,
        clientId: envConfig.GH_CLIENT_ID,
        clientSecret: envConfig.GH_CLIENT_SECRET,
        privateKey: envConfig.GH_PRIVATE_KEY, // base64 converted value of your github private key
        webhookSecret: envConfig.GH_WEBHOOK_SECRET, // optional
        webhookProxy: envConfig.GH_WEBHOOK_PROXY, // optional
        webhookPath: envConfig.GH_WEBHOOK_PATH, // optional
      },
    })
  ]
})
export class ExampleModule {}
```

> app.controller.ts

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Hook, ProbotService } from '@hive-o/nest-probot';

@Controller()
export class AppController {
  constructor(private readonly probot: ProbotService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // Add the handler to recieve github hook
  @Post("/hook")
  async hooks(@Req() req) {
    await this.probot.receiveHook(req);
  }

  @Hook(['issue_comment.created'])
  async hook(context) {
    console.log(context);
  }
}
```

#### Using asynchronous configuration

> app.module.ts

```typescript
import { ProbotModule } from '@hive-o/nest-probot';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ProbotModule.forRootAsync({
      isGlobal: true, // (optional), defaults to true
      useFactory: (envConfig: ConfigService) => ({
        appId: envConfig.get('GH_APP_ID'),
        clientId: envConfig.get('GH_CLIENT_ID'),
        clientSecret: envConfig.get('GH_CLIENT_SECRET'),
        privateKey: envConfig.get('GH_PRIVATE_KEY'), // base64 converted value of your github private key
        webhookSecret: envConfig.get('GH_WEBHOOK_SECRET'), // optional
        webhookProxy: envConfig.get('GH_WEBHOOK_PROXY'), // optional
        webhookPath: envConfig.get('GH_WEBHOOK_PATH'), // optional
      }),
      inject: [ConfigService],
    })
  ]
})
export class ExampleModule {}
```

> app.controller.ts

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Hook, ProbotService } from '@hive-o/nest-probot';

@Controller()
export class AppController {
  constructor(private readonly probot: ProbotService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // Add the handler to recieve github hook
  @Post("/hook")
  async hooks(@Req() req) {
    await this.probot.receiveHook(req);
  }

  @Hook(['issue_comment.created'])
  async hook(context) {
    console.log(context);
  }
}
```
