import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'wtask.webart.work',
  appName: 'wTask',
  webDir: 'dist/app/browser',
  plugins: {
    AdMob: {
      androidAdMobAppId: 'ca-app-pub-3940256099942544~3347511713', // Test App ID
    }
  }
};

export default config;
