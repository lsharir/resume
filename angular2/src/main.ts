import '../../shared/scripts/loader.js';
import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  require('./../../shared/scripts/ga.js');
}

platformBrowserDynamic().bootstrapModule(AppModule);
