import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.tiagosilva.airsoftoperator',
  appName: 'Airsoft Operator',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  }
};

export default config;
