import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { authInterceptor } from '../auth-interceptor';
import { DummyDataService } from './service/dummy-data-service';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(DummyDataService, {
        delay: 1000,
        passThruUnknownUrl: true
      })
    )
  ]
};
