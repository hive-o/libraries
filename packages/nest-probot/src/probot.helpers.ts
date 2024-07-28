import { getPrivateKey } from '@probot/get-private-key';
import { Injectable, Inject } from '@nestjs/common';
import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';
import SmeeClient from 'smee-client';
import { Probot } from 'probot';
import { App } from 'octokit';

import { ModuleProviders, OctokitConfig, ProbotConfig } from './probot.types';

export const parseConfig = (config: ProbotConfig): Record<string, any> => {
  return {
    privateKey: getPrivateKey({
      env: { PRIVATE_KEY: config.privateKey },
    }) as string,
    ghUrl: config.ghUrl || 'https://api.github.com',
    webhookSecret: config.webhookSecret,
    webhookProxy: config.webhookProxy,
    clientSecret: config.clientSecret,
    webhookPath: config.webhookPath,
    clientId: config.clientId,
    appId: config.appId,
  };
};

export const createProbot = (config: ProbotConfig): Probot => {
  const parsedConfig = parseConfig(config);
  return new Probot({
    privateKey: parsedConfig['privateKey'],
    secret: parsedConfig['webhookSecret'],
    baseUrl: parsedConfig['ghUrl'],
    appId: parsedConfig['appId'],
  });
};

export const createSmee = (config: ProbotConfig) => {
  const parsedConfig = parseConfig(config);
  return new SmeeClient({
    source: parsedConfig['webhookProxy'] as string,
    target: parsedConfig['webhookPath'] as string,
    logger: console,
  });
};

export const createOctokit = (config: OctokitConfig): Octokit => {
  return new Octokit({
    auth: {
      ...config.auth,
      clientSecret: config.probot.clientSecret,
      privateKey: config.probot.privateKey,
      clientId: config.probot.clientId,
      appId: config.probot.appId,
    },
    baseUrl: config.probot.ghUrl,
    authStrategy: createAppAuth,
  });
};

@Injectable()
export class ProbotHelpers {
  readonly octokit_app: App;

  constructor(
    @Inject(ModuleProviders.ProbotConfig)
    private readonly config: ProbotConfig
  ) {
    this.octokit_app = new App({
      privateKey: getPrivateKey({
        env: { PRIVATE_KEY: config.privateKey },
      }) as string,
      appId: config.appId,
    });
  }
}
