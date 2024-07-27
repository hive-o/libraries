import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import {
  ModuleProviders,
  ProbotModuleAsyncOptions,
  ProbotModuleOptions,
} from './probot.types';
import { GithubHookMetadataAccessor } from './github-hook-metadata.accessor';
import { ProbotService } from './probot.service';
import { ProbotHelpers } from './probot.helpers';

@Module({
  imports: [DiscoveryModule],
})
export class ProbotModule {
  static forRootAsync(options: ProbotModuleAsyncOptions): DynamicModule {
    return {
      providers: [
        {
          provide: ModuleProviders.ProbotConfig,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        GithubHookMetadataAccessor,
        ProbotService,
        ProbotHelpers,
      ],
      global: options.isGlobal || true,
      exports: [ProbotHelpers],
      module: ProbotModule,
    };
  }

  static forRoot(options: ProbotModuleOptions): DynamicModule {
    return {
      providers: [
        {
          provide: ModuleProviders.ProbotConfig,
          useFactory: () => options.config,
        },
        GithubHookMetadataAccessor,
        ProbotService,
        ProbotHelpers,
      ],
      global: options.isGlobal || true,
      exports: [ProbotHelpers],
      module: ProbotModule,
    };
  }
}
