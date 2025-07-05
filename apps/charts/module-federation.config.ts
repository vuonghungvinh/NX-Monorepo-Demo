import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'charts',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (_, defaultConfig) => {
    return {
      ...defaultConfig,
      eager: true,
    };
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
