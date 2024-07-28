import { ModuleMetadata } from '@nestjs/common';

export interface ProbotConfig {
  webhookSecret?: string;
  webhookProxy?: string;

  webhookPath?: string;
  clientSecret: string;

  privateKey: string;

  clientId: string;
  ghUrl?: string;

  appId: string;
}

export interface OctokitConfig {
  auth: Record<string, any>;
  probot: ProbotConfig;
}

export interface ProbotModuleOptions {
  config: ProbotConfig;
  isGlobal?: boolean;
}

export interface ProbotModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ProbotConfig> | ProbotConfig;
  isGlobal?: boolean;
  inject?: any[];
}

export enum ProbotMetadata {
  name = 'probot/metadata/hook',
}

export enum ModuleProviders {
  ProbotConfig = 'probot/provider/config',
}
